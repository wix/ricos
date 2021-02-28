import React, { useState } from 'react';
import { RicosViewer } from 'ricos/viewer';
import { Page } from '../Components/StoryParts';
import ActionButton from '../Components/ActionButton';
import imageContentState from '../../../../e2e/tests/fixtures/images.json';
import { pluginImage } from 'ricos/image/viewer';
import { parseExperiments } from 'wix-rich-content-common/libs/experiments';

const ImagePluginStory = () => {
  const [experimntEnabled, setExperimentEnabled] = useState(false);
  const [viewerKey, setViewerKey] = useState(1);

  const experiments = parseExperiments({
    // ['specs.ricos.skipImageThumbnail']: 'true',
    // ['specs.ricos.imageThumbnailQuality']: '20',
    ['specs.ricos.useQualityPreoad']: 'true',
  });
  console.log({ experiments });
  const _rcProps = {
    experiments,
  };

  return (
    <Page title="Image Plugin With Thumbnail experiment">
      <ActionButton
        text={`${experimntEnabled ? 'Disable' : 'Enable'} "Quality Thumbnail" Experiment`}
        onClick={() => {
          setExperimentEnabled(!experimntEnabled);
          setViewerKey(viewerKey + 1);
        }}
      />

      <div style={{ width: 700 }}>
        <RicosViewer
          key={viewerKey}
          // width={700}
          content={imageContentState}
          plugins={[pluginImage()]}
          {...(experimntEnabled && { _rcProps })}
        />
      </div>
    </Page>
  );
};

export default ImagePluginStory;
