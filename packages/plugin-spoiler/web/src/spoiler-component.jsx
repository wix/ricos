import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/spoiler.scss';
import SpoilerViewer from './spoiler-viewer';

export default class SpoilerComponent extends React.Component {
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = { styles: mergeStyles({ styles, theme }) };
  }

  render() {
    const { styles } = this.state;
    return <SpoilerViewer className={styles.spoilerEditor_hideText} disabled {...this.props} />;
  }
}
