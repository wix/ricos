import React, { useState } from 'react';
import { RicosViewer } from 'ricos-viewer';
import { Page } from '../Components/StoryParts';
import ActionButton from '../Components/ActionButton';
import imageContentState from '../../../../e2e/tests/fixtures/images.json';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';

const ImagePluginStory = () => {
  const [experimntEnabled, setExperimentEnabled] = useState(false);
  const [viewerKey, setViewerKey] = useState(1);

  const _rcProps = {
    experiments: { skipImageThumbnail: { value: 'true', enabled: true, namespace: 'ricos' } },
  };

  return (
    <Page title="Image Plugin With Skip Thumbnail experiment">
      <ActionButton
        text={`${experimntEnabled ? 'Disable' : 'Enable'} "Skip Thumbnail" Experiment`}
        onClick={() => {
          setExperimentEnabled(!experimntEnabled);
          setViewerKey(viewerKey + 1);
        }}
      />

      <div style={{ width: 700 }}>
        <RicosViewer
          key={viewerKey}
          width={700}
          content={imageContentState}
          plugins={[pluginImage()]}
          {...(experimntEnabled && { _rcProps })}
        />
      </div>
    </Page>
  );
};

export default ImagePluginStory;