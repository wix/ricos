import { Link_Rel } from 'ricos-schema';

const SPONSORED = 'sponsored';
const NO_FOLLOW = 'nofollow';
const UGC = 'ugc';

export const convertRelObjectToString = ({ nofollow, sponsored, ugc }: Link_Rel) => {
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

  return relString;
};

export const convertRelStringToObject = (rel: string) => {
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
