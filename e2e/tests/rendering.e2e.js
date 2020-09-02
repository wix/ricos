/*global cy Cypress*/
import { DEFAULT_DESKTOP_BROWSERS, SAFARI_BROWSERS } from './settings';
import { testSeoFixtures, testFixtures } from './testFixtures';

const eyesOpener = testName => {
  cy.eyesOpen({
    appName: 'Rendering',
    testName,
    browser: [...DEFAULT_DESKTOP_BROWSERS, ...SAFARI_BROWSERS],
  });
};

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('desktop', () => {
    before(function() {
      eyesOpener(this.test.parent.title);
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    testFixtures();
  });

  context('seo', () => {
    before(function() {
      eyesOpener(this.test.parent.title);
    });

    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchToSeoMode();
    });

    after(() => cy.eyesClose());

    testSeoFixtures();
  });
});
