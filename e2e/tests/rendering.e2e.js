/*global cy Cypress*/
import { DEFAULT_DESKTOP_BROWSERS, FIREFOX_BROWSER } from './settings';
import { testSeoFixtures, testFixtures } from './testFixtures';

const eyesOpener = (testName, browser = DEFAULT_DESKTOP_BROWSERS) => {
  cy.eyesOpen({
    appName: 'Rendering',
    testName,
    browser,
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
      cy.switchOnSeoMode();
    });

    after(() => {
      cy.eyesClose();
    });

    afterEach(() => {
      cy.switchOffSeoMode();
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
      eyesOpener(this.test.parent.title, FIREFOX_BROWSER);
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
