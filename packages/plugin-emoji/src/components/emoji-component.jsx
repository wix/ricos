import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/emoji-component.scss';
import 'draft-js-emoji-plugin/lib/plugin.css';

class EmojiComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    return (
      <span
        className="emoji___dIvkU"
        title=":mount_fuji:"
        style={{
          backgroundImage: `url("//cdn.jsdelivr.net/emojione/assets/svg/1f5fb.svg?v=2.2.7")`,
        }}
      >
        <span data-offset-key="2n2oa-7-0">
          <span role="img" aria-label="emoji-img-label" data-text="true">
            🗻
          </span>
        </span>
      </span>
    );
  }
}

EmojiComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
};

export default EmojiComponent;
