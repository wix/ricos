import linkifyIt from 'linkify-it';
const linkify = linkifyIt();

const UrlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
); // fragment locator

export const isValidExactUrl = str => !!UrlPattern.test(str);

export const isValidUrl = url => url[0] !== '#' && linkify.test(url);

export const getUrlMatches = text => linkify.match(text) || [];

export const normalizeUrl = url => (linkify.match(url) || [{}])[0].url;

export const startsWithHttps = url => /^https:/.test(url);

export const hasProtocol = url => /^[a-z]+:/i.test(url);
