// eslint-disable-next-line prettier/prettier
export const fixtures = [
  'headers',
  'images',
  'inline-styles',
  'lists',
  'nested-lists',
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
    },
  },
  'old-image-format',
  'hashtag-and-link',
  'images-sizes',
  'images-original-size',
  {
    fixture: 'link-preview',
    plugins: 'all',
  },
];

export const fixturesToTestOnSeo = ['images'];

export const DEFAULT_DESKTOP_BROWSERS = [
  { width: 1440, height: 900, name: 'chrome' },
  { width: 1440, height: 900, name: 'firefox' },
];

export const apps = [
  { name: 'rce', func: 'loadEditorAndViewer' },
  { name: 'wrapper', func: 'loadWrapperEditorAndViewer' },
];

export const DEFAULT_MOBILE_BROWSERS = [{ deviceName: 'iPhone X' }, { deviceName: 'iPad' }];
