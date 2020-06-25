/*global Cypress, cy*/
import { STATIC_TOOLBAR_BUTTONS } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { usePlugins, plugins, usePluginsConfig } from '../cypress/testAppConfig';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Insert Plugins',
    testName: title,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });

const mockUpload = (files, updateEntity) => {
  const testItem = {
    metadata: {
      height: 1000,
      lastModified: 1445860855,
      name: '8b72558253b2502b401bb46e5599f22a',
      size: 1100727,
      width: 1920,
    },
    orderIndex: 0,
    photoId: '8b72558253b2502b401bb46e5599f22a',
    url: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
  };
  const data = {
    id: testItem.photoId,
    original_file_name: files && files[0] ? files[0].name : testItem.url,
    file_name: testItem.url,
    width: testItem.metadata.width,
    height: testItem.metadata.height,
  };
  setTimeout(() => {
    updateEntity({
      data,
      files,
      // error: { msg: 'File was not uploaded.\nGive it another try.' },
    });
    console.log('consumer uploaded', data);
  }, 2000);
};

describe('insert plugins test', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('mock upload insert', () => {
    before(function() {
      eyesOpen(this);
    });

    after(() => cy.eyesClose());

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty');
    });

    it('should insert divider plugin', function() {
      cy.loadRicosEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.DIVIDER)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should insert code block plugin', function() {
      cy.loadEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.CODE_BLOCK)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should insert map plugin', function() {
      cy.loadEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.MAP)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should insert file upload plugin', function() {
      cy.loadEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.FILE_UPLOAD)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should insert button plugin', function() {
      cy.loadEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.BUTTON)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should insert html plugin', function() {
      cy.loadEditorAndViewer()
        .insertPlugin(STATIC_TOOLBAR_BUTTONS.HTML)
        .wait(200);
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context.only('native file uploading', () => {
    before(function() {
      eyesOpen(this);
    });
    const testAppConfig = {
      ...usePluginsConfig({
        fileUpload: {
          handleFileSelection: () => false, 
          onFileSelected: (file, updateEntity) => {
            const name = file.name;
            const filenameParts = name.split('.');
            const type = filenameParts[filenameParts.length - 1];
            const data = {
              name,
              type,
              url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
            };
            setTimeout(() => updateEntity({ data }), 1000);
          },
        },
        image: {
          handleFileSelection: () => false, 
          // onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
        },
      }),
    };
    after(() => cy.eyesClose());
    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty', testAppConfig);
    });
    it('should upload an image', () => {
      cy.get(`[data-hook=${STATIC_TOOLBAR_BUTTONS.IMAGE}]:first`).then(el => {
        // return fetch('8bb438_1b73a6b067b24175bd087e86613bd00c.jpg')
        //   .then(res => res.blob())
        //   .then(blob => {
        //     el[0].files[0] = blob;
            el[0].dispatchEvent(new Event('change', { bubbles: true }));
          });
      });
    });
  });
});
