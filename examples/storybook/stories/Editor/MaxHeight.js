import React from 'react';
import { Page } from '../Components/StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

import styles from './MaxHeight.scss';

const theme = {
  footerToolbar: styles.footerToolbar,
};

const props = {
  plugins: [createDividerPlugin],
  theme,
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

export const MaxHeight = () => (
  <Page title={'Plugins'}>
    <h2>{'Max Height Theme'}</h2>
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <RichContentEditor {...props} />
      </div>
    </div>
  </Page>
);
