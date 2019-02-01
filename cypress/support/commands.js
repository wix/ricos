require('cypress-image-snapshot/command').addMatchImageSnapshotCommand();
require('@cypress/snapshot').register();

const resizeForDesktop = () => cy.viewport('ipad-2');
const resizeForMobile = () => cy.viewport('iphone-5');


const getUrl = (componentId, fixtureName) => {
  const path = `/${componentId}`;
  return fixtureName ? `${path}/${fixtureName}` : path;
};

Cypress.Commands.add('viewerDesktop', fixtureName => {
  resizeForDesktop();
  cy.visit(getUrl('rcv', fixtureName));
});

Cypress.Commands.add('viewerMobile', fixtureName => {
  resizeForMobile();
  cy.visit(`${getUrl('rcv', fixtureName)}?mobile=true`);
});

Cypress.Commands.add('editorDesktop', fixtureName => {
  resizeForDesktop();
  cy.visit(getUrl('rce', fixtureName));
});

Cypress.Commands.add('editorMobile', fixtureName => {
  resizeForMobile();
  cy.visit(`${getUrl('rce', fixtureName)}?mobile=true`);
});

Cypress.Commands.add('enterText', text => {
  cy
    .get('[contenteditable="true"]')
    .type(text);
});

Cypress.Commands.add('contentSnapshot', name => {
  cy.window().its('__CONTENT_SNAPSHOT__').snapshot({ name });
});
