---
id: E2E
title: E2E Tests
sidebar_label: E2E Tests
---

# E2E Tests

## Running E2E tests
- `npm run e2e` - starts test env and runs Cypress in headless browser (OSX & Windows)
- `npm run e2e:updateSnapshots` - same as running `e2e` script except it updates all non-matching snapshots automatically
- `npm run e2e:ci` - starts test env and runs Cypress in headless browser (Linux). Note: tests will fail if snapshots were not committed to git
- `npm run e2e:env` - builds and starts test env
- `npm run e2e:env:dev` - starts test env in watch mode
- `npm run e2e:debug` - runs Cypress in interactive mode (requires test env running)

