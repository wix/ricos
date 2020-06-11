/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { getPluginMenuConfig } from '../cypress/testAppConfig';

const pluginMenuRenderer = (title, config) => {
  cy.loadRicosEditorAndViewer('newLines', config)
    .focusEditor()
    .openSideToolbar();
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
});
