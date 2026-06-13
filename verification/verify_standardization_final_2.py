
from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

    # Block heavy assets and REAL Firebase
    page.route("**/*.{png,jpg,jpeg,webp,svg,gif}", lambda route: route.abort())
    page.route("**/globe.gl.min.js", lambda route: route.fulfill(body="console.log('globe mock')"))
    page.route("**/www.gstatic.com/firebasejs/**", lambda route: route.fulfill(body="console.log('firebase cdn blocked')"))

    # Mock Firebase
    page.add_init_script("""
        window.firebase = {
            initializeApp: () => ({}),
            auth: () => ({
                onAuthStateChanged: (cb) => {
                    cb({
                        uid: 'admin123',
                        email: 'admin@afrosint.com',
                        displayName: 'Admin User',
                        photoURL: 'https://via.placeholder.com/150'
                    });
                    return () => {};
                },
                signOut: () => Promise.resolve()
            }),
            firestore: () => ({
                collection: (name) => ({
                    doc: (id) => ({
                        get: () => Promise.resolve({
                            exists: true,
                            data: () => {
                                if (name === 'users') {
                                    return {
                                        uid: id,
                                        displayName: id === 'admin123' ? 'Admin User' : 'Test User',
                                        role: id === 'admin123' ? 'administrator' : 'user',
                                        rank: 'senior_analyst',
                                        suspended: false
                                    };
                                }
                                return {};
                            }
                        }),
                        update: () => Promise.resolve()
                    }),
                    get: () => Promise.resolve({
                        empty: false,
                        forEach: (cb) => {
                            cb({
                                id: 'admin123',
                                data: () => ({
                                    displayName: 'Admin User',
                                    email: 'admin@afrosint.com',
                                    role: 'administrator',
                                    rank: 'senior_analyst',
                                    suspended: false
                                })
                            });
                            cb({
                                id: 'user456',
                                data: () => ({
                                    displayName: 'Test User',
                                    email: 'user@afrosint.com',
                                    role: 'user',
                                    rank: 'member',
                                    suspended: false
                                })
                            });
                        }
                    })
                })
            })
        };
        window.firebase.firestore.FieldValue = {
            serverTimestamp: () => new Date()
        };

        window.isAdmin = (role) => role === 'administrator' || role === 'super_admin';
    """)

    # 1. Check Main OSINT Page
    print("Checking Main OSINT Page...")
    page.goto("http://localhost:8000/index.html")

    # Wait for the app container to become visible
    page.wait_for_selector("#mainAppContainer", state="visible", timeout=15000)
    page.wait_for_selector("#userProfile", state="visible", timeout=15000)

    # Verify buttons are GONE
    admin_btn = page.query_selector("#adminBtn")
    personnel_btn = page.query_selector("#personnelBtn")
    print(f"Admin Button exists: {admin_btn is not None}")
    print(f"Personnel Button exists: {personnel_btn is not None}")

    # Take screenshot of the header specifically
    header = page.locator("#commandHeader")
    header.screenshot(path="verification/screenshots/header_clean.png")

    # Click profile card to redirect - use force to ignore interception for now if it's purely layout-based in the mock
    print("Clicking profile card (forced)...")
    page.click("#userProfile", force=True)
    page.wait_for_timeout(2000)
    print(f"URL after click: {page.url}")

    # 2. Check Admin Page
    print("Checking Admin Page...")
    page.goto("http://localhost:8000/login/admin.html")

    # Wait for personnel list
    page.wait_for_selector(".osint-card", timeout=15000)

    list_content = page.inner_html("#personnelList")
    print(f"Personnel List rendered: {'Admin User' in list_content}")
    print(f"Standardized rank 'administrator' found: {'administrator' in list_content.lower()}")

    page.screenshot(path="verification/screenshots/admin_panel_final.png")

if __name__ == "__main__":
    os.makedirs("verification/screenshots", exist_ok=True)
    os.makedirs("verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="verification/videos")
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
