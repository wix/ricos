import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
  GALLERY_SETTINGS,
  IMAGE_SETTINGS,
} from '../cypress/dataHooks';

describe('plugins', () => {
  context('image', () => {
    beforeEach('load editor', () => cy.loadEditor('images'));

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).shrinkPlugin();
    });

    it('should render settings', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings();
      cy.get(`[data-hook=${IMAGE_SETTINGS.PREVIEW}]:first`);
    });

    it('should allow to add a title', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings()
        .addImageTitle();
    });

    it('should allow to add a link', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings()
        .addImageLink();
    });
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('gallery', () => {
    beforeEach('load editor', () =>
      cy
        .loadEditorAndViewer('gallery')
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1)
    );

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin();
    });

    it('should render advanced gallery settings', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
        .shrinkPlugin()
        .openGalleryAdvancedSettings();
    });

    it('should render gallery settings', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
        .shrinkPlugin()
        .openGalleryAdvancedSettings()
        .openGallerySettings();
      cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`);
      cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]`).eq(1);
    });

    it('should render gallery image settings', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
        .shrinkPlugin()
        .openGalleryAdvancedSettings()
        .openGallerySettings()
        .openGalleryImageSettings();
      cy.get(`[data-hook=${GALLERY_SETTINGS.PREVIEW}]:first`);
    });

    it('should allow to add a title', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
        .shrinkPlugin()
        .openGalleryAdvancedSettings()
        .openGallerySettings()
        .openGalleryImageSettings()
        .addGalleryImageTitle()
        .checkTitle();
    });
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('video', () => {
    beforeEach('load editor', () => cy.loadEditor('empty'));

    it('should render upload modal', () => {
      cy.openVideoUploadModal();
    });

    //   it('should enable to add a video from URI', () => {
    //     cy.openVideoUploadModal()
    //       .addVideoFromURI()
    //       .shrinkPlugin();
    //     cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`);
    //   });

    //   it('should enable to add a custom video', () => {
    //     cy.openVideoUploadModal()
    //       .addCustomVideo()
    //       .shrinkPlugin();
    //     cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`);
    //   });
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('soundcloud', () => {
    beforeEach('load editor', () => cy.loadEditor('empty'));

    it('should render upload modal', () => {
      cy.openSoundCloudModal();
    });

    // it('should enable to add a soundcloud URI', () => {
    //   cy.openSoundCloudModal()
    //     .addSoundCloud()
    //     .shrinkPlugin();
    //   cy.get(`[data-hook=${PLUGIN_COMPONENT.SOUND_CLOUD}]:first`);
    // });
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('html', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('empty').addHtml();
      cy.get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.EDIT}]`)
        .click({ multiple: true })
        .click();
      // applitools eyes
    });

    it('should render settings', () => {});
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('divider', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('divider').openPluginToolbar(PLUGIN_COMPONENT.DIVIDER);
    });

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
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
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
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('map', () => {
    before('load editor', () => cy.loadEditor('map'));

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.MAP);
      // applitools eyes
      cy.openMapSettings();
    });

    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });

  context('file-upload', () => {
    before('load editor', () => cy.loadEditor('file-upload'));

    it('should render plugin toolbar', () => {
      cy.openPluginToolbar(PLUGIN_COMPONENT.FILE_UPLOAD);
      // applitools eyes
    });
    afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
  });
});
