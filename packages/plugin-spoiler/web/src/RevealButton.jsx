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
      isMobile,
      className,
      onRevealSpoiler,
      setInPluginEditingMode,
      setFocusToBlock,
      value,
      onChange,
    } = this.props;
    const dataHook = 'revealSpoilerBtn';
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
        {onChange ? (
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
  onRevealSpoiler: PropTypes.func,
};
