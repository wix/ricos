/*global cy*/
import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  GALLERY_SETTINGS,
  GALLERY_IMAGE_SETTINGS,
  IMAGE_SETTINGS,
  GIPHY_PLUGIN,
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

  context('image', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render image toolbar and settings [${app.name}]`, function() {
        cy[app.loadApp]('images');
        cy.openImageSettings();
        cy.get(`[data-hook=${IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.title + ' - settings');
        cy.addImageTitle();
        cy.eyesCheckWindow(this.test.title + ' - add image title');
        cy.editImageTitle();
        cy.eyesCheckWindow(this.test.title + ' - in plugin editing');
        cy.openImageSettings(false).deleteImageTitle();
        cy.eyesCheckWindow(this.test.title + ' - delete image title');
        cy.openImageSettings(false).addImageLink();
        cy.eyesCheckWindow(this.test.title + ' - add a link');
        cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeOriginal();
        cy.eyesCheckWindow(this.test.title + '  - plugin original size');
        cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).shrinkPlugin();
        cy.eyesCheckWindow(this.test.title + '  - plugin toolbar');
        cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeBestFit();
        cy.eyesCheckWindow(this.test.title + '  - plugin content size');
        cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeFullWidth();
        cy.eyesCheckWindow(this.test.title + '  - plugin full width size');
      });
    });
  });

  context('full screen', () => {
    before(function() {
      eyesOpen(this);
    });
    beforeEach('load editor', () => cy.switchToDesktop());
    after(() => cy.eyesClose());

    context('image full screen', () => {
      apps.forEach(app => {
        it(`expand image on full screen [${app.name}]`, function() {
          cy[app.loadApp]('images');
          cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:last`)
            .parent()
            .click();
          cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
        });
      });
    });

    context('gallery full screen', () => {
      apps.forEach(app => {
        it(`expand gallery image on full screen [${app.name}]`, function() {
          cy[app.loadApp]('gallery')
            .get(`[data-hook=${'image-item'}]:first`)
            .get(`[data-hook=${'image-item'}]`)
            .eq(1);
          cy.get(`[data-hook=${'image-item'}]`)
            .eq(2)
            .parent()
            .click();
          cy.get('#pgi65a6266ba23a8a55da3f469157f15237_0 > div > div > div > a > div > canvas', {
            timeout: 10000,
          }).should('be.visible');
          cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
          cy.get(`[data-hook=${'nav-arrow-next'}]`).click({ force: true });
          cy.get('#pgiea8ec1609e052b7f196935318316299d_1 > div > div > div > a > div > canvas', {
            timeout: 10000,
          }).should('be.visible');
          cy.get(`[data-hook=${'fullscreen-close-button'}]`).click();
          // cy.eyesCheckWindow({ tag: 'closed fullscreen', target: 'window', fully: false });
        });
      });
    });
  });

  context('gallery', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render gallery plugin', function() {
      // TODO THIS ONE
      // WRAPPER HAS ERROR
      cy.loadEditorAndViewer('gallery')
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1);
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin();
      cy.waitForDocumentMutations();
      cy.eyesCheckWindow(this.test.title + ' toolbar');
      cy.openGalleryAdvancedSettings();
      cy.eyesCheckWindow(this.test.title + ' settings');
    });

    it('render gallery out of view', function() {
      // TODO THIS ONE
      cy.loadEditorAndViewer('gallery-out-of-view');
      cy.eyesCheckWindow(`${this.test.title} - out of view`);
      cy.scrollTo('bottom');
      cy.waitForDocumentMutations();
      cy.eyesCheckWindow(`${this.test.title} - in view`);
    });
    });

    context('organize media', () => {
      // TODO THIS ONE
      // WRAPPER HAS ERROR
      it('allow to manipulate the media items', function() {
        const firstImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`;
        const anyImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]`;
        cy.loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin()
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .get(firstImage)
          .get(anyImage)
          .eq(1);
        cy.eyesCheckWindow(this.test.parent.title + ' - render settings');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - select an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - select all items');
        cy.get(`[data-hook=${GALLERY_SETTINGS.DESELECT}]`).click();
        cy.dragAndDrop(firstImage, anyImage, 1);
        cy.eyesCheckWindow(this.test.parent.title + ' - deselect items');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.get(firstImage);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - delete all items');
      });
    });

    context('media settings', () => {
      // TODO THIS ONE
      // WRAPPER HAS ERROR
      it('allow to update media content', function() {
        cy.loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin()
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .openGalleryImageSettings()
          .get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - render item settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.TITLE}]`).type('Amazing Title');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK}]`).type('Stunning.com');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK_TARGET}]`).click();
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK_NOFOLLOW}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - enter image settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DONE}]:first`).click();
        cy.openGalleryImageSettings();
        cy.eyesCheckWindow(this.test.parent.title + ' - settings saved & title shows on image ');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete a media item');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_SETTINGS.UPLOAD}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete all items');
      });
      // TODO: title and link image tests
      // // eslint-disable-next-line mocha/no-skipped-tests
      // it.skip('allow to add a title', function() {
      //   cy.addGalleryImageTitle().checkTitle();
      //   cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      // });
    });
  });

  context('video', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render upload modal [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.openVideoUploadModal();
        cy.eyesCheckWindow(this.test.title);
      });

      it(`add a video from URL [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.openVideoUploadModal().addVideoFromURL();
        cy.shrinkPlugin();
        cy.focusEditor()
          .type('{uparrow}') //try to fix bug where sometimes it doesn't type
          .type('{uparrow}')
          .type('Will this fix the flakiness?');
        cy.waitForVideoToLoad();
        cy.eyesCheckWindow(this.test.title);
      });
    });

    it.only(`add a custom video`, function() {
      // TODO THIS ONE
      // WRAPPER HAS ERROR
      cy.loadEditorAndViewer('empty');
      cy.openVideoUploadModal().addCustomVideo();
      cy.shrinkPlugin();
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForVideoToLoad();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('soundcloud', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render upload modal [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.openSoundCloudModal();
        cy.eyesCheckWindow(this.test.title);
      });

      it(`add a soundcloud URL [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.openSoundCloudModal().addSoundCloud();
        cy.shrinkPlugin();
        cy.focusEditor()
          .type('{uparrow}') //try to fix bug where sometimes it doesn't type
          .type('{uparrow}')
          .type('Will this fix the flakiness?');
        cy.waitForVideoToLoad();
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('giphy', () => {
    before('load editor', function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render giphy plugin toolbar [${app.name}]`, function() {
        cy[app.loadApp]('giphy');
        cy.openPluginToolbar(PLUGIN_COMPONENT.GIPHY).clickToolbarButton(
          PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER
        );
        cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
        cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}] img`);
        cy.eyesCheckWindow(this.test.title);
      });

      it(`should auto focus on add gif [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.addGif().get('[data-hook=giphyPluginToolbar]');
        cy.window().then(win => {
          win.__CONTENT_SNAPSHOT__ = { mock: true };
        });
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });

  context('emoji', () => {
    before('load editor', function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    apps.forEach(app => {
      it(`render some emojies [${app.name}]`, function() {
        cy[app.loadApp]('empty');
        cy.get(`button[data-hook=${PLUGIN_COMPONENT.EMOJI}]`).click();
        cy.eyesCheckWindow('render emoji modal');
        cy.get(`[data-hook=emoji-5]`).click();
        cy.get(`[data-hook=emoji-group-5]`).click();
        cy.get(`[data-hook=emoji-95]`).click();
        cy.get(`[data-hook=emoji-121]`).click();
        cy.eyesCheckWindow(this.test.title);
      });
    });
  });
});
