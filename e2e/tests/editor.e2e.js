import { INLINE_TOOLBAR_BUTTONS } from '../cypress/dataHooks';

/* eslint-disable mocha/no-skipped-tests */

describe('editor', () => {
  beforeEach(() => cy.switchToDesktop());

  it('should allow to enter text', () => {
    cy.loadEditor()
      .enterParagraphs([
        'Leverage agile frameworks',
        'to provide a robust synopsis for high level overviews.',
      ])
      .setSelection(0, 0)
      .blurEditor()
      .matchSnapshots();
  });

  it('should allow to apply inline styles and links', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [40, 10])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
      .setLineSpacing(1, [10, 50])
      .setColor(4, [200, 208])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_RIGHT)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_LEFT)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [30, 170])
      .setLink([0, 10], 'https://www.wix.com/')
      .setLink([50, 65], 'https://www.one.co.il/')
      .setColor(1, [300, 305])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.TITLE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST)
      .setLineSpacing(3, [100, 150])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [100, 300])
      .setLink([15, 30], 'https://www.sport5.co.il/')
      .setSelection(0, 0)
      .enterParagraphs(['#LIVING THE DREAM\n'])
      .setLink([0, 17], 'https://www.sport5.co.il')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [0, 10])
      .enterParagraphs(['@NO_MORE\n'])
      .setLink([0, 10], 'https://www.wix.com/')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [0, 10])
      .blurEditor()
      .matchSnapshots();
  });

  it('should allow to create lists', () => {
    cy.loadEditor('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST, [300, 100])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST, [550, 1])
      .matchSnapshots();
  });

  it('should align atomic blocks correctly', () => {
    cy.loadEditor('images')
      .alignImage('left')
      .alignImage('center')
      .alignImage('right')
      .setSelection(0, 0)
      .matchSnapshots();
  });

  context('when in hebrew locale', () => {
    beforeEach(() => cy.switchToHebrew());

    context('desktop', () => {
      beforeEach(() => cy.switchToDesktop());

      it('should render side toolbar in rtl', () => {
        cy.loadEditor()
          .focusEditor()
          .openSideToolbar();
      });

      it('should render text toolbar in rtl', () => {
        cy.loadEditor('plain')
          .setSelection(0, 8)
          .get('[data-hook=inlineToolbar]');
      });

      it('should render rtl and ltr text correctly', () => {
        cy.loadEditor('hebrew');
      });

      it('should render external modal in rtl', () => {
        cy.loadEditor('images')
          .openImageSettings()
          .get('[data-hook="imageSettingsCaptionInput"]')
          .blur();
      });

      afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
    });

    context('mobile', () => {
      beforeEach(() => cy.switchToMobile());

      it('should render add plugin modal in rtl', () => {
        cy.loadEditor()
          .focusEditor()
          .openAddPluginModal();
      });

      it('should render rtl and ltr text correctly', () => {
        cy.loadEditor('hebrew');
      });

      it('should render external modal in rtl', () => {
        cy.loadEditor('images')
          .openImageSettings()
          .get('[aria-label="Cancel"]')
          .blur();
      });

      afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
    });
  });
});
