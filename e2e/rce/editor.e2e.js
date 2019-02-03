describe('editor', () => {
  it('should support lists', () => {
    cy
      .editorDesktop()
      .matchContentSnapshot('before')
      .enterText('hello')
      .selectText({ anchorBlockIndex: 0, anchorOffset: 2, focusOffset: 5 })
      .get('[data-hook=textInlineStyleButton_Bold]').click()
      .matchContentSnapshot('after')
      .matchImageSnapshot();
  });
});
