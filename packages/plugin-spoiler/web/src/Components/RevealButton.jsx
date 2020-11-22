import React from 'react';
import PropTypes from 'prop-types';
import EditableTextInput from './EditableTextInput';

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

    return (
      <button className={className} onClick={onRevealSpoiler} data-hook="revealSpoilerBtn">
        {onChange ? (
          <EditableTextInput
            onChange={this.onChange}
            value={value}
            setInPluginEditingMode={setInPluginEditingMode}
            setFocusToBlock={setFocusToBlock}
            size={value.length + 1}
            dataHook={'revealSpoilerContent'}
          />
        ) : (
          <span dir="auto">{value}</span>
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
