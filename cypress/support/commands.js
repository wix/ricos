import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('viewer', fixtureName => {
  cy.visit(`/rcv/${fixtureName}`);
});

Cypress.Commands.add('editor', fixtureName => {
  cy.visit(`/rce/${fixtureName}`);
});
