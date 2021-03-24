import React, { useState } from 'react';
import { RicosEditor } from 'ricos-editor';
import { Page } from '../Components/StoryParts';
import ActionButton from '../Components/ActionButton';
import imageContentState from '../../../../e2e/tests/fixtures/images.json';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import { parseExperiments } from 'wix-rich-content-common/libs/experiments';

const ImagePluginStory = () => {
  const [experimentEnabled, setExperimentEnabled] = useState(false);
  const [viewerKey, setViewerKey] = useState(1);

  const experiments = parseExperiments({
    ['specs.ricos.useHeadingOne']: 'true',
  });
  console.log('experimentEnabled', experimentEnabled);
  console.log('experiments', experiments);
  const _rcProps = {
    experiments,
  };

  return (
    <Page title="Heading 1">
      <ActionButton
        text={`${experimentEnabled ? 'Disable' : 'Enable'} "useHeadingOne" Experiment`}
        onClick={() => {
          setExperimentEnabled(!experimentEnabled);
          setViewerKey(viewerKey + 1);
        }}
      />

      <div>
        <RicosEditor
          key={viewerKey}
          content={imageContentState}
          plugins={[pluginHeadings()]}
          {...(experimentEnabled && { _rcProps })}
        />
      </div>
    </Page>
  );
};

export default ImagePluginStory;
