export const BLOCK_TYPES_MAP = Object.freeze({
  unstyled: 'unstyled',
  // paragraph: 'paragraph',
  headerOne: 'header-one',
  headerTwo: 'header-two',
  headerThree: 'header-three',
  headerFour: 'header-four',
  headerFive: 'header-five',
  headerSix: 'header-six',
  unorderedListItem: 'unordered-list-item',
  orderedListItem: 'ordered-list-item',
  blockquote: 'blockquote',
  codeeBlock: 'code-block',
  atomic: 'atomic',
});

export const HEADER_LEVELS = Object.freeze({
  'header-one': 1,
  'header-two': 2,
  'header-three': 3,
  'header-four': 4,
  'header-five': 5,
  'header-six': 6,
});

export const FROM_DRAFT_LIST_TYPES = Object.freeze({
  'unordered-list-item': 'bullet_list',
  'ordered-list-item': 'unordered_list',
});
