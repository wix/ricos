export const SEARCH_TYPE = 'gifs';
export const GIPHY_API_KEY = 's8ipcyHs39n1tnQyOMLpG1P2qmyISFyS';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';
export const MODAL_TYPE = 'flyOutModal';
export const PAGE_SIZE = 25;

const gphApiClient = require('giphy-js-sdk-core');
export const giphyApiClient = gphApiClient(GIPHY_API_KEY);

export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};
