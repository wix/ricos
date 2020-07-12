import React, { Component } from 'react';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentViewer from './RichContentViewer';

const WrappedViewer = withI18n(RichContentViewer, englishResources);

export default class I18nRichContentViewer extends Component {
  render() {
    return <WrappedViewer {...this.props} />;
  }
}

I18nRichContentViewer.displayName = 'RichContentViewer';
