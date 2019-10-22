import { fixtures } from './constants';

// function testViewerAndEditorAreEqual() {
//   function getTitle(test = Cypress.mocha.getRunner().test) {
//     return (test.parent && test.parent.title ? `${getTitle(test.parent)} > ` : '') + test.title;
//   }
//   cy.get('.DraftEditor-root').matchImageSnapshot(getTitle());
//   cy.get('#root > div:nth-child(2) > div').matchImageSnapshot(getTitle());
// }

const testFixture = fixture =>
  it(`render ${fixture}`, function() {
    cy.loadEditorAndViewer(fixture);
    cy.eyesCheckWindow(this.test.title);
  });

describe('editor rendering', () => {
  context('desktop', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rich Content - Rendering',
        batchName: 'Rendering',
        testName: this.test.parent.title,
        browser: [{ width: 1440, height: 900, name: 'chrome' }],
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    fixtures.forEach(testFixture);
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rich Content - Rendering',
        batchName: 'Rendering',
        testName: this.test.parent.title,
        browser: { deviceName: 'iPhone 6/7/8' },
      });
    });

    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    fixtures.forEach(testFixture);
  });
});
