import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/emoji-groups.scss';
import 'draft-js-emoji-plugin/lib/plugin.css';

class EmojiGroups extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { groups } = this.props;
    return (
      <div>
        <div>group</div>
      </div>
    );
  }
}

EmojiGroups.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  groups: PropTypes.array,
};

export default EmojiGroups;
