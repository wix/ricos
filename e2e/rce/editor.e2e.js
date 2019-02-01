describe('editor', () => {
  it('should support lists', () => {
    cy.editorDesktop();

    cy.matchContentSnapshot('before');

    cy.enterText('hello{selectall}');
    cy.get('[data-hook=textInlineStyleButton_Bold]').click();

    cy.matchContentSnapshot('after');
    cy.matchImageSnapshot();
  });
});
