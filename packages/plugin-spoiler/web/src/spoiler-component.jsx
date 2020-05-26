import React from 'react';
import PropTypes from 'prop-types';
// import SpoilerViewer from './spoiler-viewer';
// import { SPOILER_TYPE } from './types';
import { mergeStyles } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';
import styles from '../statics/styles/spoiler.scss';

export default class SpoilerComponent extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = { styles: mergeStyles({ styles, theme }) };
  }

  render() {
    const { children } = this.props;
    const { styles } = this.state;

    return <div className={styles.spoiler_inEditor}>{children}</div>;
  }
  // static type = { SPOILER_TYPE };
  // render() {
  //   const { componentData, settings } = this.props;
  //   return <SpoilerViewer componentData={componentData} settings={settings} />;
  // }
}

SpoilerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

// export { SpoilerComponent, DEFAULTS };
