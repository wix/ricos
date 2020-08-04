import React from 'react';
import PropTypes from 'prop-types';

export default class RevealButton extends React.Component {
  handleFocus = e => {
    e.preventDefault();
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = e => {
    const oldValue = this.props.value;
    this.props.onChange?.(e.target.value);
    if (e.target.scrollWidth > 230 && oldValue.length < e.target.value.length) {
      this.props.onChange?.(oldValue);
    }
  };

  render() {
    const {
      EditableSpoilerDescription,
      isMobile,
      className,
      disabledRevealSpoilerBtn,
      onRevealSpoiler,
      value,
    } = this.props;
    const dataHook = !disabledRevealSpoilerBtn && 'revealSpoilerBtn';
    const style = {
      fontSize: isMobile ? '14px' : '16px',
    };

    return (
      <button style={style} className={className} onClick={onRevealSpoiler} data-hook={dataHook}>
        {EditableSpoilerDescription ? (
          <input
            data-hook={dataHook}
            value={value}
            onChange={this.onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            dir="auto"
            type="text"
            size={value.length + 1}
          />
        ) : (
          value
        )}
      </button>
    );
    // );
  }
}

RevealButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  EditableSpoilerDescription: PropTypes.bool,
  disabledRevealSpoilerBtn: PropTypes.bool,
  onRevealSpoiler: PropTypes.func,
};

RevealButton.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};
