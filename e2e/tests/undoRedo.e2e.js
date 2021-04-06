/* eslint-disable max-len */
/*global cy*/
import { IMAGE_SETTINGS, PLUGIN_COMPONENT } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { usePlugins, plugins } from '../cypress/testAppConfig';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Plugins',
    testName: title,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });

describe('plugins', () => {
  context.skip('undo redo', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('should undo and redo image plugin customizations', function() {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.all));
      cy.addImage();
      cy.enterText(' testing undo redo for plugins');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
      cy.openSettings();
      cy.get(`[data-hook=${IMAGE_SETTINGS.PREVIEW}]:first`);
      cy.addImageTitle();
      cy.undo();
      cy.get('div').should('not.have.text', 'Title');
      cy.undo();
      cy.get('span').should('not.have.text', 'testing undo redo for plugins');
      cy.undo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:first`).should('not.exist');
      cy.redo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:first`).should('exist');
      cy.redo();
      cy.get('.public-DraftStyleDefault-block > [data-offset-key="2s2ri-0-0"] > span').should(
        'have.text',
        'testing undo redo for plugins'
      );
      cy.redo();
      cy.get('input').should('have.value', 'Title');
      cy.eyesCheckWindow(this.test.title);
    });

    it('should undo and redo accordion plugin customizations', function() {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.all));
      cy.addAccordion();
      cy.focusAccordion(1).type('Yes ');
      cy.addAccordionPair();
      cy.focusAccordion(2).insertPluginFromSideToolbar('ImagePlugin_InsertButton');
      cy.wait(1000);
      cy.undo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:first`).should('not.exist');
      cy.undo();
      cy.get(`[data-rbd-draggable-context-id=${0}]`)
        .eq(1)
        .should('not.exist');
      cy.wait(100);
      cy.undo().undo();
      cy.get('.public-DraftStyleDefault-block > span').should('have.text', 'Ye');
      cy.undo();
      cy.get('.public-DraftStyleDefault-block > span').should('have.text', 'Y');
      cy.undo();
      cy.get('.public-DraftStyleDefault-block > span').should('not.have.text', 'Yes');
      cy.undo().undo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.ACCORDION}]:first`).should('not.exist');
      cy.redo().redo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.ACCORDION}]:first`).should('exist');
      cy.redo();
      cy.get('.public-DraftStyleDefault-block > span').should('have.text', 'Y');
      cy.redo();
      cy.get('.public-DraftStyleDefault-block > span').should('have.text', 'Ye');
      cy.redo();
      cy.get('.public-DraftStyleDefault-block > span').should('have.text', 'Yes');
      cy.redo().redo();
      cy.get(`[data-rbd-draggable-context-id=${1}]`)
        .eq(1)
        .should('exist');
      cy.redo();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:first`).should('exist');
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
