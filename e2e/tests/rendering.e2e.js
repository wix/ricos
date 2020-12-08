/*global cy Cypress*/
import { DEFAULT_DESKTOP_BROWSERS, FIREFOX_BROWSER } from './settings';
import { testSeoFixtures, testFixtures } from './testFixtures';

const eyesOpener = testName => {
  cy.eyesOpen({
    appName: 'Rendering',
    testName,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });
};

const eyesOpenerFirefox = testName => {
  cy.eyesOpen({
    appName: 'Rendering',
    testName,
    browser: FIREFOX_BROWSER,
  });
};

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seo', () => {
    before(function() {
      eyesOpener(this.test.parent.title);
    });

    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchToSeoMode();
    });

    after(() => {
      cy.eyesClose();
    });

    testSeoFixtures();
  });

  context('desktop', () => {
    before(function() {
      eyesOpener(this.test.parent.title);
    });

    beforeEach(() => {
      cy.switchToDesktop();
    });

    after(() => {
      cy.eyesClose();
    });

    testFixtures();
  });

  context('firefoxDesktop', () => {
    before(function() {
      eyesOpenerFirefox(this.test.parent.title);
    });

    beforeEach(() => {
      cy.switchToDesktop();
    });

    after(() => {
      cy.eyesClose();
    });
    testFixtures();
  });
});
