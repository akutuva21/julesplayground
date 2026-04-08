from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        try:
            print("Navigating to app...")
            page.goto("http://localhost:3000/bngplayground/")
            page.wait_for_selector("text=BNG Playground")

            # Click the Analysis tab
            print("Clicking Analysis tab...")
            page.get_by_text("Analysis").click()
            time.sleep(0.5)

            # Click Bifurcation
            print("Clicking Bifurcation...")
            page.get_by_text("Bifurcation").click()
            time.sleep(1)

            print("Selecting parameter and species...")
            selects = page.locator("select")
            # Select first available option in first two dropdowns
            selects.nth(0).select_option(index=1) # Parameter
            selects.nth(1).select_option(index=1) # Species

            print("Clicking Run Continuation...")
            page.get_by_role("button", name="Run Continuation").click()

            # Wait for any computation
            time.sleep(3)

            print("Taking final screenshot...")
            page.screenshot(path="/home/jules/verification/screenshots/verification2.png", full_page=True)
            print("Success!")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/home/jules/verification/screenshots/error.png", full_page=True)
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    run()
