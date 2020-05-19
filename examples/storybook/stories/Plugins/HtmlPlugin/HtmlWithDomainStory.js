import React from 'react';
import PropTypes from 'prop-types';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHtml } from 'wix-rich-content-plugin-html';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview';

const HtmlWithDomainStory = ({ contentState }) => {
  return (
    <RicosEditor plugins={[pluginHtml(), pluginLinkPreview()]} contentState={contentState}>
      <RichContentEditor
        initialState={contentState}
        iframeSandboxDomain="https://richcontent-sttorybook.filesusr.com"
      />
    </RicosEditor>
  );
};

HtmlWithDomainStory.propTypes = {
  contentState: PropTypes.object,
};

export default HtmlWithDomainStory;
