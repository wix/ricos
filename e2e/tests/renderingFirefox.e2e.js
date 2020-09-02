/*global cy Cypress*/
import { FIREFOX_BROWSERS } from './settings';
import { testSeoFixtures, testFixtures } from './testFixtures';

const eyesOpener = testName => {
  cy.eyesOpen({
    appName: 'Rendering',
    testName,
    browser: FIREFOX_BROWSERS,
  });
};

const firefoxNavigator = () => {
  Object.defineProperty(global, navigator.userAgent, { value: 'firefox', writable: true });
};
describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('desktop', () => {
    before(function() {
      firefoxNavigator();
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
