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
    const { addPluginMenuConfig, isMobile } = props;
    this.showSearch = addPluginMenuConfig?.showSearch && !isMobile;
    this.horizontalMenu = !addPluginMenuConfig && !isMobile;
    this.wrapperClassName = classNames(Styles.sideToolbarPanelWrapper, {
      [Styles.horizontalMenu]: this.horizontalMenu,
    });
    this.pluginsClassName = classNames(
      Styles.pluginsWrapper,
      this.horizontalMenu && Styles.horizontalMenu,
      this.showSearch && Styles.withSearch
    );
  }
  onChange = value => this.setState({ value }, () => this.container?.scrollTo(0, 0));
  render() {
    const {
      getEditorState,
      setEditorState,
      structure,
      hidePopup,
      t,
      addPluginMenuConfig,
      isActive,
      theme,
      sideToolbarButtonRef,
    } = this.props;
    const { showSearch, wrapperClassName, pluginsClassName, horizontalMenu } = this;
    const { value } = this.state;
    return (
      <div
        className={wrapperClassName}
        data-hook="addPluginMenu"
        ref={ref => (this.container = ref)}
        style={{ height: this.container?.offsetHeight }}
      >
        {showSearch && isActive && (
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
            splitToSections={!value && addPluginMenuConfig?.splitToSections}
            horizontalMenu={horizontalMenu}
            theme={theme}
            sideToolbarButtonRef={sideToolbarButtonRef}
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
  isMobile: PropTypes.bool,
  addPluginMenuConfig: PropTypes.object,
  isActive: PropTypes.bool,
  theme: PropTypes.object,
  sideToolbarButtonRef: PropTypes.any,
};
