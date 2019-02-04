import { TEXT_BUTTONS } from '../../cypress/dataHooks';

describe('editor', () => {
  it('should allow to enter text', () => {
    cy
      .editorDesktop()
      .enterParagraphs([
        'Leverage agile frameworks',
        'to provide a robust synopsis for high level overviews.'
      ])
      .matchSnapshots();
  });

  it('should allow to apply inline styles', () => {
    cy
      .editorDesktop('plain')
      .selectText({ anchorOffset: 0, focusOffset: 5 })
      .setTextStyle(TEXT_BUTTONS.BOLD)
      .selectText({ anchorOffset: 10, focusOffset: 15 })
      .setTextStyle(TEXT_BUTTONS.UNDERLINE)
      .selectText({ anchorOffset: 20, focusOffset: 25 })
      .setTextStyle(TEXT_BUTTONS.ITALIC)
      .selectText({ anchorOffset: 30, focusOffset: 35 })
      .setTextStyle(TEXT_BUTTONS.BOLD)
      .setTextStyle(TEXT_BUTTONS.UNDERLINE)
      .setTextStyle(TEXT_BUTTONS.ITALIC)
      // .setTextStyle(TEXT_BUTTONS.ALIGNMENT)
      // .setTextStyle(TEXT_BUTTONS.ALIGNMENT_CENTER)
      // .setTextStyle(TEXT_BUTTONS.QUOTE)
      // .moveSelectionToEnd()
      // .newLine()
      // .enterText(exampleText[2])
      .matchSnapshots();
  });

  it('should allow to create lists', () => {
    cy
      .editorDesktop('plain')
      .selectText({ anchorBlockIndex: 1, focusBlockIndex: 2, focusOffset: 1 })
      .setTextStyle(TEXT_BUTTONS.ORDERED_LIST)
      .selectText({ anchorBlockIndex: 4, focusBlockIndex: 5, focusOffset: 1 })
      .setTextStyle(TEXT_BUTTONS.UNORDERED_LIST)
      // .moveSelectionToEnd()
      // .newLine()
      // .enterText(exampleText[2])
      .matchSnapshots();
  });
});
