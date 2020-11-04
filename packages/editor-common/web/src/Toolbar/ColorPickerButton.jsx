/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styles from './ColorPickerButton.scss';
import FormattingDropdownButton from './FormattingDropdownButton';
import { ColorPicker } from 'wix-rich-content-plugin-commons';

class ColorPickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentColor: props.getCurrentColor(),
      userColors: props?.getUserColors?.() || [],
    };
  }
  componentWillReceiveProps = nextProps => {
    const currentColor = this.state.currentColor;
    const nextCurrentColor = nextProps.getCurrentColor();
    if (nextCurrentColor !== currentColor) {
      this.setState({ currentColor: nextCurrentColor });
    }
  };
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  onColorAdded = color => {
    this.props.onColorAdded(color);
    const userColors = this.props?.getUserColors?.() || [...this.state.userColors, color];
    this.setState({ userColors });
  };
  onChange = color => {
    this.props.onChange(color);
    this.setState({ currentColor: color });
    this.closeModal();
  };
  onResetColor = () => {
    const defaultColors = this.props.getDefaultColors?.();
    this.onChange(defaultColors);
  };

  extractPalette = colorScheme => {
    if (!colorScheme) {
      return this.props.defaultPalette;
    }
    return Object.values(colorScheme)
      .sort((entry1, entry2) => (entry1.index > entry2.index ? 1 : -1))
      .map(entry => entry.color);
  };

  render() {
    const { settings, t, isMobile, dropDownProps } = this.props;
    const { currentColor, userColors } = this.state;
    const { isModalOpen } = this.state;
    const { colorScheme } = settings;
    const palette = this.extractPalette(colorScheme);
    return (
      <ClickOutside onClickOutside={this.closeModal}>
        <FormattingDropdownButton {...dropDownProps} onClick={this.toggleModal} />
        {isModalOpen && (
          <div className={classNames(styles.moreMenu, styles.colorPickerWrapper)}>
            <ColorPicker
              color={currentColor}
              palette={palette.slice(0, 6)}
              userColors={userColors.slice(0, 12)}
              onColorAdded={this.onColorAdded}
              theme={this.styles}
              isMobile={isMobile}
              onChange={this.onChange}
              t={t}
              onResetColor={this.onResetColor}
            >
              {({
                renderPalette,
                renderUserColors,
                renderAddColorButton,
                renderResetColorButton,
                mergedStyles,
              }) => (
                <div className={mergedStyles.colorPicker_palette}>
                  <div className={mergedStyles.colorPicker_buttons_container}>
                    {renderPalette()}
                    {renderUserColors()}
                  </div>
                  <hr className={mergedStyles.colorPicker_separator} />
                  <div className={mergedStyles.colorPicker_buttons_container}>
                    {renderResetColorButton()}
                    {renderAddColorButton()}
                  </div>
                </div>
              )}
            </ColorPicker>
          </div>
        )}
      </ClickOutside>
    );
  }
}

ColorPickerButton.propTypes = {
  getCurrentColor: PropTypes.string,
  onColorAdded: PropTypes.func,
  onChange: PropTypes.func,
  settings: PropTypes.object,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  defaultPalette: PropTypes.array,
  getUserColors: PropTypes.func,
  getDefaultColors: PropTypes.func,
  dropDownProps: PropTypes.Object,
};

export default ColorPickerButton;
