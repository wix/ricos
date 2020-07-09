export const getSortedSections = sectionsArr => {
  const sortedSections = [
    'BlockToolbar_Section_NoSections_ShortcutToolbar',
    'BlockToolbar_Section_Basic',
    'BlockToolbar_Section_Embed_Wix',
    'BlockToolbar_Section_Embed_Anywhere',
    'BlockToolbar_Section_Tools',
  ];
  return sortedSections
    .map(section => (sectionsArr.includes(section) ? section : false))
    .filter(section => section);
};
