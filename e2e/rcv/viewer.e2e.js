describe('viewer', () => {
  context('desktop', () => {
    it('inline styles', () => {
      cy.viewerDesktop('inline-styles');
      cy.matchImageSnapshot();
    });

    it('lists', () => {
      cy.viewerDesktop('lists');
      cy.matchImageSnapshot();
    });

    it('headers', () => {
      cy.viewerDesktop('headers');
      cy.matchImageSnapshot();
    });

    it('quote', () => {
      cy.viewerDesktop('quote');
      cy.matchImageSnapshot();
    });
  });

  context('mobile', () => {
    it('inline styles', () => {
      cy.viewerMobile('inline-styles');
      cy.matchImageSnapshot();
    });

    it('lists', () => {
      cy.viewerMobile('lists');
      cy.matchImageSnapshot();
    });

    it('headers', () => {
      cy.viewerMobile('headers');
      cy.matchImageSnapshot();
    });

    it('quote', () => {
      cy.viewerMobile('quote');
      cy.matchImageSnapshot();
    });
  });
});
