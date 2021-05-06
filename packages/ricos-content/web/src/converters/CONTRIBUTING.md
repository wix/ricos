# Guidelines for making changes to converter functions

Most tests are based on the `intro.json` and `migration-content.json` content files found in `e2e/tests/fixtures`
When changes are made to these files you must update test files that are based on them

## fromDraft
Update the content files in `statics/json/migratedFixtures` by runnig `yarn migrateFixtures migration-content` or `yarn migrateFixtures intro` from root package

## toPlainText
Update the content of `complexPlainText.ts` by copying the result of `yarn toPlainText migration-content` from root package
