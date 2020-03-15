import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import TextSearchInput from '../../TextSearchInput';
import SideToolbarPluginsSection from './SideToolbarPluginsSection';
import classNames from 'classnames';

export default class SideToolbarPanelContent extends Component {
  render() {
    const {
      theme,
      getEditorState,
      setEditorState,
      structure,
      hidePopup,
      t,
      showSearch,
    } = this.props;
    const setSearchTag = searchTag => this.setState({ searchTag });

    return (
      <div
        className={classNames(
          Styles.sideToolbarPanelWrapper,
          showSearch && Styles.sideToolbarPanelWithSearch
        )}
      >
        {showSearch && (
          <div className={Styles.searchWrapper}>
            <TextSearchInput
              onClose={hidePopup}
              placeHolder={'Search for a block'}
              theme={theme}
              setSearchTag={setSearchTag}
            />
          </div>
        )}
        <SideToolbarPluginsSection
          theme={theme}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          structure={structure}
          searchTag={this.state?.searchTag}
          t={t}
          hidePopup={hidePopup}
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
  showSearch: PropTypes.bool,
};
