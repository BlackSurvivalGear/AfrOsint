
from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    # Block heavy assets and REAL Firebase
    page.route("**/*.{png,jpg,jpeg,webp,svg,gif}", lambda route: route.abort())
    page.route("**/globe.gl.min.js", lambda route: route.fulfill(body="console.log('globe mock')"))
    page.route("**/www.gstatic.com/firebasejs/**", lambda route: route.fulfill(body="console.log('firebase cdn blocked')"))

    # Mock Firebase
    page.add_init_script("""
        window.firebase = {
            initializeApp: () => ({}),
            auth: () => {
                const authObj = {
                    onAuthStateChanged: (cb) => {
                        setTimeout(() => {
                            cb({
                                uid: 'admin123',
                                email: 'admin@afrosint.com',
                                displayName: 'Admin User',
                                photoURL: 'https://via.placeholder.com/150'
                            });
                        }, 50);
                        return () => {};
                    },
                    signOut: () => Promise.resolve(),
                    currentUser: {
                        uid: 'admin123',
                        email: 'admin@afrosint.com'
                    }
                };
                return authObj;
            },
            firestore: () => ({
                collection: (name) => ({
                    doc: (id) => ({
                        get: () => Promise.resolve({
                            exists: true,
                            data: () => {
                                if (name === 'users') {
                                    return {
                                        uid: id,
                                        displayName: 'Admin User',
                                        email: 'admin@afrosint.com',
                                        role: 'administrator',
                                        rank: 'analyst',
                                        suspended: false,
                                        disabled: false,
                                        isOnline: true
                                    };
                                }
                                return {};
                            }
                        }),
                        update: () => Promise.resolve()
                    })
                })
            })
        };
        window.firebase.auth.Auth = { Persistence: { LOCAL: 'local', SESSION: 'session' } };
        window.firebase.firestore.FieldValue = {
            serverTimestamp: () => new Date()
        };
    """)

    # 1. Start at Dashboard
    print("Step 1: Checking Dashboard...")
    page.goto("http://localhost:8000/login/dashboard.html")
    page.wait_for_selector("#panelAdminLink", state="attached", timeout=10000)
    page.wait_for_timeout(1000) # Give some time for async updates

    is_admin_visible = page.is_visible("#panelAdminLink")
    is_report_visible = page.is_visible("#panelReportLink")
    print(f"Dashboard - Admin Link Visible: {is_admin_visible}")
    print(f"Dashboard - Report Link Visible: {is_report_visible}")

    # 2. Go to OSINT
    print("Step 2: Going to OSINT...")
    page.goto("http://localhost:8000/index.html")
    page.wait_for_selector("#mainAppContainer", state="visible", timeout=10000)
    page.wait_for_timeout(1000)

    # Check header in OSINT
    print("Checking OSINT Header...")
    header_admin = page.query_selector("#headerAdminBtn")
    header_report = page.query_selector("#headerReportBtn")
    print(f"OSINT Header - Admin Button exists: {header_admin is not None}")
    print(f"OSINT Header - Report Button exists: {header_report is not None}")

    # 3. Return to Dashboard
    print("Step 3: Returning to Dashboard...")
    page.click("#dashboardBtn")
    page.wait_for_url("**/login/dashboard.html")
    page.wait_for_timeout(1000)

    is_admin_visible_again = page.is_visible("#panelAdminLink")
    is_report_visible_again = page.is_visible("#panelReportLink")
    print(f"Dashboard (Returned) - Admin Link Visible: {is_admin_visible_again}")
    print(f"Dashboard (Returned) - Report Link Visible: {is_report_visible_again}")

    if not is_admin_visible_again:
        print(f"DEBUG: sessionStorage content: {page.evaluate('JSON.stringify(sessionStorage)')}")
        print(f"DEBUG: userRole text: {page.inner_text('#userRole')}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
        finally:
            browser.close()
