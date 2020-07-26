/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from './settings';

describe('rtl', () => {
  beforeEach(() => cy.switchToHebrew());

  afterEach(() => cy.matchContentSnapshot());

  context('desktop', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'RTL',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    it('render plugin toolbar in rtl', function() {
      cy.loadRicosEditorAndViewer()
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });

    it('render text toolbar in rtl', function() {
      cy.loadRicosEditorAndViewer('plain')
        .setEditorSelection(0, 8)
        .get('[data-hook=inlineToolbar]')
        .should('be.visible')
        .get('[data-hook=addPluginFloatingToolbar]')
        .should('be.visible');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render rtl and ltr text correctly', function() {
      cy.loadRicosEditorAndViewer('hebrew');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render external modal in rtl', function() {
      cy.loadRicosEditorAndViewer('images')
        .openImageSettings()
        .get('[data-hook="imageSettingsCaptionInput"]')
        .blur();
      cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
    });

    it('render text with indentation in rtl', function() {
      cy.loadRicosEditorAndViewer('hebrew_with_indentation');
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'RTL',
        testName: this.test.parent.title,
        browser: DEFAULT_MOBILE_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    it('render add plugin modal in rtl', function() {
      cy.loadRicosEditorAndViewer()
        .focusEditor()
        .openAddPluginModal();
      cy.wait(200);
      cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
    });

    it('render rtl and ltr text correctly', function() {
      cy.loadRicosEditorAndViewer('hebrew');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render external modal in rtl', function() {
      cy.loadRicosEditorAndViewer('images')
        .openImageSettings()
        .get('[data-hook="ImageSettingsMobileHeaderCancel"]')
        .blur();
      cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
    });

    it('render text with indentation in rtl', function() {
      cy.loadRicosEditorAndViewer('hebrew_with_indentation');
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
