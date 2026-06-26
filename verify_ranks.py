import os
import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading

PORT = 8080

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        httpd.serve_forever()

async def test_rank_structure():
    # Start local server
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Mock Firebase and Permissions
        # We want to test the logic in permissions.js
        await page.goto(f"http://localhost:{PORT}/login/login.html")

        # Inject our permission logic and test it in the console
        results = await page.evaluate("""() => {
            const results = [];

            // Check levels
            results.push({ test: 'Member Level', result: getRankLevel('member') === 1 });
            results.push({ test: 'Analyst Level', result: getRankLevel('analyst') === 2 });
            results.push({ test: 'Senior Analyst Level', result: getRankLevel('senior_analyst') === 3 });
            results.push({ test: 'Lead Analyst Level', result: getRankLevel('lead_analyst') === 4 });
            results.push({ test: 'Regional Coordinator Level', result: getRankLevel('regional_coordinator') === 5 });
            results.push({ test: 'Deputy Chief Analyst Level', result: getRankLevel('deputy_chief_analyst') === 6 });
            results.push({ test: 'Chief Analyst Level', result: getRankLevel('chief_analyst') === 7 });
            results.push({ test: 'Fellow Level', result: getRankLevel('afrosint_fellow') === 8 });

            // Check report submission (Analyst level 2+)
            results.push({ test: 'Member can submit', result: canSubmitReports('member') === false });
            results.push({ test: 'Analyst can submit', result: canSubmitReports('analyst') === true });
            results.push({ test: 'Fellow can submit', result: canSubmitReports('afrosint_fellow') === false });

            // Check report review (Senior Analyst level 3+)
            results.push({ test: 'Analyst can review', result: canReviewReports('analyst') === false });
            results.push({ test: 'Senior Analyst can review', result: canReviewReports('senior_analyst') === true });

            // Check promotion authority
            // Lead Analyst (4) can promote to Analyst (2), Senior Analyst (3)
            results.push({ test: 'Lead -> Analyst', result: canPromote('lead_analyst', 'analyst') === true });
            results.push({ test: 'Lead -> Senior', result: canPromote('lead_analyst', 'senior_analyst') === true });
            results.push({ test: 'Lead -> Lead', result: canPromote('lead_analyst', 'lead_analyst') === false });

            // Regional Coordinator (5) can promote to Lead Analyst (4)
            results.push({ test: 'RC -> Lead', result: canPromote('regional_coordinator', 'lead_analyst') === true });
            results.push({ test: 'RC -> RC', result: canPromote('regional_coordinator', 'regional_coordinator') === false });

            // Chief Analyst (7) can promote to any rank
            results.push({ test: 'Chief -> Fellow', result: canPromote('chief_analyst', 'afrosint_fellow') === true });

            // Check suspension authority
            // Regional Coordinator (5) can suspend below LC (1-4)
            results.push({ test: 'RC suspends Member', result: canSuspend('regional_coordinator', 'member') === true });
            results.push({ test: 'RC suspends Lead', result: canSuspend('regional_coordinator', 'lead_analyst') === true });
            results.push({ test: 'RC suspends RC', result: canSuspend('regional_coordinator', 'regional_coordinator') === false });

            // Deputy Chief Analyst (6) can suspend below Chief Analyst (1-6)
            results.push({ test: 'DCA suspends RC', result: canSuspend('deputy_chief_analyst', 'regional_coordinator') === true });
            results.push({ test: 'DCA suspends Chief', result: canSuspend('deputy_chief_analyst', 'chief_analyst') === false });

            // Chief Analyst (7) can suspend all
            results.push({ test: 'Chief suspends Chief', result: canSuspend('chief_analyst', 'chief_analyst') === true });

            return results;
        }""")

        failed = [r for r in results if not r['result']]
        if failed:
            print("FAILED TESTS:")
            for f in failed:
                print(f"  - {f['test']}")
            exit(1)
        else:
            print("ALL RANK STRUCTURE LOGIC TESTS PASSED.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_rank_structure())
