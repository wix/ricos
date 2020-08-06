import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../../statics/styles/plain-text.scss';
// For now

class PlainText extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  handleFocus = () => {
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  componentDidMount() {
    if (this.props.shouldForceFocus) {
      this.handleFocus();
      this.ref.current.focus();
      this.props.resetForcedFocus();
    }
  }

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = (onChange, id, isTitle) => e => {
    onChange?.(id, e.target.value, isTitle);
  };

  className = classnames(styles.plainText, this.props.className);

  render() {
    const { isTitle, onChange, id } = this.props;

    return (
      <input
        className={this.className}
        value={this.props.value}
        onChange={this.onChange(onChange, id, isTitle)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        placeholder={this.props.placeholder}
        ref={this.ref}
      />
    );
  }
}

PlainText.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  id: PropTypes.string,
  isTitle: PropTypes.bool,
  shouldForceFocus: PropTypes.bool,
  resetForcedFocus: PropTypes.func,
  placeholder: PropTypes.string,
};

PlainText.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};

export default PlainText;
