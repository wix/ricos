import React, { useState } from 'react';
import { RicosViewer } from 'ricos-viewer';
import { Page } from '../Components/StoryParts';
import ActionButton from '../Components/ActionButton';
import imageContentState from '../../../../e2e/tests/fixtures/images.json';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { parseExperiments } from 'wix-rich-content-common/libs/experiments';

const ImagePluginStory = () => {
  const [experimentEnabled, setExperimentEnabled] = useState(false);
  const [viewerKey, setViewerKey] = useState(1);

  const experiments = parseExperiments({
    ['specs.ricos.useQualityPreload']: 'true',
    ['specs.ricos.useSrcSet']: 'true',
  });
  console.log({ experiments });

  return (
    <Page title="Image Plugin With Thumbnail experiment">
      <ActionButton
        text={`${experimentEnabled ? 'Disable' : 'Enable'} "Quality Thumbnail" Experiment`}
        onClick={() => {
          setExperimentEnabled(!experimentEnabled);
          setViewerKey(viewerKey + 1);
        }}
      />

      <div>
        <RicosViewer
          key={viewerKey}
          content={imageContentState}
          plugins={[pluginImage()]}
          {...(experimentEnabled && { experiments })}
        />
      </div>
    </Page>
  );
};

export default ImagePluginStory;
