import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { Page } from '../Components/StoryParts';

import imageContentState from '../../../../e2e/tests/fixtures/images.json';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';

const ImagePluginStory = () => {
  return (
    <Page title="Image Plugin Width Container Width">
      <div style={{ width: 700 }}>
        <RicosViewer width={700} content={imageContentState} plugins={[pluginImage()]} />
      </div>
    </Page>
  );
};

export default ImagePluginStory;
