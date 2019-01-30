describe('viewer', () => {
  it('should handle text with basic styling', () => {
    cy.viewer('inline-styles');
    cy.matchImageSnapshot('inline-styles');
  });
});
