import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/panelStyles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import { HEADER_TYPE_MAP } from 'wix-rich-content-editor-common';

const headingElement = (heading, isSelected, onClick, translateHeading) => {
  const content = translateHeading(heading);
  const type = HEADER_TYPE_MAP[heading];
  return (
    <button
      className={isSelected ? styles.headingsPanel_selectedHeading : ''}
      onClick={() => onClick(type, heading)}
    >
      {content}
    </button>
  );
};

class Panel extends Component {
  render() {
    const {
      customHeadingsOptions,
      selected,
      onSave,
      styles,
      translateHeading,
      isMobile,
    } = this.props;
    return (
      <div
        className={isMobile ? styles.headingsMobilePanel : styles.headingsPanel}
        data-hook="headingsDropdownPanel"
      >
        {customHeadingsOptions.map(heading => {
          return headingElement(heading, selected === heading, onSave, translateHeading);
        })}
      </div>
    );
  }
}

export default class HeadingsDropDownPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { heading: props.heading };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onSaveHeading = (type, headingName) => {
    return this.props.onSave(type, headingName);
  };

  render() {
    const { isMobile, translateHeading, customHeadingsOptions } = this.props;
    const { heading } = this.state;
    const { styles } = this;
    const selected = heading;

    return (
      <div
        className={classNames(styles.headingsPanelContainer, {
          [styles.headingsPanelContainer_mobile]: isMobile,
        })}
      >
        <Panel
          styles={styles}
          selected={selected}
          onSave={this.onSaveHeading}
          isMobile={isMobile}
          translateHeading={translateHeading}
          customHeadingsOptions={customHeadingsOptions}
        />
      </div>
    );
  }
}

HeadingsDropDownPanel.propTypes = {
  isMobile: PropTypes.bool,
  onSave: PropTypes.func,
  theme: PropTypes.object.isRequired,
  customSettings: PropTypes.object,
  heading: PropTypes.string,
  translateHeading: PropTypes.func,
  customHeadingsOptions: PropTypes.array,
};

HeadingsDropDownPanel.defaultProps = { heading: 'P' };

Panel.propTypes = {
  onSave: PropTypes.func,
  selected: PropTypes.any,
  styles: PropTypes.object,
  customHeadingsOptions: PropTypes.array,
  translateHeading: PropTypes.func,
  isMobile: PropTypes.bool,
};
