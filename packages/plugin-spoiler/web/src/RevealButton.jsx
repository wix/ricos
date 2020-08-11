import React from 'react';
import PropTypes from 'prop-types';
import EditableTextWrapper from './EditableTextWrapper';

export default class RevealButton extends React.Component {
  onChange = e => {
    const oldValue = this.props.value;
    const newValue = e.target.value;
    if (e.target.scrollWidth < 229 || oldValue.length > newValue.length) {
      this.props.onChange(newValue);
    }
  };

  render() {
    const {
      className,
      onRevealSpoiler,
      setInPluginEditingMode,
      setFocusToBlock,
      value,
      onChange,
    } = this.props;
    const dataHook = 'revealSpoilerBtn';
    const InputComponent = (
      <input size={value.length + 1} data-hook={'revealSpoilerContent'} dir="auto" type="text" />
    );

    return (
      <button className={className} onClick={onRevealSpoiler} data-hook={dataHook}>
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
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  onRevealSpoiler: PropTypes.func,
};
