export const getSortedSections = sectionsArr => {
  const sortedSections = [
    'BlockToolbar_Section_NoSections_ShortcutToolbar',
    'BlockToolbar_Section_Basic',
    'BlockToolbar_Section_Advanced',
    'BlockToolbar_Section_Embed_Wix',
    'BlockToolbar_Section_Embed_Anywhere',
  ];
  return sortedSections
    .map(section => (sectionsArr.includes(section) ? section : false))
    .filter(section => section);
};

export const getPluginMenuTheme = (theme = {}, isMobile) => {
  const {
    buttonStyles,
    mobileAddModalToolbarButton_wrapper,
    mobileAddModalToolbarButton,
    mobileAddModalToolbarButton_icon,
    mobileAddModalToolbarButton_label,
    ...rest
  } = theme;
  return {
    buttonStyles: {
      button: isMobile ? mobileAddModalToolbarButton : buttonStyles.sideToolbarButton,
      buttonWrapper: isMobile
        ? mobileAddModalToolbarButton_wrapper
        : buttonStyles.sideToolbarButton_wrapper,
      icon: isMobile ? mobileAddModalToolbarButton_icon : buttonStyles.sideToolbarButton_icon,
      label: isMobile ? mobileAddModalToolbarButton_label : buttonStyles.sideToolbarButton_label,
    },
    ...rest,
  };
};
