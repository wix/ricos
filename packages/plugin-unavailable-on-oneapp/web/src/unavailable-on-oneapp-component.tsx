import React from 'react';
import UnavailableOnOneAppViewer from './unavailable-on-oneapp-viewer';
import { UNAVAILABLE_ON_ONEAPP_TYPE, UnavailableOnOneAppPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ComponentData, RichContentTheme } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: UnavailableOnOneAppPluginEditorConfig;
  theme: RichContentTheme;
}

class UnavailableOnOneAppComponent extends React.Component<Props> {
  static type = { UNAVAILABLE_ON_ONEAPP_TYPE };
  render() {
    const { componentData, settings, theme } = this.props;
    return (
      <UnavailableOnOneAppViewer componentData={componentData} settings={settings} theme={theme} />
    );
  }
}

export { UnavailableOnOneAppComponent as Component, DEFAULTS };
