/* eslint-disable max-len */
/*global cy*/
import { IMAGE_SETTINGS } from '../cypress/dataHooks';
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
      cy.eyesCheckWindow('remove image caption');
      cy.undo();
      cy.eyesCheckWindow('remove text');
      cy.undo();
      cy.eyesCheckWindow('remove image');
      cy.redo();
      cy.eyesCheckWindow('return image');
      cy.redo();
      cy.eyesCheckWindow('return text');
      cy.redo();
      cy.eyesCheckWindow(this.test.title);
    });

    it('should undo and redo accordion plugin customizations', function() {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.all));
      cy.addAccordion();
      cy.focusAccordion(1).type('Yes\n');
      cy.addAccordionPair();
      cy.focusAccordion(2).insertPluginFromSideToolbar('ImagePlugin_InsertButton');
      cy.eyesCheckWindow(this.test.title);
      cy.undo()
        .undo()
        .undo()
        .undo()
        .undo()
        .undo()
        .undo();
      cy.eyesCheckWindow('undid all changes of accordion');
      cy.redo()
        .redo()
        .redo()
        .redo();
      cy.redo()
        .redo()
        .redo();
      cy.eyesCheckWindow('redid all changes of accordion');
    });
  });
});
