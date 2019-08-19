import { fixtures } from './constants';

// function testViewerAndEditorAreEqual() {
//   function getTitle(test = Cypress.mocha.getRunner().test) {
//     return (test.parent && test.parent.title ? `${getTitle(test.parent)} > ` : '') + test.title;
//   }
//   cy.get('.DraftEditor-root').matchImageSnapshot(getTitle());
//   cy.get('#root > div:nth-child(2) > div').matchImageSnapshot(getTitle());
// }

const testFixture = fixture =>
  it(`should render ${fixture}`, () => {
    cy.loadEditorAndViewer(fixture);
    cy.matchImageSnapshot();
    // testViewerAndEditorAreEqual();
  });

describe('editor rendering', () => {
  context('desktop', () => {
    beforeEach(() => cy.switchToDesktop());
    fixtures.forEach(testFixture);
  });

  context('mobile', () => {
    beforeEach(() => cy.switchToMobile());
    fixtures.forEach(testFixture);
  });
});
