import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
} from '../cypress/dataHooks';

describe('plugins', () => {
  context('image', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('images').openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
    });

    it('should render settings', () => {
      cy.loadEditor('images').openImageSettings();
    });

    it('should allow to add a title', () => {
      cy.loadEditor('images')
        .openImageSettings()
        .addImageTitle();
    });

    it('should allow to add a link', () => {
      cy.loadEditor('images')
        .openImageSettings()
        .addImageLink();
    });
  });

  context('gallery', () => {
    it('should render plugin toolbar', () => {});

    it('should render settings', () => {});
  });

  context('video', () => {
    it('should render plugin toolbar', () => {});

    it('should render settings', () => {});
  });

  context('html', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('html').openPluginToolbar(PLUGIN_COMPONENT.HTML);
    });

    it('should render settings', () => {});
  });

  context('divider', () => {
    before('load editor', () => cy.loadEditor('divider'));

    it('should render plugin toolbar and change styling', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.DIVIDER).openDropdownMenu();
      // applitools eyes
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.SMALL}]`).click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.ALIGN_LEFT}][tabindex=0]`).click();

      cy.get('[data-hook=divider-double]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first');
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.MEDIUM}]`).click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.ALIGN_RIGHT}][tabindex=0]`).click();

      cy.get('[data-hook=divider-dashed]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first').openDropdownMenu(
        `[data-hook=${DIVIDER_DROPDOWN_OPTIONS.DOUBLE}]`
      );
      // applitools eyes
    });
  });

  context('gif', () => {
    before('load editor', () => cy.loadEditor('gif'));

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GIF)
        .get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER}][tabindex=0]`)
        .click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
      // applitools eyes
    });
  });

  context.only('map', () => {
    before('load editor', () => cy.loadEditor('map'));

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.MAP);
      // applitools eyes
      cy.openMapSettings();
    });
  });

  //   afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
});
