import { INLINE_TOOLBAR_BUTTONS } from '../cypress/dataHooks';

describe('editor', () => {
  before(() =>
    cy.eyesOpen({
      appName: 'Rich Content Editor',
      browser: { width: 800, height: 600 },
      batchName: 'rich-content',
    })
  );
  beforeEach(() => cy.switchToDesktop());

  it('should allow to enter text', () => {
    cy.loadEditor()
      .enterParagraphs([
        'Leverage agile frameworks',
        'to  a robust synopsis for high level overviews.',
      ])
      .blurEditor();
    cy.eyesCheckWindow('should allow to enter text');
    // .matchSnapshots();
  });

  it('should allow to apply inline styles', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [0, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ALIGNMENT)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [30, 170])
      .setColor(3, [20, 30])
      .setLineSpacing(3, [30, 100])
      .setSelection(0, 0)
      .blurEditor();
    // .matchSnapshots();
    cy.eyesCheckWindow('should allow to apply inline styles');
  });

  it('should allow to create lists', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST, [300, 100])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST, [550, 1]);
    // .matchSnapshots();
    cy.eyesCheckWindow('should allow to create lists');
  });

  it('should align atomic blocks correctly', () => {
    cy.loadEditor('images')
      .alignImage('left')
      .alignImage('center')
      .alignImage('right')
      .matchSnapshots();
  });

  context('when in hebrew locale', () => {
    beforeEach(() => cy.switchToHebrew());

    context('desktop', () => {
      beforeEach(() => cy.switchToDesktop());

      it('should render plugin toolbar in rtl', () => {
        cy.loadEditor()
          .focusEditor()
          .openPluginToolbar();
        cy.eyesCheckWindow('should render plugin toolbar in rtl');
      });

      it('should render text toolbar in rtl', () => {
        cy.loadEditor('plain')
          .setSelection(0, 8)
          .get('[data-hook=inlineToolbar]');
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

      // afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
    });

    context('mobile', () => {
      beforeEach(() => cy.switchToMobile());

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

      after(() => {
        cy.eyesClose();
      });
    });
  });
});
