import os
import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import time

PORT = 8082

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    try:
        # Use allow_reuse_address to avoid "Address already in use" errors
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error: {e}")

async def verify_admin_ui():
    # Start local server
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(1)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Block Firebase CDN to prevent overwriting mocks
        await page.route("**/firebase-*.js", lambda route: route.abort())

        # Mock Firebase before navigation
        await page.add_init_script("""
            window.isSuperAdmin = (role) => true;
            window.isAdmin = (role) => true;
            window.getRankLevel = (rank) => 11;
            window.getRankName = (rank) => "Super Admin";

            const mockFirestore = {
                collection: (col) => ({
                    doc: (id) => ({
                        get: () => Promise.resolve({
                            exists: true,
                            data: () => {
                                if (col === 'users') return { role: 'super_admin', rank: 'afrosint_fellow', displayName: 'Test Admin', networkId: 'afrosint-main' };
                                if (col === 'backups') return { snapshot: { users: {}, reports: {}, networks: {} } };
                                return {};
                            }
                        }),
                        set: () => Promise.resolve(),
                        update: () => Promise.resolve()
                    }),
                    where: function(field, op, val) { return this; },
                    orderBy: function(field, dir) { return this; },
                    get: function() {
                         const snapshot = {
                            empty: false,
                            docs: [
                                {
                                  id: 'backup1',
                                  data: () => ({
                                    createdAt: { toDate: () => new Date('2024-05-15T10:42:15') },
                                    createdBy: 'System'
                                  })
                                }
                            ]
                         };
                         snapshot.forEach = (cb) => snapshot.docs.forEach(cb);
                         return Promise.resolve(snapshot);
                    },
                    add: () => Promise.resolve({ id: 'new-backup-id' })
                }),
                FieldValue: {
                    serverTimestamp: () => new Date()
                }
            };

            window.firebase = {
                initializeApp: () => {},
                auth: () => ({
                    onAuthStateChanged: (callback) => {
                        setTimeout(() => callback({ uid: 'test-admin-id', email: 'admin@afrosint.int' }), 100);
                    },
                    currentUser: { uid: 'test-admin-id', email: 'admin@afrosint.int' },
                    signOut: () => Promise.resolve()
                }),
                firestore: () => mockFirestore
            };

            // Override prompt and confirm
            window.prompt = () => "0";
            window.confirm = () => true;
            window.alert = (msg) => console.log("ALERT: " + msg);
        """)

        await page.goto(f"http://localhost:{PORT}/login/admin.html")
        await page.wait_for_selector("#btn-backups")

        # 1. Test Tab Switching
        print("Testing tab switching...")
        await page.click("#btn-backups")
        await asyncio.sleep(1) # Give it more time to render
        is_backups_active = await page.evaluate("document.getElementById('tab-backups').classList.contains('active')")
        print(f"Backups tab active: {is_backups_active}")

        # 2. Check Backups Table
        print("Checking backups table...")
        backup_text = await page.inner_text("#backupsList")
        print(f"Backups table content: {backup_text}")

        found = '2024' in backup_text or '15/05/2024' in backup_text or '15.5.2024' in backup_text
        print(f"Backups found (contains '2024'): {found}")

        if not found:
             page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))
             await page.evaluate("renderBackups()")
             await asyncio.sleep(1)
             backup_text = await page.inner_text("#backupsList")
             print(f"Backups table content after forced call: {backup_text}")
             found = '2024' in backup_text

        # 3. Check sidebar links existence
        sidebar_links = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('.sidebar-link')).map(el => el.innerText.trim());
        }""")
        print(f"Sidebar links: {sidebar_links}")
        expected_links = ['PERSONNEL', 'NETWORKS', 'SETTINGS', 'BACKUPS']
        links_ok = all(link in sidebar_links for link in expected_links)
        print(f"Sidebar links OK: {links_ok}")

        await browser.close()
        return is_backups_active and found and links_ok

if __name__ == "__main__":
    success = asyncio.run(verify_admin_ui())
    if success:
        print("ADMIN CONSOLE VERIFICATION PASSED.")
    else:
        print("ADMIN CONSOLE VERIFICATION FAILED.")
        exit(1)
