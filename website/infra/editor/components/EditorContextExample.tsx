import React from 'react';
import { withEditorContext } from 'wix-rich-content-editor-common/libs/EditorEventsContext';
import { RicosEditor } from 'ricos-editor';
import content from '../../../infra/editor/content/intro.json';
import 'ricos-editor/dist/styles.min.css';

const YourComponent = ({ editorEvents }) => {
  const onPublish = async () => {
    const content = await editorEvents.publish();
    // eslint-disable-next-line no-alert
    alert('Content:\n\n' + JSON.stringify(content));
  };
  return (
    <>
      <RicosEditor content={content} />
      <br />
      <br />
      <input type="button" onClick={onPublish} value="publish" style={{ maxWidth: '100px' }} />
    </>
  );
};

export const EditorContextExample = withEditorContext(YourComponent);
