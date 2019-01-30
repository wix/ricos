describe('viewer', () => {
  context('desktop', () => {
    it('inline styles', () => {
      cy.viewerDesktop('inline-styles');
      cy.matchImageSnapshot();
    });
  });

  context('mobile', () => {
    it('inline styles', () => {
      cy.viewerMobile('inline-styles');
      cy.matchImageSnapshot();
    });
  });
});
