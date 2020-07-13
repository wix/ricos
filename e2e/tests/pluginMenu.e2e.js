/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { getPluginMenuConfig, getFooterToolbarConfig } from '../cypress/testAppConfig';

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
});
