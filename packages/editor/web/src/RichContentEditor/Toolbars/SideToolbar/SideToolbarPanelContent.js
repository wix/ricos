import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { TextSearchInput } from 'wix-rich-content-editor-common';
import SideToolbarPluginsSection from './SideToolbarPluginsSection';

export default class SideToolbarPanelContent extends Component {
  render() {
    const { theme, getEditorState, setEditorState, structure, hidePopup, t } = this.props;
    const setSearchTag = searchTag => this.setState({ searchTag });

    return (
      <div className={Styles.sideToolbarPanelWrapper}>
        <div className={Styles.searchWrapper}>
          <TextSearchInput
            onClose={hidePopup}
            placeHolder={'Search for a block'}
            theme={theme}
            setSearchTag={setSearchTag}
          />
        </div>
        <SideToolbarPluginsSection
          theme={theme}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          structure={structure}
          searchTag={this.state?.searchTag}
          t={t}
        />
      </div>
    );
  }
}

SideToolbarPanelContent.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  hidePopup: PropTypes.func,
};
