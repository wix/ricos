/*global cy Cypress*/
import { fixtures } from './constants';
import { DEFAULT_MOBILE_BROWSERS } from '../tests/constants';

const testFixture = fixture =>
  it(`render ${fixture}`, function() {
    cy.loadEditorAndViewer(fixture);
    if (fixture.includes('gallery')) {
      cy.scrollTo(0, 100);
      cy.waitForDocumentMutations();
      cy.scrollTo(0, 0);
    }
    if (fixture.includes('video')) {
      cy.waitForVideoToLoad();
    } else if (fixture.includes('html')) {
      cy.waitForHtmlToLoad();
    }
    cy.eyesCheckWindow(this.test.title);
  });

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
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

    after(() => {
      cy.eyesClose();
    });

    fixtures.forEach(testFixture);
  });
});
