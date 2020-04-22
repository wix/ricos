export const getSortedSections = sectionsArr => {
  const sortedSections = [
    'BlockToolbar_Section_Basic',
    'Side_toolbar_embed_from_wix_section',
    'Side_toolbar_embed_from_social_section',
  ];
  return sortedSections
    .map(section => (sectionsArr.includes(section) ? section : false))
    .filter(section => section);
};
