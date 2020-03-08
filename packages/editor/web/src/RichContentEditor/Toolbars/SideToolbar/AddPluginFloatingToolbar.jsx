import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FocusManager, EditorModals, getModalStyles } from 'wix-rich-content-editor-common';
import { PlusIcon, PlusActiveIcon } from '../../Icons';
import Styles from '../../../../statics/styles/side-toolbar.scss';
import SideToolbarPanelContent from './SideToolbarPanelContent';
import PopupOffsetnHoc from './PopupOffsetnHoc';
import { TEXT_SEARCH_INPUT_ID } from '../../consts';

export default class AddPluginFloatingToolbar extends Component {
  state = {
    isActive: false,
    tabIndex: -1,
    style: {
      transform: 'translate(-50%) scale(0)',
    },
  };

  id = 'side_bar';
  addButtonId = 'addPluginFloatingToolbar';

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
    } = this.props;
    helpers.openModal({
      modalName: EditorModals.MOBILE_ADD_PLUGIN,
      modalStyles: getModalStyles({ fullScreen: false, isMobile }),
      structure: structure.map(Button => ({ component: Button })),
      theme,
      hidePopup: helpers.closeModal,
      getEditorState,
      setEditorState,
      pubsub,
      t,
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
    this.setState(
      {
        style: {
          ...this.getPopupOffset(),
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
          width: this.popup.offsetWidth,
        },
        isActive: true,
        tabIndex: 0,
      },
      () => setTimeout(() => document.getElementById(TEXT_SEARCH_INPUT_ID).focus(), 100)
    );
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
      if (this.popup) {
        this.popupOffset = {
          left: this.popup.offsetWidth / 2 + 30,
          right: -this.popup.offsetWidth / 2 + 30,
        };
      }
    }
    return this.popupOffset;
  };

  render() {
    const { theme, getEditorState, setEditorState, structure, t } = this.props;
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
      return (
        <div
          id={this.id}
          className={popoupClassNames}
          style={{ ...this.state.style, top }}
          ref={el => (this.popup = el)}
          onClick={e => e.stopPropagation()}
          role="none"
        >
          <SideToolbarPanelContent
            t={t}
            theme={theme}
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            structure={structure}
            hidePopup={this.hidePopup}
          />
        </div>
      );
    };

    return (
      <FocusManager
        role="toolbar"
        active={this.state.isActive}
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
          aria-pressed={this.state.isActive}
          tabIndex="0"
          className={floatingIconClassNames}
          data-hook={this.addButtonId}
          onClick={this.onClick}
          ref={el => (this.selectButton = el)}
          id={this.addButtonId}
        >
          {!this.state.isActive ? <PlusIcon /> : <PlusActiveIcon />}
        </button>
        <PopupOffsetnHoc
          elementHeight={400}
          elementMarginTop={-20}
          elementMarginBottom={45}
          elementId={this.addButtonId}
        >
          <SideToolbarPanel />
        </PopupOffsetnHoc>
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
};
