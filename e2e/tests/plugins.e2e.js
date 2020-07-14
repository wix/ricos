/*global cy*/
import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
  STATIC_TOOLBAR_BUTTONS,
  BUTTON_PLUGIN_MODAL,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from './settings';
import { usePlugins, plugins, usePluginsConfig } from '../cypress/testAppConfig';

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

  // context('html', () => {
  //   before(function() {
  //     eyesOpen(this);
  //   });

  //   beforeEach('load editor', () => {
  //     cy.switchToDesktop();
  //   });

  //   after(() => cy.eyesClose());

  //   it('render html plugin toolbar', function() {
  //     cy.loadRicosEditorAndViewer('empty')
  //       .addHtml()
  //       .waitForHtmlToLoad();
  //     cy.get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.EDIT}]`)
  //       .click({ multiple: true })
  //       .click();
  //     cy.eyesCheckWindow(this.test.title);
  //   });
  // });

  context('divider', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render plugin toolbar and change styling', () => {
      cy.loadRicosEditorAndViewer('divider')
        .openPluginToolbar(PLUGIN_COMPONENT.DIVIDER)
        .openDropdownMenu();
      cy.eyesCheckWindow('render divider plugin toolbar');

      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SMALL);
      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_LEFT);

      cy.get('#RicosEditorContainer [data-hook=divider-double]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first');

      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.MEDIUM);
      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_RIGHT);

      cy.get('#RicosEditorContainer [data-hook=divider-dashed]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first').openDropdownMenu(
        `[data-hook=${DIVIDER_DROPDOWN_OPTIONS.DOUBLE}]`
      );
      cy.eyesCheckWindow('change divider styling');
    });
  });

  context('map', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('map');
      cy.get('.dismissButton').eq(1);
    });

    after(() => cy.eyesClose());

    it('render map plugin toolbar and settings', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.MAP);
      cy.eyesCheckWindow('render map plugin toolbar');
      cy.openMapSettings();
      cy.get('.gm-style-cc');
      cy.eyesCheckWindow('render map settings');
    });
  });

  context('file-upload', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('file-upload');
    });

    after(() => cy.eyesClose());

    it('render file-upload plugin toolbar', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.FILE_UPLOAD);
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('drag and drop', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('dragAndDrop');
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
      it('align atomic block ' + align, function() {
        cy.loadRicosEditorAndViewer('images').alignImage(align);
        cy.eyesCheckWindow(this.test.title);
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

    beforeEach('load editor', () =>
      cy.loadRicosEditorAndViewer('link-preview', usePlugins(plugins.embedsPreset))
    );

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
    context('with default config', () => {
      before(function() {
        eyesOpen(this);
      });
      const testAppConfig = {
        ...usePlugins(plugins.embedsPreset),
        ...usePluginsConfig({
          LINK_PREVIEW: {
            enableEmbed: undefined,
            enableLinkPreview: undefined,
          },
        }),
      };
      after(() => cy.eyesClose());
      beforeEach('load editor', () => cy.loadRicosEditorAndViewer('empty', testAppConfig));

      it('should create link preview from link after enter key', function() {
        cy.insertLinkAndEnter('www.wix.com');
        cy.eyesCheckWindow(this.test.title);
      });

      it('should embed link that supports embed', function() {
        cy.insertLinkAndEnter('www.mockUrl.com');
        cy.eyesCheckWindow(this.test.title);
      });
    });
    context('with custom config', () => {
      before(function() {
        eyesOpen(this);
      });
      const testAppConfig = {
        ...usePlugins(plugins.embedsPreset),
        ...usePluginsConfig({
          'wix-draft-plugin-link-preview': {
            enableEmbed: false,
            enableLinkPreview: false,
          },
        }),
      };
      after(() => cy.eyesClose());
      beforeEach('load editor', () => cy.loadRicosEditorAndViewer('empty', testAppConfig));

      it('should not create link preview when enableLinkPreview is off', function() {
        cy.insertLinkAndEnter('www.wix.com');
        cy.eyesCheckWindow(this.test.title);
      });

      it('should not embed link when enableEmbed is off', function() {
        cy.insertLinkAndEnter('www.mockUrl.com');
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('social embed', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.linkPreview));
    });

    after(() => cy.eyesClose());
    const embedTypes = ['TWITTER', 'INSTAGRAM', 'YOUTUBE'];
    embedTypes.forEach(embedType => {
      it(`render ${embedType.toLowerCase()} upload modals`, function() {
        cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS[embedType]);
        cy.eyesCheckWindow(this.test.title + ' modal');
        cy.addSocialEmbed('www.mockUrl.com').waitForHtmlToLoad();
        cy.get(`#RicosViewerContainer [data-hook=HtmlComponent]`);
        cy.eyesCheckWindow(this.test.title + ' added');
      });
    });
  });

  context('list', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadRicosEditorAndViewer());

    after(() => cy.eyesClose());
    it('create nested lists using tab & shift-tab', function() {
      cy.loadRicosEditorAndViewer()
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
    after(() => cy.eyesClose());

    context('verticals embed modal', () => {
      beforeEach('load editor', () => {
        cy.switchToDesktop();
        cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.verticalEmbed));
      });
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

    context('verticals embed widget', () => {
      beforeEach('load editor', () => {
        cy.switchToDesktop();
        cy.loadRicosEditorAndViewer('vertical-embed', usePlugins(plugins.verticalEmbed));
      });
      it('should replace widget', () => {
        cy.openPluginToolbar(PLUGIN_COMPONENT.VERTICAL_EMBED);
        cy.clickToolbarButton('baseToolbarButton_replace');
        cy.get(`[data-hook*=verticalsItemsList]`)
          .children()
          .first()
          .click();
        cy.get(`[data-hook=settingPanelFooterDone]`).click();
      });
    });
  });

  context('link button', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadRicosEditorAndViewer('link-button'));

    after(() => cy.eyesClose());

    it('create link button & customize it', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.BUTTON)
        .get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.ADV_SETTINGS}][tabindex!=-1]`)
        .click()
        .get(`[data-hook*=ButtonInputModal][placeholder="Enter a URL"]`)
        .type('www.wix.com')
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.DESIGN_TAB}]`)
        .click()
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.BUTTON_SAMPLE}]`)
        .click()
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.DONE}]`)
        .click();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('action button', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () =>
      cy.loadRicosEditorAndViewer('action-button', usePlugins(plugins.actionButton))
    );

    after(() => cy.eyesClose());
    it('create action button & customize it', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.BUTTON)
        .get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.ADV_SETTINGS}][tabindex!=-1]`)
        .click()
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.DESIGN_TAB}]`)
        .click()
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.BUTTON_SAMPLE}]`)
        .click()
        .get(`[data-hook*=${BUTTON_PLUGIN_MODAL.DONE}]`)
        .click();
      cy.eyesCheckWindow(this.test.title);
    });

    it('create action button & click it', function() {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get(`[data-hook*=${PLUGIN_COMPONENT.BUTTON}]`)
        .last()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('onClick event..');
        });
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('headings', () => {
    before(function() {
      eyesOpen(this);
    });

    const testAppConfig = {
      ...usePlugins(plugins.headings),
      ...usePluginsConfig({
        HeadingsDropdown: {
          dropDownOptions: ['P', 'H2', 'H3'],
        },
      }),
    };

    function setHeader(number, selection) {
      cy.setTextStyle('headingsDropdownButton', selection)
        .get(`[data-hook=headingsDropdownPanel] > :nth-child(${number})`)
        .click();
    }

    function testHeaders(config) {
      cy.loadRicosEditorAndViewer('empty', config).enterParagraphs([
        'Leverage agile frameworks',
        'to provide a robust synopsis for high level overviews.',
      ]);
      setHeader(3, [0, 24]);
      cy.eyesCheckWindow('change heading type');
      setHeader(2, [28, 40]);
      cy.setTextStyle('headingsDropdownButton', [28, 40]);
      cy.eyesCheckWindow('change heading type');
    }

    after(() => cy.eyesClose());

    it('Change headers - with dropDownOptions config', () => {
      testHeaders(testAppConfig);
    });

    it('Change headers - without dropDownOptions config', () => {
      testHeaders(usePlugins(plugins.headings));
    });
  });

  context('Text/Highlight Color - mobile', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'Text/Highlight Color - mobile',
        testName: this.test.parent.title,
        browser: DEFAULT_MOBILE_BROWSERS,
      });
    });
    beforeEach(() => cy.switchToMobile());

    after(() => cy.eyesClose());

    it('allow to color text', function() {
      cy.loadRicosEditorAndViewer()
        .enterParagraphs(['Color.'])
        .setTextColor([0, 5], 'color4');
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to highlight text', function() {
      cy.loadRicosEditorAndViewer()
        .enterParagraphs(['Highlight.'])
        .setHighlightColor([0, 9], 'color4');
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
