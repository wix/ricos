/*global cy*/
import { useTheming } from '../cypress/testAppConfig';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from './settings';

function tests() {
  it('no palette, no cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({ skipCssOverride: true })
    ).focusEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('no palette, cssOverride', function() {
    cy.loadRicosEditorAndViewer('storybook-example-app').focusEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('palette, no cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({
        skipCssOverride: true,
        palette: 'darkTheme',
      })
    ).focusEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('palette, cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({ palette: 'darkTheme' })
    ).focusEditor();
    cy.eyesCheckWindow(this.test.title);
  });
}

describe('Theming', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('desktop', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Theming',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToDesktop());

    after(() => cy.eyesClose());

    tests();
  });

  context('mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Theming',
        testName: this.test.parent.title,
        browser: DEFAULT_MOBILE_BROWSERS,
      });
    });

    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    tests();
  });
});
