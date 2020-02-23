import React from 'react';
export const DEFAULT_SETTINGS = {
  mentionPrefix: '@',
  mentionTrigger: '@',
  getMentionLink: () => '#',
  repositionSuggestions: true,
  entryHeight: 34,
  additionalHeight: 17,

  visibleItemsBeforeOverflow: 5,
  popoverComponent: <div />,
  handleDropdownOpen: () => true,
  onMentionClick: mention => mention,
  handleDropdownClose: () => true,
  getMentions: searchQuery =>
    new Promise(resolve =>
      setTimeout(
        () =>
          resolve([
            { name: searchQuery, slug: searchQuery },
            { name: 'Test One', slug: 'testone' },
            { name: 'Test One.1', slug: 'testone1' },
            { name: 'Test One.2', slug: 'testone2' },
            { name: 'Test One.3', slug: 'testone3' },
            { name: 'Test One.4', slug: 'testone4' },
            { name: 'Test One.5', slug: 'testone5' },
            { name: 'Test One.6', slug: 'testone6' },
            { name: 'Test One.7', slug: 'testone7' },
            { name: 'Test One.8', slug: 'testone8' },
            {
              name: 'Test Two',
              slug: 'testwo',
              avatar: 'https://via.placeholder.com/100x100?text=Image=50',
            },
          ]),
        250
      )
    ),
};

export const DEFAULTS = {
  config: { ...DEFAULT_SETTINGS },
};
