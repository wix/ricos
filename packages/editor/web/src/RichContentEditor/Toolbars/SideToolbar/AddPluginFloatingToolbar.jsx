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
import { PlusIcon, PlusActiveIcon } from '../../icon';
import Styles from '../../../../statics/styles/side-toolbar.scss';
import AddPluginMenu from './AddPluginMenu';
import PopupOffsetnHoc from './PopupOffsetnHoc';

export default class AddPluginFloatingToolbar extends Component {
  state = {
    isActive: false,
    tabIndex: -1,
    style: {
      transform: 'translate(-50%) scale(0)',
    },
  };

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    if (this.state.isActive) {
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
    if (this.state.isActive) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  };

  showPopup = () => {
    this.setState({
      style: {
        ...this.getPopupOffset(),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        width: this.popupRef.offsetWidth,
      },
      isActive: true,
      tabIndex: 0,
    });
  };

  hidePopup = () => {
    this.setState({
      style: {
        transform: 'translate(-50%) scale(0)',
      },
      isActive: false,
      tabIndex: -1,
    });
  };

  getPopupOffset = () => {
    if (!this.popupOffset) {
      if (this.popupRef) {
        this.popupOffset = {
          left: this.popupRef.offsetWidth / 2 + 30,
          right: -this.popupRef.offsetWidth / 2 + 30,
        };
      }
    }
    return this.popupOffset;
  };

  render() {
    const {
      theme,
      getEditorState,
      setEditorState,
      structure,
      t,
      addPluginMenuConfig,
      isMobile,
    } = this.props;
    const { isActive } = this.state;
    const { toolbarStyles } = theme || {};
    const floatingContainerClassNames = classNames(
      Styles.sideToolbar_floatingContainer,
      toolbarStyles && toolbarStyles.sideToolbar_floatingContainer
    );
    const floatingIconClassNames = classNames(
      Styles.sideToolbar_floatingIcon,
      toolbarStyles && toolbarStyles.sideToolbar_floatingIcon
    );
    const popoupClassNames = classNames(
      Styles.sideToolbar,
      toolbarStyles && toolbarStyles.sideToolbar
    );

    const SideToolbarPanel = ({ top }) => {
      const { isActive } = this.state;
      const horizontalMenuWidth = structure.length * 39;
      return (
        <div
          className={popoupClassNames}
          style={{
            ...this.state.style,
            top,
            width: addPluginMenuConfig ? 320 : horizontalMenuWidth,
          }}
          ref={el => (this.popupRef = el)}
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
            isActive={isActive}
            theme={theme}
            pluginMenuButtonRef={this.selectButton}
            toolbarName={TOOLBARS.SIDE}
          />
        </div>
      );
    };

    return (
      <FocusManager
        role="toolbar"
        active={isActive}
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
          aria-pressed={isActive}
          tabIndex="0"
          className={floatingIconClassNames}
          data-hook={'addPluginFloatingToolbar'}
          onClick={this.onClick}
          ref={el => (this.selectButton = el)}
        >
          {!isActive ? <PlusIcon /> : <PlusActiveIcon />}
        </button>
        {!isSSR() && (
          <PopupOffsetnHoc
            elementHeight={this.popupRef?.offsetHeight}
            elementMarginTop={addPluginMenuConfig ? -20 : -15}
            elementMarginBottom={45}
            targetElement={this.selectButton}
          >
            <SideToolbarPanel />
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
