
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
              };
              mockFirestore.FieldValue = {
                serverTimestamp: () => new Date()
              };
              return mockFirestore;
            }
        };

        // Define helpers that admin.js expects
        window.isAdmin = (role) => true;
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

    header = page.locator("#commandHeader")
    header.screenshot(path="verification/screenshots/header_clean_v5.png")

    # 2. Check Admin Page
    print("Checking Admin Page...")
    # Directly inject the missing helper to the page context before it loads scripts
    page.goto("http://localhost:8000/login/admin.html")

    # Re-inject just in case
    page.evaluate("""() => {
        window.isAdmin = (role) => true;
        window.getRankLevel = (rank) => 10;
    }""")

    page.wait_for_selector(".osint-card", timeout=15000)

    list_content = page.inner_html("#personnelList")
    print(f"Personnel List rendered: {'Admin User' in list_content}")

    page.screenshot(path="verification/screenshots/admin_panel_v5.png")

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
