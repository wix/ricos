import React, { Component } from 'react';
import TextInput from './TextInput';
import PropTypes from 'prop-types';

export default class PluginSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTag: '',
    };
  }

  onChange = e => {
    this.setState({ searchTag: e.target.value });
    this.props.setSearchTag(e.target.value);
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.onClose();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };

  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { placeHolder, id, theme } = this.props;
    return (
      <TextInput
        inputRef={ref => {
          this.input = ref;
        }}
        onKeyPress={this.handleKeyPress}
        onChange={this.onChange}
        value={this.state.searchTag}
        placeholder={placeHolder}
        theme={theme}
        data-hook={id}
      />
    );
  }
}

PluginSearch.propTypes = {
  placeHolder: PropTypes.string,
  onClose: PropTypes.func,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  setSearchTag: PropTypes.func.isRequired,
};
