import React, { Component } from 'react';
import englishResources from 'wix-rich-content-common/dist/statics/viewer/locale/messages_en.json';
// import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';

import withI18n from './utils/withI18n';
import RichContentViewer, { RichContentViewerProps } from './RichContentViewer';

const WrappedViewer = withI18n<RichContentViewer, Partial<RichContentViewerProps>>(
  RichContentViewer,
  englishResources
);

export default class I18nRichContentViewer extends Component<Partial<RichContentViewerProps>> {
  static displayName = 'RichContentViewer';

  render() {
    return <WrappedViewer {...this.props} />;
  }
}
