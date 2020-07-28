/*global cy*/
import {
  STATIC_TOOLBAR_BUTTONS_EMBED,
  STATIC_TOOLBAR_BUTTONS,
  VIDEO_PLUGIN,
  SOUND_CLOUD,
  // GIPHY_PLUGIN,
  SOCIAL_EMBED,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { usePlugins, plugins /*usePluginsConfig*/ } from '../cypress/testAppConfig';

const toolbars = ['footerToolbar', 'addPluginFloatingToolbar'];

const socialEmbedCommandsHandler = input => {
  cy.get(`[data-hook=${SOCIAL_EMBED.INPUT}]`).type(input);
  cy.get(`[data-hook=${SOCIAL_EMBED.ADD}]`).click();
};

const additionalCommands = {
  VIDEO: () => {
    cy.get(`[data-hook=${VIDEO_PLUGIN.INPUT}]`).type('https://www.youtube.com/watch?v=whbidPR4nVA');
    cy.get(`[data-hook=${VIDEO_PLUGIN.ADD}]`).click();
  },
  SOUND_CLOUD: () => {
    cy.get(`[data-hook=${SOUND_CLOUD.INPUT}]`).type(
      'https://soundcloud.com/martingarrix/martin-garrix-animals-original'
    );
    cy.get(`[data-hook=${SOUND_CLOUD.ADD}]`).click();
  },
  // GIPHY: () => {
  //   cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}]`);
  //   cy.get(`[role=button][tabindex=0]:first`).click();
  // },
  // ADSENSE: () => {},
  EMOJI: () => {
    cy.get(`[data-hook=emoji-5]:first`)
      .click()
      .enterParagraphs(['.']);
  },
  TWITTER: () => {
    socialEmbedCommandsHandler('https://twitter.com/MASHAVisrael/status/1287666913724837894?s=20');
  },
  // FACEBOOK: () => {},
  TIKTOK: () => {
    socialEmbedCommandsHandler(
      'https://www.tiktok.com/@ofirelkayam/video/6830127872892620037?lang=en'
    );
  },
  // PINTEREST: () => {},
  YOUTUBE: () => {
    socialEmbedCommandsHandler('https://www.youtube.com/watch?v=whbidPR4nVA');
  },
  INSTAGRAM: () => {
    socialEmbedCommandsHandler(
      'https://www.instagram.com/p/CDHNHITMIfL/?utm_source=ig_web_copy_link'
    );
  },
  // EVENT: () => {},
  // PRODUCT: () => {},
  // BOOKING: () => {},
  CODE_BLOCK: () => {
    cy.moveCursorToEnd();
  },
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
  afterEach(() => cy.matchContentSnapshot());

  before(function() {
    eyesOpen(this);
  });

  beforeEach('load editor', () => {
    cy.switchToDesktop();
  });

  after(() => cy.eyesClose());

  const testInsertPlugin = toolbar => ([plugin, pluginButtonName]) => {
    return it(`should insert ${plugin?.toLocaleLowerCase()} from ${toolbar}`, function() {
      const embedPlugins = STATIC_TOOLBAR_BUTTONS_EMBED[plugin] && usePlugins(plugins.embedsPreset);

      const testAppConfig = {
        ...embedPlugins,
        // ...usePluginsConfig({
        //   'wix-draft-plugin-html': {
        //     exposeButtons: ['html', 'adsense'],
        //   },
        // }),
      };

      cy.loadRicosEditorAndViewer('empty', testAppConfig);

      cy.wait(500);
      cy.focusEditor();
      cy.insertPlugin(toolbar, pluginButtonName);
      additionalCommands[plugin]?.();

      const time = STATIC_TOOLBAR_BUTTONS_EMBED[plugin] ? 3000 : 1500;
      cy.wait(time);
      cy.eyesCheckWindow(this.test.title);
    });
  };

  toolbars.map(toolbar => Object.entries(STATIC_TOOLBAR_BUTTONS).map(testInsertPlugin(toolbar)));
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
