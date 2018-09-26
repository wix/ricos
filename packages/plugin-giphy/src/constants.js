export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const SEARCH_TYPE = 'gifs';
export const MODAL_TYPE = 'flyOutModal';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';
export const GIPHY_API_KEY = 'OMx58aq5CjUYnWmzLsYbz62iuHJ3kgWN';

const gphApiClient = require('giphy-js-sdk-core');
export const giphyApiClient = gphApiClient(GIPHY_API_KEY);

export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};
