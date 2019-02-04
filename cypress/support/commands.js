require('cypress-image-snapshot/command').addMatchImageSnapshotCommand();
require('@cypress/snapshot').register();

if (Cypress.browser.isHeaded) {
  Cypress.Commands.overwrite('matchImageSnapshot', () => {});
}

const resizeForDesktop = () => cy.viewport('ipad-2');
const resizeForMobile = () => cy.viewport('iphone-5');

const getUrl = (componentId, fixtureName) => {
  const path = `/${componentId}`;
  return fixtureName ? `${path}/${fixtureName}` : path;
};

// Viewport size commands

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

// Editor commands

const getRce = () => cy.window().its('rce');

Cypress.Commands.add('matchContentSnapshot', name => {
  cy
    .window()
    .its('__CONTENT_SNAPSHOT__')
    .snapshot(name ? { name } : undefined);
});

Cypress.Commands.add('matchSnapshots', () => {
  cy
    .matchImageSnapshot()
    .matchContentSnapshot();
});

Cypress.Commands.add('enterParagraphs', pagraphs => {
  cy
    .get('[contenteditable="true"]')
    .type(pagraphs.join('{enter}'));
});

Cypress.Commands.add('enterText', text => {
  cy
    .get('[contenteditable="true"]')
    .type(text);
});

Cypress.Commands.add('newLine', () => {
  cy.enterText('{enter}');
});

Cypress.Commands.add('blurEditor', () => {
  getRce().blur();
});

Cypress.Commands.add('selectText', ({ anchorBlockIndex, anchorOffset, focusOffset, focusBlockIndex }) => {
  getRce().invoke('setSelection', {
    anchorOffset,
    anchorBlockIndex,
    focusOffset,
    focusBlockIndex,
  });
});

Cypress.Commands.add('moveSelectionToEnd', () => {
  getRce().invoke('moveSelectionToEnd');
});

Cypress.Commands.add('setTextStyle', (buttonSelector) => {
  cy.get(`[data-hook=${buttonSelector}]`).click();
});
