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
    const {
      structure,
      showSearch = structure.length > 8,
      isMobile,
      horizontalMenu = false,
    } = props;
    this.showSearch = showSearch && !isMobile && !horizontalMenu;
    this.wrapperClassName = classNames(Styles.sideToolbarPanelWrapper, {
      [Styles.panelWithSearch]: this.showSearch,
      [Styles.horizontalMenu]: horizontalMenu,
    });
    this.pluginsClassName = classNames(Styles.pluginsWrapper, {
      [Styles.withSearch]: this.showSearch && !isMobile,
    });
  }
  onChange = value => this.setState({ value }, () => this.container?.scrollTo(0, 0));
  render() {
    const {
      getEditorState,
      setEditorState,
      structure,
      hidePopup,
      t,
      splitToSections,
      horizontalMenu,
    } = this.props;
    const { showSearch, wrapperClassName, pluginsClassName } = this;
    const { value } = this.state;
    return (
      <div
        className={wrapperClassName}
        data-hook="addPluginMenu"
        ref={ref => (this.container = ref)}
      >
        {showSearch && (
          <div className={Styles.searchWrapper}>
            <TextSearchInput
              onClose={hidePopup}
              placeHolder={t('BlockToolbar_Search_Placeholder')}
              onChange={this.onChange}
              value={value}
            />
          </div>
        )}

        <div className={pluginsClassName}>
          <SideToolbarPluginsSection
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            structure={structure}
            searchTag={value}
            t={t}
            hidePopup={hidePopup}
            splitToSections={!value && !horizontalMenu && splitToSections}
            horizontalMenu={horizontalMenu}
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
  t: PropTypes.func,
  hidePopup: PropTypes.func,
  splitToSections: PropTypes.bool,
  isMobile: PropTypes.bool,
  showSearch: PropTypes.bool,
  horizontalMenu: PropTypes.bool,
};
