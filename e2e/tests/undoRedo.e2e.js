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
  //   afterEach(() => cy.matchContentSnapshot());

  context('undo redo', () => {
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
      cy.enterParagraphs([' testing undo redo for plugins']);
      cy.openImageSettings();
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
      cy.focusAccordion(1).type('Yes\n');
      cy.addAccordionPair();
      cy.focusAccordion(2).insertPluginFromSideToolbar('ImagePlugin_InsertButton');
      cy.undo()
        .undo()
        .undo()
        .undo()
        .undo()
        .undo()
        .undo();
      cy.redo()
        .redo()
        .redo()
        .redo();
      cy.redo()
        .redo()
        .redo();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
