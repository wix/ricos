export const linkPreviewUtil = authStr => {
  const state = {};
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
    try {
      return fetch(`${path}${getAbsoluteUrl(url)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authStr,
        },
      }).then(res => {
        return res.json();
      });
    } catch (e) {
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 1);
      });
    }
  };
};
