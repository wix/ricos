import linkifyIt from 'linkify-it';
const linkify = linkifyIt();

/* eslint-disable max-len, no-useless-escape */
const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})$/;
const facebookRegex = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:(?:channels|ondemand)\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
const soundCloudRegex = /soundcloud\.com\/\S+\/\S+$/;
/* eslint-enable max-len, no-useless-escape */

const isYoutube = url => youtubeRegex.test(url);
const isFacebook = url => facebookRegex.test(url);
const isVimeo = url => vimeoRegex.test(url);

export const isVideoUrl = url => [isYoutube, isFacebook, isVimeo].some(f => f(url));

export const isSoundCloudUrl = url => soundCloudRegex.test(url);
export const matchSoundCloudUrl = url => url.match(soundCloudRegex);

export const isValidUrl = url => linkify.test(url);

export const getUrlMatches = text => linkify.match(text) || [];

export const normalizeUrl = url => (linkify.match(url) || [{}])[0].url;

export const startsWithHttps = url => /^https:/.test(url);

export const hasProtocol = url => /^[a-z]+:/i.test(url);
