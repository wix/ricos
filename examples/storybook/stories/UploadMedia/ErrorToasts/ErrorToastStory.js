import React from 'react';
import { RichContentEditorBox, Section, Page } from '../../Components/StoryParts';

import contentState from '../../../../../e2e/tests/fixtures/empty.json';
import { MediaEditor, getMediaUploadErrorFunctions } from '../Utils';

const ErrorToastStory = () => {
  const { handleFileUpload, handleVideoUpload } = getMediaUploadErrorFunctions();
  return (
    <Page title="Error Toasts">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox content={contentState}>
          <MediaEditor
            content={contentState}
            handleFileUpload={handleFileUpload}
            handleVideoUpload={handleVideoUpload}
          />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};

export default ErrorToastStory;
