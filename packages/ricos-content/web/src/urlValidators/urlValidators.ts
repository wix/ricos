import linkifyIt from 'linkify-it';

const UrlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
); // fragment locator

export const isValidExactUrl = (str: string) => !!UrlPattern.test(str);

export const isValidUrl = (url: string) => url[0] !== '#';

export const getUrlMatches = (text: string) => linkifyIt().match(text) || [];

export const normalizeUrl = (url: string) => (linkifyIt().match(url) || [{}])[0].url;

export const startsWithHttps = (url: string) => /^https:/.test(url);

export const hasProtocol = (url: string) => /^[a-z]+:/i.test(url);
