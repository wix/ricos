export const createFetchLinkPreviewData = authStr => {
  const state = {};
  const getAbsoluteUrl = url => (url.substring(0, 4) === 'http' ? url : 'http://' + url);

  const path = '/rich-content/oembed?url=';

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
