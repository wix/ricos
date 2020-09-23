import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  FocusManager,
  EditorModals,
  getModalStyles,
  TOOLBARS,
} from 'wix-rich-content-editor-common';
import { isSSR } from 'wix-rich-content-common';
import { PlusIcon, PlusActiveIcon } from '../../Icons';
import Styles from '../../../../statics/styles/side-toolbar.scss';
import AddPluginMenu from './AddPluginMenu';
import PopupOffsetnHoc from './PopupOffsetnHoc';

export default class AddPluginFloatingToolbar extends Component {
  state = {
    isPopupOpen: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    if (this.state.isPopupOpen) {
      this.hidePopup();
    }
  };

  openAddPluginModal = () => {
    const {
      getEditorState,
      setEditorState,
      structure,
      pubsub,
      theme,
      helpers,
      t,
      isMobile,
      addPluginMenuConfig,
    } = this.props;
    helpers.openModal({
      modalName: EditorModals.MOBILE_ADD_PLUGIN,
      modalStyles: getModalStyles({ fullScreen: false, isMobile, stickyButtomMobile: true }),
      plugins: structure,
      theme,
      hidePopup: helpers.closeModal,
      getEditorState,
      setEditorState,
      pubsub,
      t,
      isMobile,
      addPluginMenuConfig,
    });
  };

  onClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const { isMobile } = this.props;
    if (!isMobile) {
      this.togglePopup();
    } else {
      this.openAddPluginModal();
    }
  };

  onKeyDown = event => {
    switch (event.key) {
      case 'Escape':
        this.hidePopup();
        break;
      default:
        break;
    }
  };

  togglePopup = () => {
    if (this.state.isPopupOpen) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  };

  showPopup = () => {
    this.setState({
      isPopupOpen: true,
    });
  };

  hidePopup = () => {
    this.setState({
      isPopupOpen: false,
    });
  };

  setPopupRef = el => {
    this.popupRef = el;
    this.forceUpdate();
  };

  getStyle(width, top) {
    return {
      left: width / 2 + 30,
      right: width / 2 + 30,
      width,
      top,
    };
  }

  SideToolbarPanel = ({ top }) => {
    const {
      theme,
      getEditorState,
      setEditorState,
      structure,
      t,
      addPluginMenuConfig,
      isMobile,
    } = this.props;
    const { toolbarStyles } = theme || {};
    const popoupClassNames = classNames(
      Styles.sideToolbar,
      toolbarStyles && toolbarStyles.sideToolbar
    );
    const { isPopupOpen } = this.state;
    const horizontalMenuWidth = structure.length * 39;
    const style = this.getStyle(addPluginMenuConfig ? 320 : horizontalMenuWidth, top);
    return (
      <div
        className={popoupClassNames}
        style={style}
        ref={this.setPopupRef}
        onClick={e => e.stopPropagation()}
        role="none"
        data-hook={'floatingAddPluginMenu'}
      >
        <AddPluginMenu
          t={t}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          plugins={structure}
          hidePopup={this.hidePopup}
          addPluginMenuConfig={addPluginMenuConfig}
          isMobile={isMobile}
          isActive={isPopupOpen}
          theme={theme}
          pluginMenuButtonRef={this.selectButton}
          toolbarName={TOOLBARS.SIDE}
        />
      </div>
    );
  };

  render() {
    const { theme, addPluginMenuConfig } = this.props;
    const { isPopupOpen } = this.state;
    const { toolbarStyles } = theme || {};
    const floatingContainerClassNames = classNames(
      Styles.sideToolbar_floatingContainer,
      toolbarStyles && toolbarStyles.sideToolbar_floatingContainer
    );
    const floatingIconClassNames = classNames(
      Styles.sideToolbar_floatingIcon,
      toolbarStyles && toolbarStyles.sideToolbar_floatingIcon
    );

    return (
      <FocusManager
        role="toolbar"
        active={isPopupOpen}
        aria-orientation="horizontal"
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: true,
        }}
        className={floatingContainerClassNames}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <button
          aria-label={'Plugin Toolbar'}
          aria-pressed={isPopupOpen}
          tabIndex="0"
          className={floatingIconClassNames}
          data-hook={'addPluginFloatingToolbar'}
          onClick={this.onClick}
          ref={el => (this.selectButton = el)}
        >
          {!isPopupOpen ? <PlusIcon /> : <PlusActiveIcon />}
        </button>
        {!isSSR() && isPopupOpen && (
          <PopupOffsetnHoc
            elementHeight={this.popupRef?.offsetHeight}
            elementMarginTop={addPluginMenuConfig ? -20 : -15}
            elementMarginBottom={45}
            targetElement={this.selectButton}
          >
            <this.SideToolbarPanel />
          </PopupOffsetnHoc>
        )}
      </FocusManager>
    );
  }
}

AddPluginFloatingToolbar.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  t: PropTypes.func,
  addPluginMenuConfig: PropTypes.object,
};
