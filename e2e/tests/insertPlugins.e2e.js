/*global cy*/
import { STATIC_TOOLBAR_BUTTONS } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';

describe('insert plugins test', () => {
  before(function() {
    cy.eyesOpen({
      appName: 'insert plugins',
      testName: this.test.parent.title,
      browser: DEFAULT_DESKTOP_BROWSERS,
    });
  });

  beforeEach(() => cy.switchToDesktop());

  // afterEach(() => cy.matchContentSnapshot());

  after(() => cy.eyesClose());

  it.only('should insert divider plugin', function() {
    cy.loadWrapperEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.DIVIDER)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should insert code block plugin', function() {
    cy.loadEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.CODE_BLOCK)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should insert map plugin', function() {
    cy.loadEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.MAP)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should insert file upload plugin', function() {
    cy.loadEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.FILE_UPLOAD)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should insert button plugin', function() {
    cy.loadEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.BUTTON)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should insert html plugin', function() {
    cy.loadEditorAndViewer()
      .insertPlugin(STATIC_TOOLBAR_BUTTONS.HTML)
      .wait(200);
    cy.eyesCheckWindow(this.test.title);
  });
});
