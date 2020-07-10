import React, { Component, ComponentProps } from 'react';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentViewer from './RichContentViewer';

const WrappedViewer = withI18n<RichContentViewer, ComponentProps<typeof RichContentViewer>>(
  RichContentViewer,
  englishResources
);

export default class I18nRichContentViewer extends Component<
  ComponentProps<typeof RichContentViewer>
> {
  static displayName = 'RichContentViewer';

  render() {
    return <WrappedViewer {...this.props} />;
  }
}
