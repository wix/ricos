import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Toolbar.scss';
import { TOOLBAR_BUTTON_TYPES } from './consts';
import GroupButton from './GroupButton';
import DropdownButton from './DropdownButton';
import ModalButton from './ModalButton';
import ColorPickerButton from './ColorPickerButton';
import NestedMenu from './NestedMenu';
import InlineToolbarButton from './InlineToolbarButton';
import ContextMenu from './ContextMenu';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    const buttonTheme = props.theme.buttonStyles || {};
    const buttonStyles = {
      inlineToolbarButton_wrapper: buttonTheme.textToolbarButton_wrapper,
      inlineToolbarButton: buttonTheme.textToolbarButton,
      inlineToolbarButton_icon: buttonTheme.textToolbarButton_icon,
    };
    this.theme = { ...props.theme, buttonStyles };
  }

  onMouseDown = event => {
    event.preventDefault();
  };

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    return (
      <InlineToolbarButton
        onClick={onClick}
        isActive={isActive()}
        theme={{}}
        dataHook={dataHook}
        isMobile={this.props.isMobile}
        tooltipText={tooltip}
        icon={getIcon()}
        disabled={isDisabled()}
      />
    );
  };

  renderSeparator = () => <div className={styles.separator} />;

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  renderDropDown = buttonProps => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...buttonProps,
    };
    return <DropdownButton {...dropDownProps} />;
  };

  renderButtonGroup = ({ buttonList, ...rest }) => {
    const { theme, isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme,
      ...rest,
    };
    return <GroupButton buttons={Object.values(buttonList)} {...dropDownProps} />;
  };

  renderColorPicker = buttonProps => {
    const { t, isMobile } = this.props;
    const {
      getCurrentColor,
      onColorAdded,
      onChange,
      settings,
      defaultPalette,
      getUserColors,
      getDefaultColors,
      ...rest
    } = buttonProps;
    return (
      <ColorPickerButton
        getCurrentColor={getCurrentColor}
        onColorAdded={onColorAdded}
        onChange={onChange}
        settings={settings}
        t={t}
        isMobile={isMobile}
        defaultPalette={defaultPalette}
        getUserColors={getUserColors}
        getDefaultColors={getDefaultColors}
        dropDownProps={rest}
      />
    );
  };

  renderTextButton = buttonProps => {
    const { onClick, dataHook, text } = buttonProps;
    return (
      <InlineToolbarButton
        onClick={onClick}
        theme={this.theme}
        dataHook={dataHook}
        isMobile={this.props.isMobile}
        buttonContent={text}
      />
    );
  };

  renderModal = buttonProps => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...buttonProps,
    };
    return (
      <ModalButton
        modal={buttonProps.modal}
        onSelect={buttonProps.onSelect}
        dropDownProps={dropDownProps}
      />
    );
  };

  renderComponent = buttonProps => {
    const { Component } = buttonProps;
    return <Component />;
  };

  renderNestedMenu = buttonProps => {
    const { isMobile, tabIndex, t } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      t,
      theme: this.theme,
      ...buttonProps,
    };
    return <NestedMenu dropDownProps={dropDownProps} />;
  };

  renderContextMenu = buttonProps => {
    const { isMobile, tabIndex, t } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      t,
      theme: this.theme,
      ...buttonProps,
    };
    return <ContextMenu {...dropDownProps} />;
  };

  buttonMap = {
    [TOOLBAR_BUTTON_TYPES.BUTTON]: this.renderButton,
    [TOOLBAR_BUTTON_TYPES.TOGGLE]: this.renderButton,
    [TOOLBAR_BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
    [TOOLBAR_BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
    [TOOLBAR_BUTTON_TYPES.GROUP]: this.renderButtonGroup,
    [TOOLBAR_BUTTON_TYPES.TEXT]: this.renderTextButton,
    [TOOLBAR_BUTTON_TYPES.COLOR_PICKER]: this.renderColorPicker,
    [TOOLBAR_BUTTON_TYPES.MODAL]: this.renderModal,
    [TOOLBAR_BUTTON_TYPES.COMPONENT]: this.renderComponent,
    [TOOLBAR_BUTTON_TYPES.CONTEXT_MENU]: this.renderContextMenu,
    [TOOLBAR_BUTTON_TYPES.NESTED_MENU]: this.renderNestedMenu,
  };

  separateByGaps = buttons => {
    const separatedButtons = [[]];
    buttons.forEach(button => {
      if (button.type !== TOOLBAR_BUTTON_TYPES.GAP) {
        separatedButtons[separatedButtons.length - 1].push(button);
      } else {
        separatedButtons.push([]);
      }
    });
    return separatedButtons;
  };

  render() {
    const { buttons, vertical } = this.props;
    const buttonsSeparatedByGaps = this.separateByGaps(buttons);
    return buttonsSeparatedByGaps.map((buttonsWithoutGaps, index) => {
      return (
        <div key={index} className={classNames(styles.toolbar, { [styles.vertical]: vertical })}>
          {buttonsWithoutGaps.map((buttonProps, i) => {
            const Button = this.buttonMap[buttonProps.type];
            return <Button {...buttonProps} key={i} />;
          })}
        </div>
      );
    });
  }
}

Toolbar.propTypes = {
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  buttons: PropTypes.array,
  vertical: PropTypes.bool,
};

export default Toolbar;
