import linkifyIt from 'linkify-it';
const linkify = linkifyIt();

export const isValidUrl = url => linkify.test(url) && url[0] !== '#';

export const getUrlMatches = text => linkify.match(text) || [];

export const normalizeUrl = url => (linkify.match(url) || [{}])[0].url;

export const startsWithHttps = url => /^https:/.test(url);

export const hasProtocol = url => /^[a-z]+:/i.test(url);
