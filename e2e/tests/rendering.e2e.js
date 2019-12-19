/*global cy*/
import { fixtures } from './constants';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from '../tests/constants';

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
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    fixtures.forEach(testFixture);
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_MOBILE_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    fixtures.forEach(testFixture);
  });
});
