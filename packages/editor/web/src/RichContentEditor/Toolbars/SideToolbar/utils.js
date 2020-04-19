export const getSortedSections = sectionsArr => {
  const sortedSections = ['Basic', 'Embed from Wix', 'Embed from Socials', 'Tools'];
  return sortedSections
    .map(section => (sectionsArr.includes(section) ? section : false))
    .filter(section => section);
};
