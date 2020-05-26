/*global cy*/
import { INLINE_TOOLBAR_BUTTONS } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { usePlugins, plugins } from '../cypress/testAppConfig';

describe('text', () => {
  before(function() {
    cy.eyesOpen({
      appName: 'Text',
      testName: this.test.parent.title,
      browser: DEFAULT_DESKTOP_BROWSERS,
    });
  });

  beforeEach(() => cy.switchToDesktop());

  afterEach(() => cy.matchContentSnapshot());

  after(() => cy.eyesClose());

  it('allow to enter text', function() {
    cy.loadEditorAndViewer()
      .enterParagraphs([
        'Leverage agile frameworks',
        'to provide a robust synopsis for high level overviews.',
      ])
      .setSelection(0, 0)
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to apply inline styles and links', function() {
    cy.loadEditorAndViewer('plain')
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
      .setSelection(0, 0)
      // TODO: should fix unstable behavior of mention
      // .enterParagraphs(['@NO_MORE\n'])
      .setLink([0, 10], 'https://www.wix.com/')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [0, 10])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to apply inline styles and links - isolated', function() {
    cy.loadIsolatedEditorAndViewer('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [40, 10])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_RIGHT)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_LEFT)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [30, 170])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.TITLE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST)
      .setSelection(0, 0)
      .enterParagraphs(['#LIVING THE DREAM\n'])
      .setSelection(0, 0)
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to enter hashtag with link', function() {
    cy.loadEditorAndViewer()
      .enterParagraphs([
        '#wix.com wix.com #this_is_not_a_link #will_be_a_link thisislink#youknow.com ',
      ])
      .setLink([37, 15], 'https://www.wix.com/');
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to create lists', function() {
    cy.loadEditorAndViewer('plain')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST, [300, 100])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST, [550, 1])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it.only('open link toolbar (InlinePluginToolbar)', function() {
    // set link
    cy.loadEditorAndViewer('plain')
      .setLink([0, 10], 'https://www.wix.com/')
      // set cursor on link
      .setSelection(5, 0)
      .wait(200);
    // take snapshot of the toolbar
    cy.eyesCheckWindow(this.test.title);
    // edit link
    cy.get(`[data-hook=linkPluginToolbar] [data-hook=LinkButton]`)
      .click()
      .get(`[data-hook=linkPanelContainer] [data-hook=linkPanelInput]`)
      .type('https://www.google.com/')
      .get(`[data-hook=linkPanelContainerDone]`)
      .click();
    // check url button
    cy.get(`[data-hook=linkPluginToolbar] a`).should(
      'have.attr',
      'href',
      'https://www.google.com/'
    );
    // remove link
    cy.get(`[data-hook=linkPluginToolbar] [data-hook=RemoveLinkButton]`).click();
  });

  it('should paste plain text', () => {
    cy.loadEditorAndViewer()
      .focusEditor()
      .paste('This is pasted text');
  });

  it('allow to enter tab character', function() {
    cy.loadEditorAndViewer()
      .focusEditor()
      .tab()
      .enterParagraphs(['How to eat healthy is a good question.'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to enter tab character and delete it using shift+tab', function() {
    cy.loadEditorAndViewer()
      .focusEditor()
      .tab()
      .moveCursorToStart()
      .type('{rightarrow}')
      .tab({ shift: true })
      .enterParagraphs(['Text should not include tab.'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('Enter click should create new block with the same alignment', function() {
    cy.loadEditorAndViewer()
      .enterParagraphs(['Hey, next line should be centered!'])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [0, 33])
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setSelection(33, 0)
      .type('{enter}')
      .type('{enter}')
      .enterParagraphs(['I am centered!'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  context('indentation', () => {
    it('allow to apply indent on a single block with inline styling', function() {
      cy.loadEditorAndViewer('plain', usePlugins(plugins.textPlugins))
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [40, 10])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([200, 100])
        .increaseIndent([200, 100])
        .decreaseIndent([200, 100])
        .decreaseIndent([200, 100])
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent on multiple text blocks', function() {
      cy.loadEditorAndViewer('text-blocks', usePlugins(plugins.textPlugins))
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .decreaseIndent([0, 550])
        .moveCursorToStart()
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent only on text blocks', function() {
      cy.loadEditorAndViewer('non-text-only-blocks', usePlugins(plugins.textPlugins))
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .moveCursorToStart()
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent and delete it when clicking backspace where cursor is at start of block', function() {
      cy.loadEditorAndViewer('', usePlugins(plugins.textPlugins))
        .enterParagraphs(['Text should have depth 1.'])
        .increaseIndent([0, 20])
        .increaseIndent([0, 20])
        .moveCursorToStart()
        .type('{backspace}')
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent when clicking tab/shift+tab on selected block', function() {
      cy.loadEditorAndViewer('', usePlugins(plugins.textPlugins))
        .focusEditor()
        .enterParagraphs(['Text should not include indentation.'])
        .type('{selectall}')
        .tab()
        .moveCursorToStart()
        .type('{selectall}')
        .tab({ shift: true })
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
