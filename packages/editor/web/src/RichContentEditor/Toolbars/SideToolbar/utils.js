const SORTED_SECTIONS = ['Basic', 'Embed from Wix', 'Embed from Social', 'Tools'];

export const getSortedSections = sectionsArr => {
  return sectionsArr.sort(
    (section1, section2) => SORTED_SECTIONS.indexOf(section2) - SORTED_SECTIONS.indexOf(section1)
  );
};
