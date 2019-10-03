describe('rtl', () => {
  beforeEach(() => cy.switchToHebrew());

  afterEach(() => cy.eyesClose().matchContentSnapshot());

  context('desktop', () => {
    beforeEach(function() {
      cy.eyesOpen({
        batchName: 'RTL',
        browser: [{ width: 1440, height: 900, name: 'chrome' }],
        // branchName: this.currentBranch,
      });
      cy.switchToDesktop();
    });

    it('should render plugin toolbar in rtl', () => {
      cy.loadEditor()
        .focusEditor()
        .openPluginToolbar();
      cy.eyesCheckWindow('should render plugin toolbar in rtl');
    });

    it('should render text toolbar in rtl', () => {
      cy.loadEditor('plain')
        .setSelection(0, 8)
        .get('[data-hook=inlineToolbar]')
        .should('be.visible')
        .get('[data-hook=addPluginFloatingToolbar]')
        .should('be.visible');
      cy.eyesCheckWindow('should render text toolbar in rtl');
    });

    it('should render rtl and ltr text correctly', () => {
      cy.loadEditor('hebrew');
      cy.eyesCheckWindow('should render rtl and ltr text correctly');
    });

    it('should render external modal in rtl', () => {
      cy.loadEditor('images')
        .openImageSettings()
        .get('[data-hook="imageSettingsCaptionInput"]')
        .blur();
      cy.eyesCheckWindow('should render external modal in rtl');
    });
  });

  context('mobile', () => {
    beforeEach(function() {
      cy.eyesOpen({
        batchName: 'RTL',
        browser: { deviceName: 'iPhone 6/7/8' },
        // branchName: this.currentBranch,
      });
      cy.switchToMobile();
    });

    it('should render add plugin modal in rtl', () => {
      cy.loadEditor()
        .focusEditor()
        .openAddPluginModal();
      cy.eyesCheckWindow('should render add plugin modal in rtl');
    });

    it('should render rtl and ltr text correctly', () => {
      cy.loadEditor('hebrew');
      cy.eyesCheckWindow('should render rtl and ltr text correctly');
    });

    it('should render external modal in rtl', () => {
      cy.loadEditor('images')
        .openImageSettings()
        .get('[aria-label="Cancel"]')
        .blur();
      cy.eyesCheckWindow('should render external modal in rtl');
    });
  });
});
