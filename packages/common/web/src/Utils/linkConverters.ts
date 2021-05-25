import { Link_Rel } from '../index';

const SPONSORED = 'sponsored';
const NO_FOLLOW = 'nofollow';
const UGC = 'ugc';
const TOP = '_top';
const BLANK = '_blank';

export const convertRelObjectToString = (relObject?: Link_Rel) => {
  if (!relObject) {
    return undefined;
  }
  const { nofollow, sponsored, ugc } = relObject;
  let relString = '';

  if (nofollow) {
    relString += `${NO_FOLLOW} `;
  }

  if (sponsored) {
    relString += `${SPONSORED} `;
  }

  if (ugc) {
    relString += `${UGC}`;
  }

  return relString.trim();
};

export const convertRelStringToObject = (rel?: string) => {
  const relObject: Link_Rel = {};
  if (!rel) {
    return relObject;
  }

  if (rel.includes('nofollow')) {
    relObject.nofollow = true;
  }
  if (rel.includes('sponsored')) {
    relObject.sponsored = true;
  }
  if (rel.includes('ugc')) {
    relObject.ugc = true;
  }

  return relObject;
};

export const convertTargetStringToBoolean = (target?: string) => target === BLANK;

export const convertTargetBooleanToString = (targetBlank?: boolean, anchorTarget?: string) => {
  if (targetBlank) {
    return BLANK;
  } else {
    return anchorTarget === BLANK ? TOP : anchorTarget;
  }
};
