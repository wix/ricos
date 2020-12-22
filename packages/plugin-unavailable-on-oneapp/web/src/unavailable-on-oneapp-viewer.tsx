import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, ComponentData } from 'wix-rich-content-common';
import styles from '../statics/styles/unavailable-on-oneapp.scss';
import CircleInfoIcon from './icons/CircleInfoIcon';
import { UnavailableOnOneAppPluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: UnavailableOnOneAppPluginViewerConfig;
  theme: RichContentTheme;
  unsupportedType: string;
}

class UnavailableOnOneAppViewer extends Component<Props> {
  styles: Record<string, string>;

  getPluginName = fullPluginName => {
    if (!fullPluginName.includes('-')) return fullPluginName;
    const unSupportedNames = fullPluginName.split('-');
    return unSupportedNames.slice(2, unSupportedNames.length).join('-');
  };

  render() {
    const { unsupportedType }: { unsupportedType: string | undefined } = this.props;
    const unSupportedPluginName = this.getPluginName(unsupportedType);

    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return (
      <div className={styles.unaOnOneApp_container}>
        <div className={styles.unaOnOneApp_alert}>
          <CircleInfoIcon />
          <p>{unSupportedPluginName} can be edited only on the web</p>
        </div>
      </div>
    );
  }
}

export default UnavailableOnOneAppViewer;
