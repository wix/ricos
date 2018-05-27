import linkifyIt from 'linkify-it';
const linkify = linkifyIt();

/* eslint-disable max-len, no-useless-escape */
const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})$/;
const facebookRegex = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:(?:channels|ondemand)\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
/* eslint-enable max-len, no-useless-escape */

const isYoutube = url => youtubeRegex.test(url);
const isFacebook = url => facebookRegex.test(url);
const isVimeo = url => vimeoRegex.test(url);

export const isVideoUrl = url => [isYoutube, isFacebook, isVimeo].some(f => f(url));

export const isValidUrl = url => linkify.test(url);

export const normalizeURL = url => (linkify.match(url) || [{}])[0].url;

export const isHttpsUrl = url => /^https:/.test(url);
