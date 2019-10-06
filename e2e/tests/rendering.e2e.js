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
    cy.eyesCheckWindow(`should render ${fixture}`);
  });

describe('editor rendering', () => {
  afterEach(() => cy.eyesClose());

  context('desktop', () => {
    beforeEach(function() {
      cy.eyesOpen({
        batchName: 'Rendering',
        browser: [{ width: 1440, height: 900, name: 'chrome' }],
      });
      cy.switchToDesktop();
    });
    fixtures.forEach(testFixture);
  });

  context('mobile', () => {
    beforeEach(function() {
      cy.eyesOpen({
        batchName: 'Rendering',
        browser: { deviceName: 'iPhone 6/7/8' },
      });
      cy.switchToMobile();
    });
    fixtures.forEach(testFixture);
  });
});
