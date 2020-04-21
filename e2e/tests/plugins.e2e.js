/*global cy*/
import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
  STATIC_TOOLBAR_BUTTONS,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS, apps } from './settings';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Plugins',
    testName: title,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });

describe('plugins', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('html', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render html plugin toolbar - [${app.name}]`, function() {
        cy[app.func]('empty')
          .addHtml()
          .waitForHtmlToLoad();
        cy.get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.EDIT}]`)
          .click({ multiple: true })
          .click();
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('divider', () => {
    beforeEach(function() {
      eyesOpen(this);
      cy.switchToDesktop();
    });

    afterEach(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render plugin toolbar and change styling - [${app.name}]`, () => {
        cy[app.func]('divider')
          .openPluginToolbar(PLUGIN_COMPONENT.DIVIDER)
          .openDropdownMenu();
        cy.eyesCheckWindow('render divider plugin toolbar');

        cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SMALL);
        cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_LEFT);

        cy.get('[data-hook*="divider-double"]:first')
          .parent()
          .click();
        cy.get('[data-hook*="PluginToolbar"]:first');

        cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.MEDIUM);
        cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_RIGHT);

        cy.get('[data-hook*="divider-dashed"]:first')
          .parent()
          .click();
        cy.get('[data-hook*="PluginToolbar"]:first').openDropdownMenu(
          `[data-hook=${DIVIDER_DROPDOWN_OPTIONS.DOUBLE}]`
        );
        cy.eyesCheckWindow('change divider styling');
      });
    });
  });

  context('map', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render map plugin toolbar and settings - [${app.name}]`, () => {
        cy[app.func]('map');
        cy.get('.dismissButton').eq(1);
        cy.openPluginToolbar(PLUGIN_COMPONENT.MAP);
        cy.eyesCheckWindow('render map plugin toolbar');
        cy.openMapSettings();
        cy.get('.gm-style-cc');
        cy.eyesCheckWindow('render map settings');
      });
    });
  });

  context('file-upload', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render file-upload plugin toolbar - [${app.name}]`, function() {
        cy[app.func]('file-upload');
        cy.openPluginToolbar(PLUGIN_COMPONENT.FILE_UPLOAD);
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('drag and drop', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
      cy.loadEditorAndViewer('dragAndDrop');
    });

    after(() => cy.eyesClose());

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('drag and drop plugins', function() {
      cy.focusEditor();
      const src = `[data-hook=${PLUGIN_COMPONENT.IMAGE}] + [data-hook=componentOverlay]`;
      const dest = `span[data-offset-key="fjkhf-0-0"]`;
      cy.dragAndDropPlugin(src, dest);
      cy.get('img[style="opacity: 1;"]');
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('alignment', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    function testAtomicBlockAlignment(align) {
      apps.forEach(app => {
        it(`align atomic block ${align} - [${app.name}]`, function() {
          cy[app.func]('images').alignImage(align);
          cy.eyesCheckWindow(this.test.title);
        });
      });
    }

    testAtomicBlockAlignment('left');
    testAtomicBlockAlignment('center');
    testAtomicBlockAlignment('right');
  });

  context('link preview', () => {
    before(function() {
      eyesOpen(this);
    });
    after(() => cy.eyesClose());

    beforeEach('load editor', () => cy.loadEditorAndViewer('link-preview', 'embedsPreset'));

    it('change link preview settings', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW);
      cy.setLinkSettings();
      cy.triggerLinkPreviewViewerUpdate();
      cy.eyesCheckWindow(this.test.title);
    });
    it('convert link preview to regular link', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW);
      cy.clickToolbarButton('baseToolbarButton_replaceToLink');
      cy.triggerLinkPreviewViewerUpdate();
      cy.eyesCheckWindow(this.test.title);
    });
    it('backspace key should convert link preview to regular link', function() {
      cy.focusEditor()
        .type('{downarrow}{downarrow}')
        .type('{backspace}');
      cy.triggerLinkPreviewViewerUpdate();
      cy.eyesCheckWindow(this.test.title);
    });
    it('delete link preview', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW).wait(100);
      cy.clickToolbarButton('blockButton_delete');
      cy.triggerLinkPreviewViewerUpdate();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('convert link to preview', () => {
    before(function() {
      eyesOpen(this);
    });
    after(() => cy.eyesClose());
    beforeEach('load editor', () => cy.loadEditorAndViewer('empty', 'embedsPreset'));

    it('should create link preview from link after enter key', function() {
      cy.insertLinkAndEnter('www.wix.com');
      cy.eyesCheckWindow(this.test.title);
    });

    it('should embed link that supports embed', function() {
      cy.insertLinkAndEnter('www.mockUrl.com');
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('social embed', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadEditorAndViewer('empty', 'linkPreview');
    });

    after(() => cy.eyesClose());
    const embedTypes = ['TWITTER', 'INSTAGRAM', 'YOUTUBE'];
    it('render upload modals', function() {
      embedTypes.forEach(embedType => {
        cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS[embedType]);
        cy.eyesCheckWindow(this.test.title);
        cy.addSocialEmbed('www.mockUrl.com');
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('list', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadEditorAndViewer());

    after(() => cy.eyesClose());
    it('create nested lists using tab & shift-tab', function() {
      cy.loadEditorAndViewer()
        .enterParagraphs(['1. Hey I am an ordered list in depth 1.'])
        .tab()
        .enterParagraphs(['\n Hey I am an ordered list in depth 2.'])
        .tab()
        .enterParagraphs(['\n Hey I am an ordered list in depth 1.'])
        .tab({ shift: true })
        .enterParagraphs(['\n\n1. Hey I am an ordered list in depth 0.'])
        .enterParagraphs(['\n\n- Hey I am an unordered list in depth 1.'])
        .tab()
        .enterParagraphs(['\n Hey I am an unordered list in depth 2.'])
        .tab()
        .enterParagraphs(['\n Hey I am an unordered list in depth 1.'])
        .tab({ shift: true })
        .enterParagraphs(['\n\n- Hey I am an unordered list in depth 0.']);
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('verticals embed', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadEditorAndViewer('empty', 'verticalEmbed');
    });

    after(() => cy.eyesClose());
    // const embedTypes = ['EVENT', 'PRODUCT', 'BOOKING'];
    const embedTypes = ['PRODUCT'];
    it('render upload modals', function() {
      embedTypes.forEach(embedType => {
        cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS[embedType]);
        cy.eyesCheckWindow(this.test.title);
        cy.get(`[data-hook*=settingPanelFooterCancel][tabindex!=-1]`).click();
      });
    });
  });
});
