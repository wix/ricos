/* eslint-disable new-cap */
/*global cy*/
import {
  STATIC_TOOLBAR_BUTTONS_WITHOUT_EMBED,
  VIDEO_PLUGIN,
  SOUND_CLOUD,
  SOCIAL_EMBED,
  // GIPHY_PLUGIN,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';

const TOOLBARS = { FOOTER: 'footerToolbar', PLUGIN_MENU: 'addPluginFloatingToolbar' };

const PLUGIN_WITH_MODAL_COMMANDS_HANDLER = (INPUT_BUTTON, ADD_BUTTON, LINK) => {
  cy.get(`[data-hook=${INPUT_BUTTON}]`).type(LINK);
  cy.get(`[data-hook=${ADD_BUTTON}]`).click();
  cy.wait(3000); //DO NOT REMOVE - fix flakiness
};

const LINKS = {
  YOUTUBE: 'https://www.youtube.com/watch?v=whbidPR4nVA',
  SOUNDCLOUD: 'https://soundcloud.com/martingarrix/martin-garrix-animals-original',
};

const ADDITIONAL_COMMANDS = {
  VIDEO: () => {
    PLUGIN_WITH_MODAL_COMMANDS_HANDLER(VIDEO_PLUGIN.INPUT, VIDEO_PLUGIN.ADD, LINKS.YOUTUBE);
  },
  SOUND_CLOUD: () => {
    PLUGIN_WITH_MODAL_COMMANDS_HANDLER(SOUND_CLOUD.INPUT, SOUND_CLOUD.ADD, LINKS.SOUNDCLOUD);
  },
  YOUTUBE: () => {
    PLUGIN_WITH_MODAL_COMMANDS_HANDLER(SOCIAL_EMBED.INPUT, SOCIAL_EMBED.ADD, LINKS.YOUTUBE);
  },
  CODE_BLOCK: () => {
    cy.moveCursorToEnd(); //DO NOT REMOVE - fix flakiness
  },
  EMOJI: () => {
    cy.get(`[data-hook=emoji-5]:first`)
      .click()
      .enterParagraphs(['.']);
  },
  // GIPHY: () => {
  //   cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}]`);
  //   cy.get(`[role=button][tabindex=0]:first`).click();
  // },
  // ADSENSE: () => {},
};

const testInsertPlugin = toolbar => ([plugin, pluginButtonName]) => {
  return it(`should insert ${plugin?.toLocaleLowerCase()}`, function() {
    cy.loadRicosEditorAndViewer('empty');
    cy.wait(500);

    cy.focusEditor();
    cy.insertPlugin(toolbar, pluginButtonName);
    ADDITIONAL_COMMANDS[plugin]?.();

    cy.wait(1500);

    cy.eyesCheckWindow(this.test.title);
  });
};

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

describe('insert plugins tests', () => {
  context('plugin menu', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    afterEach(() => cy.matchContentSnapshot());

    after(() => cy.eyesClose());

    Object.entries(STATIC_TOOLBAR_BUTTONS_WITHOUT_EMBED).map(
      testInsertPlugin(TOOLBARS.PLUGIN_MENU)
    );
  });

  context('footer toolbar', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    afterEach(() => cy.matchContentSnapshot());

    after(() => cy.eyesClose());

    Object.entries(STATIC_TOOLBAR_BUTTONS_WITHOUT_EMBED).map(testInsertPlugin(TOOLBARS.FOOTER));
  });
});

//TODO: handle native upload

// context.only('native file uploading', () => {
//   before(function() {
//     eyesOpen(this);
//   });
//   const testAppConfig = {
//     ...usePluginsConfig({
//       fileUpload: {
//         handleFileSelection: () => false,
//         onFileSelected: (file, updateEntity) => {
//           const name = file.name;
//           const filenameParts = name.split('.');
//           const type = filenameParts[filenameParts.length - 1];
//           const data = {
//             name,
//             type,
//             url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
//           };
//           setTimeout(() => updateEntity({ data }), 1000);
//         },
//       },
//       image: {
//         handleFileSelection: () => false,
//         // onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
//       },
//     }),
//   };
//   after(() => cy.eyesClose());
//   beforeEach('load editor', () => {
//     cy.switchToDesktop();
//     cy.loadRicosEditorAndViewer('empty', testAppConfig);
//   });
//   it('should upload an image', () => {
//     cy.get(`[data-hook=${STATIC_TOOLBAR_BUTTONS.IMAGE}]:first`).then(el => {
//       // return fetch('8bb438_1b73a6b067b24175bd087e86613bd00c.jpg')
//       //   .then(res => res.blob())
//       //   .then(blob => {
//       //     el[0].files[0] = blob;
//           el[0].dispatchEvent(new Event('change', { bubbles: true }));
//         });
//     });
//   });
// });
// });
