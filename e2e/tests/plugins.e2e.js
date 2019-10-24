import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
  GALLERY_SETTINGS,
  GALLERY_IMAGE_SETTINGS,
  IMAGE_SETTINGS,
} from '../cypress/dataHooks';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Rich Content - Plugins',
    batchName: 'Plugins',
    testName: title,
    browser: [{ width: 1440, height: 900, name: 'chrome' }],
  });

describe('plugins', () => {
  beforeEach(function() {
    cy.switchToDesktop();
  });

  afterEach(() => cy.matchContentSnapshot());

  context('image', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadEditor('images'));

    after(() => cy.eyesClose());

    it('render image plugin toolbar', function() {
      cy.log(this);
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).shrinkPlugin();
      cy.eyesCheckWindow(this.test.title);
    });

    it('render settings', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings();
      cy.get(`[data-hook=${IMAGE_SETTINGS.PREVIEW}]:first`);
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to add a title', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings()
        .addImageTitle();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to add a link', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings()
        .addImageLink();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to delete a title', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .shrinkPlugin()
        .openImageSettings()
        .addImageTitle();
      cy.openImageSettings().deleteImageTitle();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('gallery', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () =>
      cy
        .loadEditorAndViewer('gallery')
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1)
    );

    after(() => cy.eyesClose());

    it('render gallery plugin toolbar', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin();
      cy.eyesCheckWindow(this.test.title);
    });

    it('render advanced gallery settings', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
        .shrinkPlugin()
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1)
        .openGalleryAdvancedSettings();
      cy.eyesCheckWindow(this.test.title);
    });

    context('organize media', () => {
      beforeEach('load editor', () =>
        cy
          .loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin()
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`)
          .get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]`)
          .eq(1)
      );

      it('render gallery settings', function() {
        cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`);
        cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]`).eq(1);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to select an item', function() {
        cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to select all items', function() {
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to delete an item', function() {
        cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to delete all items', function() {
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to re-organize', function() {
        const src = `[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`;
        const dest = `[data-hook=${GALLERY_SETTINGS.IMAGE}]`;
        cy.dragAndDrop(src, dest, 1);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });
    });

    context('image settings', () => {
      beforeEach('load editor', () =>
        cy
          .loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin()
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .openGalleryImageSettings()
          .get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`)
      );

      it('render gallery image settings', function() {
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      // eslint-disable-next-line mocha/no-skipped-tests
      it.skip('allow to add a title', function() {
        cy.addGalleryImageTitle().checkTitle();
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to delete an image', function() {
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });

      it('allow to delete all images', function() {
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_SETTINGS.UPLOAD}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      });
    });
  });

  context('video', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadEditor('empty'));

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openVideoUploadModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('enable to add a video from URI', function() {
      cy.openVideoUploadModal()
        .addVideoFromURI()
        .shrinkPlugin();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`);
      cy.eyesCheckWindow(this.test.title);
    });

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('enable to add a custom video', function() {
      cy.openVideoUploadModal()
        .addCustomVideo()
        .shrinkPlugin();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`);
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('soundcloud', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => cy.loadEditor('empty'));

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openSoundCloudModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('enable to add a soundcloud URI', function() {
      cy.openSoundCloudModal()
        .addSoundCloud()
        .shrinkPlugin();
      cy.get(`[data-hook=${PLUGIN_COMPONENT.SOUND_CLOUD}]:first`);
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('html', () => {
    before(function() {
      eyesOpen(this);
    });

    after(() => cy.eyesClose());

    it('render html plugin toolbar', function() {
      cy.loadEditor('empty').addHtml();
      cy.get(`[data-hook*=${PLUGIN_TOOLBAR_BUTTONS.EDIT}]`)
        .click({ multiple: true })
        .click();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('divider', () => {
    before(function() {
      eyesOpen(this);
    });

    after(() => cy.eyesClose());

    it('render plugin toolbar and change styling', function() {
      cy.loadEditor('divider')
        .openPluginToolbar(PLUGIN_COMPONENT.DIVIDER)
        .openDropdownMenu();
      cy.eyesCheckWindow('render divider plugin toolbar');

      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.SMALL}]`).click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.ALIGN_LEFT}][tabindex=0]`).click();

      cy.get('.editor [data-hook=divider-double]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first');
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.MEDIUM}]`).click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.ALIGN_RIGHT}][tabindex=0]`).click();

      cy.get('.editor [data-hook=divider-dashed]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first').openDropdownMenu(
        `[data-hook=${DIVIDER_DROPDOWN_OPTIONS.DOUBLE}]`
      );
      cy.eyesCheckWindow('change divider styling');
    });
  });

  context('gif', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.loadEditor('gif');
    });

    after(() => cy.eyesClose());

    it('render giphy plugin toolbar', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.GIF)
        .get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER}][tabindex=0]`)
        .click();
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('map', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.loadEditor('map');
    });

    after(() => cy.eyesClose());

    it('render map plugin toolbar and settings', function() {
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
      cy.loadEditor('file-upload');
    });

    after(() => cy.eyesClose());

    it('render file-upload plugin toolbar', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.FILE_UPLOAD);
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
