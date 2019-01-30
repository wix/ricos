import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

const resizeForDesktop = () => cy.viewport('ipad-2');
const resizeForMobile = () => cy.viewport('iphone-5');

Cypress.Commands.add('viewerDesktop', fixtureName => {
  resizeForDesktop();
  cy.visit(`/rcv/${fixtureName}`);
});

Cypress.Commands.add('viewerMobile', fixtureName => {
  resizeForMobile();
  cy.visit(`/rce/${fixtureName}?mobile=true`);
});

Cypress.Commands.add('editorDesktop', fixtureName => {
  resizeForDesktop();
  cy.visit(`/rce/${fixtureName}`);
});

Cypress.Commands.add('editorMobile', fixtureName => {
  resizeForMobile();
  cy.visit(`/rce/${fixtureName}?mobile=true`);
});
