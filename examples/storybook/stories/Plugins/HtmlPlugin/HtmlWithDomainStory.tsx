import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { RichContentEditor } from 'ricos/editor';
import { pluginHtml, htmlButtonsTypes } from 'ricos/html/editor';
import { pluginLinkPreview } from 'ricos/link-preview/editor';

const HtmlWithDomainStory: FunctionComponent<{ content?: RicosContent }> = ({ content }) => {
  const { html, adsense } = htmlButtonsTypes;
  return (
    <RicosEditor
      plugins={[
        pluginHtml({ exposeButtons: [html, adsense], siteDomain: 'https://www.wix.com' }),
        pluginLinkPreview(),
      ]}
      content={content}
    >
      <RichContentEditor iframeSandboxDomain="https://richcontent-sttorybook.filesusr.com" />
    </RicosEditor>
  );
};

export default HtmlWithDomainStory;
