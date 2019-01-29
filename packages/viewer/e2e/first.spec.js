describe('viewer', () => {
  it('should handle text with basic styling', () => {
    cy.visit('/v/viewer/inline-styles');
    cy.matchImageSnapshot('inline-styles');
  });
});
