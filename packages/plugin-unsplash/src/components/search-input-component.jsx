import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { mergeStyles, TextInput } from 'wix-rich-content-common';
import { SearchIcon } from '../icons/';
import styles from '../../statics/styles/search-input-component.scss';

class SearchInputComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onTextChanged = e => {
    this.props.onTextChanged(e.target.value);
  };

  render() {
    return (
      <div className={this.styles.search_container}>
        <SearchIcon className={this.styles.search_icon} />
        <TextInput
          placeholder={'Search Unsplash ...'}
          onChange={this.onTextChanged.bind(this)}
          theme={this.styles}
        />
      </div>
    );
  }
}

SearchInputComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  onTextChanged: PropTypes.func,
};

export default SearchInputComponent;
