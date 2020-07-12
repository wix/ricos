/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { getPluginMenuConfig, getFooterToolbarConfig, plugins } from '../cypress/testAppConfig';
import { STATIC_TOOLBAR_BUTTONS } from '../cypress/dataHooks';

const pluginMenuRenderer = (title, config) => {
  cy.loadRicosEditorAndViewer('newLines', config)
    .focusEditor()
    .openSideToolbar();
  cy.eyesCheckWindow(title);
};

const footerPluginMenuRenderer = (title, config) => {
  cy.loadRicosEditorAndViewer('newLines', config)
    .focusEditor()
    .openFooterPluginMenu();
  cy.eyesCheckWindow(title);
};

describe('plugin menu test', () => {
  context('plugin menu', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'pluginMenu',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    after(() => cy.eyesClose());

    it('should render horizontal plugin menu', function() {
      pluginMenuRenderer(this.test.title);
    });
    it('should render plugin menu', function() {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig());
    });
    it('should render plugin menu with search', function() {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig({ showSearch: true }));
    });
    it('should render plugin menu with sections', function() {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig({ splitToSections: true }));
    });
    it('should render plugin menu with sections & search', function() {
      pluginMenuRenderer(
        this.test.title,
        getPluginMenuConfig({ splitToSections: true, showSearch: true })
      );
    });
  });
  context('footer toolbar', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'footerPluginMenu',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    after(() => cy.eyesClose());

    it('should render shortcut menu', function() {
      footerPluginMenuRenderer(this.test.title, getFooterToolbarConfig({ morePluginsMenu: {} }));
    });
    it('should render plugin shortcut with search', function() {
      footerPluginMenuRenderer(
        this.test.title,
        getFooterToolbarConfig({ morePluginsMenu: { showSearch: true } })
      );
    });
    it('should render shortcut menu with sections', function() {
      footerPluginMenuRenderer(
        this.test.title,
        getFooterToolbarConfig({ morePluginsMenu: { splitToSections: true } })
      );
    });
  });

  context('side menu modals', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'pluginMenuModals',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach('load editor', () => {
      const config = {
        plugins: [plugins.emoji, plugins.giphy],
      };
      cy.loadRicosEditorAndViewer('newLines', config);
    });

    after(() => cy.eyesClose());

    it('open giphy modal from side menu', function() {
      cy.focusEditor().openSideToolbar();
      cy.clickOnPluginMenuButton(STATIC_TOOLBAR_BUTTONS.GIPHY);
      cy.eyesCheckWindow(this.test.title);
    });
    it('open emoji modal from side menu', function() {
      cy.focusEditor()
        .openSideToolbar()
        .clickOnPluginMenuButton(STATIC_TOOLBAR_BUTTONS.EMOJI);
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
