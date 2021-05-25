/*global cy Cypress*/
import { DEFAULT_DESKTOP_BROWSERS, FIREFOX_BROWSER } from './settings';
import { testSeoFixtures, testFixtures1, testFixtures2 } from './testFixtures';

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
    beforeEach(() => {
      cy.switchToDesktop();
    });

    eyesOpener('desktop');
    testFixtures1();
    cy.eyesClose();

    eyesOpener('desktop');
    testFixtures2();
    cy.eyesClose();
  });

  context('firefoxDesktop', () => {
    beforeEach(() => {
      cy.switchToDesktop();
    });

    eyesOpener('firefoxDesktop', FIREFOX_BROWSER);
    testFixtures1();
    cy.eyesClose();

    eyesOpener('firefoxDesktop', FIREFOX_BROWSER);
    testFixtures2();
    cy.eyesClose();
  });
});
