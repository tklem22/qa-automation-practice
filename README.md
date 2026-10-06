# QA Automation Practice

**This is a practice project.** It runs automated tests against [saucedemo.com](https://www.saucedemo.com), a public demo site built specifically for QA testing. No real accounts, credentials, or personal data are used.

## What's Tested

| # | Test | What it checks |
|---|------|----------------|
| 1 | Successful login | Standard test user can log in and reach the Products page |
| 2 | Failed login | Wrong password shows the correct error message |
| 3 | Add item to cart | Adding a product updates the cart badge to "1" |
| 4 | Form validation | Submitting an empty checkout form shows "First Name is required" |
| 5 | Page load check | Login page loads with the expected title, logo, and form fields |

## Latest Results

```
✓ successful login with standard user        (784ms)
✓ failed login shows error message            (560ms)
✓ add an item to the cart                     (592ms)
✓ checkout form shows validation error        (642ms)
✓ login page loads correctly                  (570ms)

5 passed (7.0s)
```

**All 5 tests passed in about 7 seconds.**

## How to Run

```bash
# 1. Clone the repo
git clone https://github.com/tklem22/qa-automation-practice.git
cd qa-automation-practice

# 2. Install dependencies
npm install

# 3. Install the Playwright browser
npx playwright install chromium

# 4. Run the tests
npx playwright test
```

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation framework
- [saucedemo.com](https://www.saucedemo.com) — public practice site for QA testing
