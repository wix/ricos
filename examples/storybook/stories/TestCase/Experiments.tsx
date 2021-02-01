import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RicosEditor } from 'ricos-editor';
import './Experiments.global.css';

export default () => {
  return (
    <Page title="Experiments API">
      <p>{'Type some text in the editor. Then press Cmd+Shift+7'}</p>
      <RichContentEditorBox preset="blog-preset">
        <RicosEditor experiments={{ barrelRoll: 'True' }} />
      </RichContentEditorBox>
    </Page>
  );
};
