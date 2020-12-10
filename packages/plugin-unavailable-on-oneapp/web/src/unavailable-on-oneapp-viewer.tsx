import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, ComponentData } from 'wix-rich-content-common';
import styles from '../statics/styles/unavailable-on-oneapp.scss';
import CircleInfoIcon from './icons/CircleInfoIcon';
import { UnavailableOnOneAppPluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: UnavailableOnOneAppPluginViewerConfig;
  theme: RichContentTheme;
}

const AlertMessage = ({ pluginName }) => {
  return (
    <div className={styles.unaOnOneApp_alert}>
      <CircleInfoIcon />
      <p>{pluginName} can be edited only on the web</p>
    </div>
  );
};

class UnavailableOnOneAppViewer extends Component<Props> {
  styles: Record<string, string>;

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return (
      <div className={styles.unaOnOneApp_container}>
        <AlertMessage pluginName="Image spoiler" />
        <AlertMessage pluginName="Table" />
      </div>
    );
  }
}

export default UnavailableOnOneAppViewer;
