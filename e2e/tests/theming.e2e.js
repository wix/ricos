/*global cy*/
import { useTheming, getPluginMenuConfig } from '../cypress/testAppConfig';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from './settings';

function testFlow(isDesktop, title) {
  if (isDesktop) {
    cy.setEditorSelection(78, 7);
    cy.wait(200);
    cy.eyesCheckWindow(title + ' (formatting selection)');

    cy.setEditorSelection(138, 14);
    cy.wait(200);
    cy.eyesCheckWindow(title + ' (link selection)');
  }
}

function tests({ isDesktop }) {
  it('no palette, no cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({ skipCssOverride: true }),
      getPluginMenuConfig()
    ).focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
  });

  it('no palette, cssOverride', function() {
    cy.loadRicosEditorAndViewer('storybook-example-app').focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
  });

  it('palette, no cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({
        skipCssOverride: true,
        paletteType: 'light',
      })
    ).focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
  });

  it('palette, cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({ paletteType: 'light' })
    ).focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
  });

  it('dark palette, no cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({
        skipCssOverride: true,
        paletteType: 'dark',
      })
    ).focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
  });

  it('dark palette, cssOverride', function() {
    cy.loadRicosEditorAndViewer(
      'storybook-example-app',
      useTheming({ paletteType: 'dark' })
    ).focusEditor();
    cy.wait(2000);
    cy.eyesCheckWindow(this.test.title);
    testFlow(isDesktop, this.test.title);
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

    tests({ isDesktop: true });
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

    tests({});
  });
});
