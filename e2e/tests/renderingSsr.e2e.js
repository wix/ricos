/*global cy Cypress*/
import { fixturesToTestOnSeo } from './constants';
import { DEFAULT_DESKTOP_BROWSERS } from '../tests/constants';

const testFixtureOnSsr = fixture =>
  it(`render ${fixture} in ssr`, function() {
    cy.loadEditorAndViewerOnSsr(fixture);
    cy.eyesCheckWindow(this.test.title);
  });

describe('editor rendering', () => {
  before(function() {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seo', () => {
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
  });
});
