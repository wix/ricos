/* eslint-disable max-len */
/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import fixturesNames from './fixtures/preview';

describe('preview', () => {
  before(function() {
    cy.eyesOpen({
      appName: 'Preview',
      testName: this.test.parent.title,
      browser: DEFAULT_DESKTOP_BROWSERS,
    });
  });

  beforeEach(() => cy.switchToDesktop());

  afterEach(() => cy.matchContentSnapshot());

  after(() => cy.eyesClose());

  describe('desktop', () => {
    fixturesNames.forEach((name, index) => {
      it(name, function() {
        cy.loadRicosEditorAndViewer(`preview/example${index + 1}`, { showDefaultPreview: true });
        cy.wait(2000);
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });
});
