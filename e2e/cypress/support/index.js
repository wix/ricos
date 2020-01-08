import './commands';

import '@applitools/eyes-cypress/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
