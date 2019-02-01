describe('editor', () => {
  it('should support lists', () => {
    cy.editorDesktop();
    cy.contentSnapshot('before');
    cy.enterText('hello{selectall}');
    cy.contentSnapshot('after');
  });
});
