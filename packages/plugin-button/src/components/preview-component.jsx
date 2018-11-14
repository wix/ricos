import React, { PureComponent } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/preview-component.scss';
import ButtonComponent from './button-component';


class PreviewComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    return (
      <div className={styles.preview_container}>
        <div className={styles.header}>
          Preview
        </div>
        <div className={styles.button}>
          <ButtonComponent theme={this.props.theme} style={{ pointerEvents: 'none' }} {...this.props} />
        </div>
      </div>
    );
  }
}

export default PreviewComponent;
