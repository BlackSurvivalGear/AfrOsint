
from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.on("requestfailed", lambda request: print(f"REQ FAILED: {request.url} - {request.failure.error_text}"))

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
            firestore: () => {
              const mockFirestore = {
                collection: (name) => ({
                    doc: (id) => ({
                        get: () => Promise.resolve({
                            exists: true,
                            data: () => {
                                if (name === 'users') {
                                    return {
                                        uid: id,
                                        displayName: id === 'admin123' ? 'Admin User' : 'Test User',
                                        role: 'administrator',
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
                        }
                    })
                })
              };
              mockFirestore.FieldValue = {
                serverTimestamp: () => new Date()
              };
              return mockFirestore;
            }
        };

        // Ensure these are globally available even if permissions.js fails
        window.isAdmin = (role) => {
            if (!role) return false;
            return ['administrator', 'super_admin'].includes(role.toLowerCase());
        };
        window.getRankLevel = (rank) => 10;
        window.checkAuthState = () => {};
    """)

    # 1. Check Main OSINT Page
    print("Checking Main OSINT Page...")
    page.goto("http://localhost:8000/index.html")
    page.wait_for_selector("#mainAppContainer", state="visible", timeout=15000)

    # Verify buttons are GONE
    admin_btn = page.query_selector("#adminBtn")
    print(f"Admin Button exists: {admin_btn is not None}")

    # 2. Check Admin Page
    print("Checking Admin Page...")
    page.goto("http://localhost:8000/login/admin.html")

    page.wait_for_selector(".osint-card", timeout=15000)

    list_content = page.inner_html("#personnelList")
    print(f"Personnel List rendered: {'Admin User' in list_content}")

    page.screenshot(path="verification/screenshots/admin_panel_v6.png")

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
