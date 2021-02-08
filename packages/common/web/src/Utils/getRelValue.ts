const NO_OPENER = 'noopener';
const NO_REFERRER = 'noreferrer';
const SPONSORED = 'sponsored';

export const getRelValue = ({ relValue, rel, sponsored }) => {
  let relString = rel ? rel : relValue || '';

  if (!relString.includes(NO_OPENER)) {
    relString += ` ${NO_OPENER}`;
  }

  if (!relString.includes(NO_REFERRER)) {
    relString += ` ${NO_REFERRER}`;
  }

  if (sponsored && !relString.includes(SPONSORED)) {
    relString += ` ${SPONSORED}`;
  }

  return relString;
};
