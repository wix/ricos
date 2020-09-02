import { usePlugins, plugins } from '../cypress/testAppConfig';

// eslint-disable-next-line prettier/prettier
export const fixtures = [
  'headers',
  'images',
  'inline-styles',
  'lists',
  'nested-lists',
  'aligment_with_punctuations',
  {
    fixture: 'accordion-rich-text',
    config: usePlugins(plugins.all),
  },
  'indent_blocks_lists_with_alignment',
  'quote',
  {
    fixture: 'facebook-video',
    additionalCommands: cy => {
      cy.waitForVideoToLoad();
    },
  },
  'gif',
  'giphy',
  {
    fixture: 'html',
    additionalCommands: cy => {
      cy.waitForHtmlToLoad();
    },
  },
  {
    fixture: 'gallery-layouts',
    additionalCommands: cy => {
      cy.scrollTo(0, 100);
      cy.waitForDocumentMutations();
      cy.scrollTo(0, 0);
      cy.wait(2000);
    },
  },
  'old-image-format',
  'hashtag-and-link',
  'images-sizes',
  'images-original-size',
  {
    fixture: 'link-preview-render',
    config: usePlugins(plugins.all),
  },
];

export const fixturesToTestOnSeo = ['images'];

export const DEFAULT_DESKTOP_BROWSERS = [{ width: 1440, height: 900, name: 'chrome' }];

export const DEFAULT_MOBILE_BROWSERS = [{ deviceName: 'iPhone X' }, { deviceName: 'iPad' }];
