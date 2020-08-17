/*global cy Cypress*/
import { fixturesToTestOnSeo, DEFAULT_DESKTOP_BROWSERS } from './settings';

const testFixtureOnSsr = fixture =>
  it(`render ${fixture} in ssr`, function() {
    cy.loadTestAppOnSsr(fixture, 'rce');
    cy.eyesCheckWindow(this.test.title);
  });

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seoSSR', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchToSeoMode();
    });

    after(() => cy.eyesClose());

    fixturesToTestOnSeo.forEach(testFixtureOnSsr);

    it(`render Ricos Preview in ssr`, function() {
      cy.loadTestAppOnSsr('preview/example3', 'ricos', { showDefaultPreview: true });
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
