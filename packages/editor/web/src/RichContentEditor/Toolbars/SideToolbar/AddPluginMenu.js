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
      value: '',
    };
    const { structure, showSearch = structure.length > 8, isMobile } = props;
    this.showSearch = showSearch && !isMobile;
    this.wrapperClassName = classNames(Styles.sideToolbarPanelWrapper, {
      [Styles.panelWithSearch]: this.showSearch,
    });
    this.pluginsClassName = classNames(Styles.pluginsWrapper, {
      [Styles.withSearch]: showSearch && !isMobile,
    });
  }
  onChange = value => this.setState({ value });
  render() {
    const {
      theme,
      getEditorState,
      setEditorState,
      structure,
      hidePopup,
      t,
      splitToSections,
    } = this.props;
    const { showSearch, wrapperClassName, pluginsClassName } = this;
    const { value } = this.state;
    return (
      <div className={wrapperClassName}>
        {showSearch && (
          <div className={Styles.searchWrapper}>
            <TextSearchInput
              onClose={hidePopup}
              placeHolder={t('BlockToolbar_Search_Placeholder')}
              theme={theme}
              onChange={this.onChange}
              value={value}
            />
          </div>
        )}

        <div className={pluginsClassName}>
          <SideToolbarPluginsSection
            theme={theme}
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            structure={structure}
            searchTag={value}
            t={t}
            hidePopup={hidePopup}
            splitToSections={!value && splitToSections}
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
  splitToSections: PropTypes.bool,
  isMobile: PropTypes.bool,
  showSearch: PropTypes.bool,
};
