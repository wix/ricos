import React from 'react';
import { Page } from '../Components/StoryParts';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

import styles from './MaxHeight.scss';

const theme = {
  footerToolbar: styles.footerToolbar,
};

const wantedContainerHeight = 206;
const footerToolbarHeight = 50;
const contentHeightWithoutFooter = wantedContainerHeight - footerToolbarHeight;
const outerContainerStyle = {
  height: `${wantedContainerHeight}px`,
  border: '1px solid pink',
  transform: 'translate3d(0,0,0)',
};
const innerContainerStyle = {
  overflow: 'auto',
  height: `${contentHeightWithoutFooter}px`,
};

export default () => (
  <Page title={'Max Height'}>
    <p>This is a test to see how RCE fits in max height scenario</p>
    <p>
      This is still not official way of work because tooltips are cut if exceed the limits of the
      editor
    </p>
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <RicosEditor plugins={[pluginDivider()]} theme={theme} />
      </div>
    </div>
  </Page>
);
