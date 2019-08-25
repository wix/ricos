import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/emoji-group.scss';
import 'draft-js-emoji-plugin/lib/plugin.css';

class EmojiGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    return (
      <div>
        <div>group</div>
      </div>
    );
  }
}

EmojiGroup.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
};

export default EmojiGroup;
