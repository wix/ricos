/*global cy Cypress*/
import {
  DEFAULT_DESKTOP_BROWSERS,
  DEFAULT_MOBILE_BROWSERS,
  RENDER_TEST_FIXTURES,
} from './settings';

const testFixture = fixture =>
  it(`render ${fixture}`, function() {
    cy.loadEditorAndViewer(fixture);
    if (fixture.includes('video')) {
      cy.waitForVideoToLoad();
    }
    cy.eyesCheckWindow(this.test.title);
  });

const testPlatform = type => {
  const isMobile = type === 'mobile';
  context(type, () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Rendering',
        testName: this.test.parent.title,
        browser: isMobile ? DEFAULT_MOBILE_BROWSERS : DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => (isMobile ? cy.switchToMobile() : cy.switchToDesktop()));

    after(() => cy.eyesClose());

    RENDER_TEST_FIXTURES.forEach(testFixture);
  });
};

describe('editor rendering', () => {
  testPlatform('desktop');
  testPlatform('mobile');
});
