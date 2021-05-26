import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  FocusManager,
  EditorModals,
  getModalStyles,
  TOOLBARS,
  isElementOutOfWindow,
} from 'wix-rich-content-editor-common';
import { isSSR, Version } from 'wix-rich-content-common';
import { PlusIcon, PlusIconSmall } from '../../Icons';
import Styles from '../../../../statics/styles/side-toolbar.scss';
import AddPluginMenu from './AddPluginMenu';
import PopupOffsetnHoc from './PopupOffsetnHoc';

export default class AddPluginFloatingToolbar extends PureComponent {
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
    const { isMobile, onClick, helpers } = this.props;
    helpers.onMenuLoad?.({
      version: Version.currentVersion,
      entryPoint: 'SIDE',
      entryType: 'SIDE',
    });
    if (onClick) {
      onClick();
    } else if (!isMobile) {
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
    const { addPluginMenuConfig } = this.props;
    const smallPlusIcon = addPluginMenuConfig?.tablePluginMenu;
    if (smallPlusIcon && this.popupRef) {
      const isToolbarOverflow = isElementOutOfWindow(this.popupRef);
      const editorWidth = this.popupRef.closest('[data-id=rce]').getBoundingClientRect().width;
      return {
        left: isToolbarOverflow ? editorWidth - width / 2 + 25 : width / 2 + 22,
        right: isToolbarOverflow ? -(width / 2) + 15 : width / 2 + 22,
        width,
        top,
      };
    } else {
      return {
        left: width / 2 + 30,
        right: width / 2 + 30,
        width,
        top,
      };
    }
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
      helpers,
    } = this.props;
    const { toolbarStyles } = theme || {};
    const popoupClassNames = classNames(
      Styles.sideToolbar,
      toolbarStyles && toolbarStyles.sideToolbar
    );
    const { isPopupOpen } = this.state;
    const smallPlusIcon = addPluginMenuConfig?.tablePluginMenu;
    const horizontalMenuWidthOffset = smallPlusIcon ? 34 : 39;
    const horizontalMenuWidth = structure.length * horizontalMenuWidthOffset;
    const horizontalMenu = !addPluginMenuConfig || addPluginMenuConfig?.horizontalMenuLayout;
    const style = this.getStyle(horizontalMenu ? horizontalMenuWidth : 320, top);
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
          helpers={helpers}
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
    const smallPlusIcon = addPluginMenuConfig?.tablePluginMenu;
    const floatingIconClassNames = classNames(
      Styles.sideToolbar_floatingIcon,
      toolbarStyles && toolbarStyles.sideToolbar_floatingIcon,
      isPopupOpen && Styles.sideToolbar_popupOpen,
      smallPlusIcon && Styles.sideToolbar_smallPlusIcon
    );
    const Icon = smallPlusIcon ? PlusIconSmall : PlusIcon;

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
          className={classNames(floatingIconClassNames, 'has-custom-focus')}
          data-hook={'addPluginFloatingToolbar'}
          onClick={this.onClick}
          ref={el => (this.selectButton = el)}
        >
          <Icon className={Styles.plusIcon} />
        </button>
        {!isSSR() && isPopupOpen && (
          <PopupOffsetnHoc
            elementHeight={this.popupRef?.offsetHeight}
            elementMarginTop={smallPlusIcon ? -14 : addPluginMenuConfig ? -20 : -15}
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
  onClick: PropTypes.func,
};
