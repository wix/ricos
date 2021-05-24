# Guidelines for making changes to converter functions

Most tests are based on the `migration-content.json` content file found in `e2e/tests/fixtures`
When changes are made to this file you must update baselines that are created from it.

To update all baselines run `yarn updateBaselines`
To update a specific baseline (like only plain text) run `yarn updateBaselines text`
