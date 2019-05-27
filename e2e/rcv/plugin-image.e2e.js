describe('viewer', () => {
  context('desktop', () => {
    it('images', () => {
      cy.viewerDesktop('images');
      cy.matchImageSnapshot();
    });
  });

  context('mobile', () => {
    it('images', () => {
      cy.viewerDesktop('images');
      cy.matchImageSnapshot();
    });
  });
});
