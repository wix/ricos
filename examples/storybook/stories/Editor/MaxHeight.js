import React from 'react';
import { Page } from '../Components/StoryParts';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

import styles from './MaxHeight.scss';
import './styles.global.scss';

const theme = {
  footerToolbar: styles.footerToolbar,
};

const props = {
  plugins: [createDividerPlugin],
  theme,
};

const wantedContainerHeight = 206;
const outerContainerStyle = {
  height: `${wantedContainerHeight}px`,
  border: '1px solid pink',
  transform: 'translate3d(0,0,0)',
};

const contentHeightWithoutFooter = wantedContainerHeight - 50; // 50 = footer toolbar height
const innerContainerStyle = {
  overflow: 'auto',
  height: `${contentHeightWithoutFooter}px`,
};

export default () => (
  <Page title={'Plugins'}>
    <h2>{'Max Height'}</h2>
    <h3>{'Insert RCE to 206px container'}</h3>
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <RichContentEditor {...props} />
      </div>
    </div>
  </Page>
);
