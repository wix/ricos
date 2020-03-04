import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { TextSearchInput } from 'wix-rich-content-editor-common';
import { getPluginsForTag } from '../../pluginsSearchTags';

export default class SideToolbarPanelContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllPlugins: true,
      pluginsForTag: [],
    };
  }
  render() {
    const { theme, getEditorState, setEditorState, structure, hidePopup, t } = this.props;
    const { showAllPlugins, pluginsForTag } = this.state;

    const setSearchTag = searchTag => {
      if (searchTag) {
        this.setState({ showAllPlugins: false, pluginsForTag: getPluginsForTag(searchTag, t) });
      } else {
        this.setState({ showAllPlugins: true });
      }
    };
    const plugins = showAllPlugins
      ? structure
      : structure.filter(({ name }) => pluginsForTag.includes(name));

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
        <div className={Styles.pluginsSection}>Basic</div>
        <div className={Styles.buttonsWrapper}>
          {plugins.map(({ component: Component, name }, index) => (
            <div key={index} className={Styles.buttonWrapper}>
              <Component
                getEditorState={getEditorState}
                setEditorState={setEditorState}
                theme={theme}
              />
              <div className={Styles.pluginName}>{name}</div>
            </div>
          ))}
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
};
