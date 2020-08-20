export default () => {
  try {
    document
      .getElementsByClassName('public-DraftEditor-content')[0]
      .classList.add('has-custom-focus');
  } catch (e) {}
};
