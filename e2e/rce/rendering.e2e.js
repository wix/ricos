import {fixtures} from '../constants';

describe('editor rendering', () => {
  context('desktop', () => {
    fixtures.forEach(fixture => {
      it(`should render ${fixture}`, () => {
        cy.editorDesktop(fixture);
        cy.matchImageSnapshot();
      });
    });
  });

  context('mobile', () => {
    fixtures.forEach(fixture => {
      it(`should render ${fixture}`, () => {
        cy.editorMobile(fixture);
        cy.matchImageSnapshot();
      });
    });
  });
});
