import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '../../../../statics/styles/static-toolbar.scss';

const ArrowButton = ({ scrollToolbar, theme, showLeftArrow }) => {
  const { toolbarStyles } = theme || {};
  const arrowClassNames = classNames(
    Styles.staticToolbar_responsiveArrow,
    toolbarStyles.responsiveArrow
  );
  const leftArrowIconClassNames = classNames(
    Styles.staticToolbar_responsiveArrowStart_icon,
    toolbarStyles.responsiveArrowStart_icon
  );
  const rightArrowIconClassNames = classNames(
    Styles.staticToolbar_responsiveArrowEnd_icon,
    toolbarStyles.responsiveArrowEnd_icon
  );
  return (
    <button
      className={arrowClassNames}
      data-hook="toolbarArrow"
      onMouseDown={e => scrollToolbar(e)}
    >
      <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
    </button>
  );
};

ArrowButton.propTypes = {
  scrollToolbar: PropTypes.func.isRequired,
  showLeftArrow: PropTypes.bool.isRequired,
  theme: PropTypes.object,
};

export default ArrowButton;
