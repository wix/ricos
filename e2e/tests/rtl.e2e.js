describe('rtl', () => {
  beforeEach(() => cy.switchToHebrew());

  afterEach(() => cy.matchContentSnapshot());

  context('desktop', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rich Content - RTL',
        batchName: 'RTL',
        testName: this.test.parent.title,
        browser: { width: 1440, height: 900, name: 'chrome' },
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    it('render plugin toolbar in rtl', function() {
      cy.loadEditor()
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });

    it('render text toolbar in rtl', function() {
      cy.loadEditor('plain')
        .setSelection(0, 8)
        .get('[data-hook=inlineToolbar]')
        .should('be.visible')
        .get('[data-hook=addPluginFloatingToolbar]')
        .should('be.visible');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render rtl and ltr text correctly', function() {
      cy.loadEditor('hebrew');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render external modal in rtl', function() {
      cy.loadEditor('images')
        .openImageSettings()
        .get('[data-hook="imageSettingsCaptionInput"]')
        .blur();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rich Content - RTL',
        batchName: 'RTL',
        testName: this.test.parent.title,
        browser: { deviceName: 'iPhone 6/7/8' },
      });
    });

    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    it('render add plugin modal in rtl', function() {
      cy.loadEditor()
        .focusEditor()
        .openAddPluginModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('render rtl and ltr text correctly', function() {
      cy.loadEditor('hebrew');
      cy.eyesCheckWindow(this.test.title);
    });

    it('render external modal in rtl', function() {
      cy.loadEditor('images')
        .openImageSettings()
        .get('[aria-label="Cancel"]')
        .blur();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
