import React, { useState, FunctionComponent } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls';
import MobileDetect from 'mobile-detect';
import ActionButton from '../Components/ActionButton';
import {
  withEditorContext,
  EditorEventsProps,
} from 'wix-rich-content-editor-common/libs/EditorEventsContext';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const plugins = [pluginImage(), pluginGallery(), pluginPoll()];

const RicosPublishStory: FunctionComponent<EditorEventsProps> = ({ editorEvents }) => {
  const modalSettings = {
    // eslint-disable-next-line no-console
    onModalOpen: () => console.log('modal opened'),
    // eslint-disable-next-line no-console
    onModalClose: () => console.log('modal closed'),
  };
  const isMobile = mobileDetect.mobile() !== null;
  const [content, setContent] = useState('');
  const { publish } = editorEvents;

  return (
    <Page title="Ricos - editorEvents.publish()">
      <h4>
        See Usage{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://ricos.js.org/docs/ricos/editor-events-context"
        >
          here
        </a>
      </h4>
      <Section>
        <RichContentEditorBox>
          <RicosEditor
            isMobile={isMobile}
            plugins={plugins}
            modalSettings={modalSettings}
            _rcProps={{
              helpers: {
                // eslint-disable-next-line no-console
                onPublish: async (...args) => console.log('biOnPublish', args),
              },
            }}
          />
          <ActionButton
            text={'Publish'}
            onClick={async () => {
              const editorContent = await publish();
              setContent(editorContent);
            }}
          />
        </RichContentEditorBox>
      </Section>
      <Section title="Returned Content:">
        <i>{JSON.stringify(content)}</i>
      </Section>
    </Page>
  );
};

export default withEditorContext(RicosPublishStory);
