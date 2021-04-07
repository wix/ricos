import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHtml, htmlButtonsTypes } from 'wix-rich-content-plugin-html';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';

const HtmlWithDomainStory: FunctionComponent<{ content?: DraftContent }> = ({ content }) => {
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
