/*global cy*/
import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  DIVIDER_DROPDOWN_OPTIONS,
  GALLERY_SETTINGS,
  GALLERY_IMAGE_SETTINGS,
  IMAGE_SETTINGS,
  GIPHY_PLUGIN,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from '../tests/constants';
import linkPreviewMockRes from './linkPreviewMockRes.json';

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
      cy.loadEditorAndViewer('images');
    });

    after(() => cy.eyesClose());

    it('render image toolbar and settings', function() {
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

  context('full screen', () => {
    before(function() {
      eyesOpen(this);
    });
    beforeEach('load editor', () => cy.switchToDesktop());
    after(() => cy.eyesClose());

    context('image full screen', () => {
      beforeEach('load editor', () => cy.loadEditorAndViewer('images'));

      it('expand image on full screen', function() {
        cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:last`)
          .parent()
          .click();
        cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
      });
    });

    context('gallery full screen', () => {
      beforeEach('load editor', () =>
        cy
          .loadEditorAndViewer('gallery')
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
      );

      it('expand gallery image on full screen', function() {
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

  context('gallery', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render gallery plugin', function() {
      cy.loadEditorAndViewer('gallery')
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1);
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin();
      cy.eyesCheckWindow(this.test.title + ' toolbar');
      cy.openGalleryAdvancedSettings();
      cy.eyesCheckWindow(this.test.title + ' settings');
    });

    it('render gallery out of view', function() {
      cy.loadEditorAndViewer('gallery-out-of-view');
      cy.eyesCheckWindow(`${this.test.title} - out of view`);
      cy.scrollTo('bottom');
      cy.eyesCheckWindow(`${this.test.title} - in view`);
    });

    context('organize media', () => {
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
      cy.loadEditorAndViewer('empty');
    });

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openVideoUploadModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a video from URL', function() {
      cy.openVideoUploadModal().addVideoFromURL();
      cy.shrinkPlugin();
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForVideoToLoad();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a custom video', function() {
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
      cy.loadEditorAndViewer('empty');
    });

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openSoundCloudModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a soundcloud URL', function() {
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

  context('html', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render html plugin toolbar', function() {
      cy.loadEditorAndViewer('empty').addHtml();
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

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render plugin toolbar and change styling', function() {
      cy.loadEditorAndViewer('divider')
        .openPluginToolbar(PLUGIN_COMPONENT.DIVIDER)
        .openDropdownMenu();
      cy.eyesCheckWindow('render divider plugin toolbar');

      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SMALL);
      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_LEFT);

      cy.get('.editor [data-hook=divider-double]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first');

      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.MEDIUM);
      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ALIGN_RIGHT);

      cy.get('.editor [data-hook=divider-dashed]')
        .parent()
        .click();
      cy.get('[data-hook*="PluginToolbar"]:first').openDropdownMenu(
        `[data-hook=${DIVIDER_DROPDOWN_OPTIONS.DOUBLE}]`
      );
      cy.eyesCheckWindow('change divider styling');
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

    it('render giphy plugin toolbar', function() {
      cy.loadEditorAndViewer('giphy');
      cy.openPluginToolbar(PLUGIN_COMPONENT.GIPHY).clickToolbarButton(
        PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER
      );
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
      cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}] img`);
      cy.eyesCheckWindow(this.test.title);
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

    it('render some emojies', function() {
      cy.loadEditorAndViewer('empty');
      cy.get(`button[data-hook=${PLUGIN_COMPONENT.EMOJI}]`).click();
      cy.eyesCheckWindow('render emoji modal');
      cy.get(`[data-hook=emoji-5]`).click();
      cy.get(`[data-hook=emoji-group-5]`).click();
      cy.get(`[data-hook=emoji-95]`).click();
      cy.get(`[data-hook=emoji-121]`).click();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('map', () => {
    before('load editor', function() {
      eyesOpen(this);
      cy.switchToDesktop();
      cy.loadEditorAndViewer('map');
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
      cy.switchToDesktop();
      cy.loadEditorAndViewer('file-upload');
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
      it('align atomic block ' + align, function() {
        cy.loadEditorAndViewer('images').alignImage(align);
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

    beforeEach('load editor', () => cy.loadEditorAndViewer('linkPreview'));

    it('change link preview settings', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW);
      cy.setLinkSettings();
      cy.focusEditor();
    });
    it('convert link preview to regular link', function() {
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW);
      cy.get(`[data-hook=baseToolbarButton_replaceToLink][tabindex!=-1]`).click();
      cy.moveCursorToEnd();
      cy.focusEditor();
    });
    it('backspace key should convert link preview to regular link', function() {
      cy.moveCursorToEnd().type('{backspace}');
      cy.focusEditor();
    });
    it('delete link preview', function() {
      cy.moveCursorToStart();
      cy.openPluginToolbar(PLUGIN_COMPONENT.LINK_PREVIEW);
      cy.get(`[data-hook=blockButton_delete][tabindex!=-1]`).click();
      cy.moveCursorToEnd();
    });
  });

  context('convert link to preview', () => {
    before(function() {
      eyesOpen(this);
    });
    after(() => cy.eyesClose());
    beforeEach('load editor', () => cy.loadEditorAndViewer('empty'));

    it('should create link preview from link after enter key', function() {
      cy.insertLinkAndEnter('www.wix.com');
    });

    it('should embed link that supports embed', function() {
      cy.insertLinkAndEnter('www.instagram.com');
    });
  });
});
