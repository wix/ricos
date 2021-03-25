import React from 'react';

import { RichContentEditorBox, Page } from '../Components/StoryParts';
import { RicosEditor } from 'ricos-editor';
import './BarrelRoll.global.css';

export default () => {
  const _rcProps = {
    experiments: { barrelRoll: { value: 'true', enabled: true, namespace: 'ricos' } },
  };
  return (
    <Page title="Experiments API">
      <p>{'Type some text in the editor. Then press Cmd+Shift+7'}</p>
      <RichContentEditorBox preset="blog-preset">
        <RicosEditor _rcProps={_rcProps} />
      </RichContentEditorBox>
    </Page>
  );
};
