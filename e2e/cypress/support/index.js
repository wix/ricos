import './commands';

import '@applitools/eyes-cypress/commands';

before(() => {
  cy.exec('git symbolic-ref --short HEAD')
    .its('stdout')
    .as('currentBranch');
});
