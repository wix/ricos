import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import TextSearchInput from '../../TextSearchInput';
import SideToolbarPluginsSection from './SideToolbarPluginsSection';
import classNames from 'classnames';

export default class AddPluginMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTag: '',
    };
  }
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
    const { searchTag } = this.state;
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
              placeHolder={t('Side_toolbar_basic_search_placeholder')}
              theme={theme}
              setSearchTag={setSearchTag}
              searchTag={searchTag}
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
            searchTag={searchTag}
            t={t}
            hidePopup={hidePopup}
            splitToSections={!searchTag && !isMobile && splitToSections}
          />
        </div>
      </div>
    );
  }
}

AddPluginMenu.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  hidePopup: PropTypes.func,
  options: PropTypes.object,
  isMobile: PropTypes.bool,
};
