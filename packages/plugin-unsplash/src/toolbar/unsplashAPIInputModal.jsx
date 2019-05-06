/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import SearchInputCompnent from '../components/search-input-component';
import ItemsList from '../components/items-list';
import styles from '../../statics/styles/unsplash-api-input-modal.scss';

class UnsplashApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTerm: '',
    };
  }

  onTextChanged = term => {
    setTimeout(() => {
      this.setState({ searchTerm: term });
    }, 1000);
  };

  render() {
    const { theme } = this.props;
    return (
      <div>
        <SearchInputCompnent onTextChanged={this.onTextChanged.bind(this)} theme={theme} />
        <ItemsList searchTerm={this.state.searchTerm} theme={theme} {...this.props} />
      </div>
    );
  }
}

UnsplashApiInputModal.propTypes = { theme: PropTypes.object };

export default UnsplashApiInputModal;
