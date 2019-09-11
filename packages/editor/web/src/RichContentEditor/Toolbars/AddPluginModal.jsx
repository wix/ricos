import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '../../../statics/styles/add-plugin-modal.scss';

const getPlaceHolderCount = buttonCount => {
  const diff = buttonCount % 3;
  if (diff > 0) {
    return 3 - diff;
  } else {
    return diff;
  }
};

export default class AddPluginModal extends Component {
  hidePopup = () => this.props.hidePopup();

  render() {
    const { getEditorState, setEditorState, structure, theme } = this.props;
    const tileClassNames = classNames(
      Styles.addPluginModal_tile,
      theme && theme.addPluginModal_tile
    );
    const placeHolderCount = getPlaceHolderCount(structure.length);
    /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <ul
        role="toolbar"
        aria-label="Add Plugin"
        className={classNames(Styles.addPluginModal_list, theme && theme.addPluginModal_list)}
      >
        {structure.map(({ component: Component }, index) => (
          <li key={index} className={tileClassNames}>
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              hidePopup={this.hidePopup}
              theme={theme}
              showName
              isMobile
            />
          </li>
        ))}
        {Array(placeHolderCount)
          .fill()
          .map((_, i) => (
            <li key={`empty-placeholder-${i}`} className={tileClassNames} />
          ))}
      </ul>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}

AddPluginModal.propTypes = {
  pubsub: PropTypes.object.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
