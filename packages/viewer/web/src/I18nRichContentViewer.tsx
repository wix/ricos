import React, { Component } from 'react';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentViewer, { RichContentViewerProps } from './RichContentViewer';

export default class I18nRichContentViewer extends Component<Partial<RichContentViewerProps>> {
  static displayName = 'RichContentViewer';
  WrappedViewer;
  constructor(props) {
    super(props);
    this.WrappedViewer = withI18n<RichContentViewer, Partial<RichContentViewerProps>>(
      RichContentViewer,
      englishResources
    );
  }
  render() {
    return <this.WrappedViewer {...this.props} />;
  }
}
