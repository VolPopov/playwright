const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ...playwright.configs('flat/recommended'),
    files: ['test/**'],
  },
  {
    files: ['tests/**'],
    rules: {
      'playwright/no-wait-for-timeout': 'error', // Disallow waitForTimeout,
      'playwright/no-commented-out-tests': 'error', // Disallow commented out tests
      'playwright/expect-expect': 'error', // Enforce assertion to be made in a test body
      'playwright/missing-playwright-await': 'error', // Enforce Playwright APIs to be awaited
      'playwright/no-focused-test': 'error', // Dissalow usage of .only annotation,
      'playwright/no-skipped-test': 'error', // Dissalow usage of the .skip annotation
    },
  },
];
