import {fixtures} from '../constants';

describe('viewer rendering', () => {
  context('desktop', () => {
    fixtures.forEach(fixture => {
      it(`should render ${fixture}`, () => {
        cy.viewerDesktop(fixture);
        cy.matchImageSnapshot();
      });
    });
  });

  context('mobile', () => {
    fixtures.forEach(fixture => {
      it(`should render ${fixture}`, () => {
        cy.viewerMobile(fixture);
        cy.matchImageSnapshot();
      });
    });
  });
});
