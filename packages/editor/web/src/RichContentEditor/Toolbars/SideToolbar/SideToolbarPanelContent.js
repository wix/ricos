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
      options = {},
      isMobile,
    } = this.props;
    const setSearchTag = searchTag => this.setState({ searchTag });
    const { showSearch = structure.length > 8, splitToSections } = options;
    return (
      <div
        className={classNames(Styles.sideToolbarPanelWrapper, {
          [Styles.panelWithSearch]: showSearch,
        })}
      >
        {showSearch && !isMobile && (
          <div className={Styles.searchWrapper}>
            <TextSearchInput
              onClose={hidePopup}
              placeHolder={'Search for a block'}
              theme={theme}
              setSearchTag={setSearchTag}
            />
          </div>
        )}

        <div
          className={classNames(Styles.pluginsWrapper, {
            [Styles.withSearch]: showSearch && !isMobile,
          })}
        >
          <SideToolbarPluginsSection
            theme={theme}
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            structure={structure}
            searchTag={this.state?.searchTag}
            t={t}
            hidePopup={hidePopup}
            splitToSections={!this.state?.searchTag && splitToSections}
          />
        </div>
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
  options: PropTypes.object,
  isMobile: PropTypes.bool,
};
