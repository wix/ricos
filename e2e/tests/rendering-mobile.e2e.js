/*global cy Cypress*/
import { DEFAULT_MOBILE_BROWSERS } from './settings';
import { testFixtures } from './testFixtures';

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

    testFixtures();
  });
});
