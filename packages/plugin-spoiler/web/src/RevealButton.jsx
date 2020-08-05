import React from 'react';
import PropTypes from 'prop-types';
import EditableTextWrapper from './EditableTextWrapper';

export default class RevealButton extends React.Component {
  onChange = e => {
    const oldValue = this.props.value;
    this.props.onChange?.(e.target.value);
    if (e.target.scrollWidth > 228 && oldValue.length < e.target.value.length) {
      this.props.onChange?.(oldValue);
    }
  };

  render() {
    const {
      isEditableText,
      isMobile,
      className,
      disabledRevealSpoilerBtn,
      onRevealSpoiler,
      setInPluginEditingMode,
      setFocusToBlock,
      value,
    } = this.props;
    const dataHook = !disabledRevealSpoilerBtn && 'revealSpoilerBtn';
    const fontSize = isMobile ? '14px' : '16px';
    const InputComponent = (
      <input size={value.length + 1} data-hook={'revealSpoilerContent'} dir="auto" type="text" />
    );

    return (
      <button
        style={{ fontSize }}
        className={className}
        onClick={onRevealSpoiler}
        data-hook={dataHook}
      >
        {isEditableText ? (
          <EditableTextWrapper
            InputComponent={InputComponent}
            onChange={this.onChange}
            value={value}
            setInPluginEditingMode={setInPluginEditingMode}
            setFocusToBlock={setFocusToBlock}
          />
        ) : (
          value
        )}
      </button>
    );
  }
}

RevealButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  isEditableText: PropTypes.bool,
  disabledRevealSpoilerBtn: PropTypes.bool,
  onRevealSpoiler: PropTypes.func,
};

RevealButton.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};
