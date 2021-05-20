type Link_Rel = {
  nofollow?: boolean;
  sponsored?: boolean;
  ugc?: boolean;
};

const SPONSORED = 'sponsored';
const NO_FOLLOW = 'nofollow';
const UGC = 'ugc';

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
