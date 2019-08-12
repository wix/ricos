import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FocusManager, EditorModals, getModalStyles } from 'wix-rich-content-common';
import { PlusIcon, PlusActiveIcon } from '../../Icons';
import Styles from '../../../../statics/styles/side-toolbar.scss';

export default class AddPluginFloatingToolbar extends Component {
  state = {
    isActive: false,
    tabIndex: -1,
    style: {
      transform: 'translate(-50%) scale(0)',
    },
  };

  id = 'side_bar';

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
    this.setState({
      style: {
        left: this.getPopupOffset(),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
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
      if (this.popup) {
        this.popupOffset = this.popup.offsetWidth / 2 + 30;
      }
    }
    return this.popupOffset;
  };

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
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
    return (
      <FocusManager
        role="toolbar"
        active={this.state.isActive}
        aria-orientation="horizontal"
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: true,
          initialFocus: this.getFirstFocusableChildSelector(this.id),
        }}
        className={floatingContainerClassNames}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <button
          aria-label={'Plugin Toolbar'}
          aria-pressed={this.state.isActive}
          tabIndex="0"
          className={floatingIconClassNames}
          data-hook="addPluginFloatingToolbar"
          onClick={this.onClick}
          ref={el => (this.selectButton = el)}
        >
          {!this.state.isActive ? <PlusIcon /> : <PlusActiveIcon />}
        </button>
        <div
          id={this.id}
          className={popoupClassNames}
          style={this.state.style}
          ref={el => (this.popup = el)}
        >
          {this.props.structure.map((Component, index) => (
            <Component
              tabIndex={this.state.tabIndex}
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme}
              hidePopup={this.hidePopup}
            />
          ))}
        </div>
      </FocusManager>
    );
  }

  getFirstFocusableChildSelector(id) {
    return `#${id} *[tabindex="0"]`;
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
