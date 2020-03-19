const axios = require('axios');

export const linkPreviewUtil = authStr => {
  const _axios = axios.create({ headers: { Authorization: authStr } });
  let state = {};
  const getAbsoluteUrl = url =>
    url.substring(0, 7) === 'http://' || url.substring(0, 8) === 'https://' ? url : 'http://' + url;

  const domainArray = window.location.href.split('/')[2].split('.');
  const isOnSurge = domainArray[1] === 'surge' && domainArray[2] === 'sh';
  const relativePath = '/rich-content/oembed?url=';
  const path = isOnSurge ? `https://www.wixsite.com${relativePath}` : relativePath;

  return async url => {
    const { title, url: oldUrl } = state;
    if (oldUrl === url && title) {
      return state;
    }
    let oEmbedRes;
    try {
      oEmbedRes = await _axios.get(`${path}${getAbsoluteUrl(url)}`).then(res => res.data);
      state = oEmbedRes;
    } catch (e) {
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 1);
      });
    }

    return oEmbedRes;
  };
};
