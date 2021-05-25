/*global cy Cypress*/
import { DEFAULT_MOBILE_BROWSERS } from './settings';
import { testFixtures1, testFixtures2 } from './testFixtures';

describe('editor rendering', () => {
  function eyesOpen() {
    cy.eyesOpen({
      appName: 'Rendering',
      testName: this.test.parent.title,
      browser: DEFAULT_MOBILE_BROWSERS,
    });
  }
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('mobile', () => {
    beforeEach(() => cy.switchToMobile());

    eyesOpen();
    testFixtures1();
    cy.eyesClose();
    eyesOpen();
    testFixtures2();
    cy.eyesClose();
  });
});
