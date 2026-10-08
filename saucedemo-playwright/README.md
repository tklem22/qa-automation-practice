# Saucedemo Playwright tests

[![Saucedemo Playwright tests](https://github.com/tklem22/qa-automation-practice/actions/workflows/saucedemo-tests.yml/badge.svg?branch=main)](https://github.com/tklem22/qa-automation-practice/actions/workflows/saucedemo-tests.yml)

Automated UI tests for [saucedemo.com](https://www.saucedemo.com), a public practice store, written with [Playwright](https://playwright.dev) and TypeScript.

## What is tested

| File | Covers |
|---|---|
| `tests/login.spec.ts` | Valid login, locked-out user, wrong password |
| `tests/cart.spec.ts` | Adding an item updates the cart badge |
| `tests/sorting.spec.ts` | Name A-Z / Z-A and price low-high / high-low, checked against the real item order |
| `tests/checkout.spec.ts` | Full purchase to confirmation; missing first name error |
| `tests/broken-users.spec.ts` | Behaviour of the site's deliberately broken demo users (see below) |

19 tests in total: 12 ordinary tests plus 7 `KNOWN BUG` tests that are expected to fail.

## Structure

- `pages/` - page objects (`LoginPage`, `InventoryPage`, `CheckoutPage`) holding selectors and actions.
- `tests/fixtures.ts` - gives each test ready-made page objects (`loginPage`, `inventory`, `checkout`).
- `playwright.config.ts` - base URL, HTML report, screenshots on failure.

## Run it

Requires Node.js.

```bash
cd saucedemo-playwright
npm ci
npx playwright install chromium

npm test                          # run everything
npx playwright test --headed      # watch the browser
npx playwright test sorting       # one file
npx playwright show-report        # open the HTML report
```

## Continuous integration

`.github/workflows/saucedemo-tests.yml` (at the repo root) runs the suite on every push and pull request and uploads the HTML report as an artifact. The badge above shows the latest result on `main`.

## Bugs found on the broken demo users

Saucedemo ships users with intentional defects. The tests assert the *correct* behaviour; where the site is wrong, the test is marked `KNOWN BUG` and contains `test.fail()`, so it counts as passing while the bug exists. When the site is fixed the test will start failing - delete the `test.fail()` line then.

| User | Bug observed |
|---|---|
| `problem_user` | All 6 products show the same image (1 unique image source) |
| `problem_user` | Sorting by price low-high does not produce a correctly ordered list |
| `problem_user` | After adding then removing an item, the cart badge still shows a count |
| `problem_user` | Checkout stays on the info form (step one) after submitting valid details |
| `performance_glitch_user` | Products take several seconds to appear after login (a 2-second limit is exceeded) |
| `error_user` | Removing an item does not clear the cart badge |
| `error_user` | Checkout cannot be completed; no confirmation appears after Finish |

Not covered: `visual_user` (its defects are visual and need screenshot comparison).

## Notes

- The password used in the tests (`secret_sauce`) is saucedemo's published demo password, not a secret.
