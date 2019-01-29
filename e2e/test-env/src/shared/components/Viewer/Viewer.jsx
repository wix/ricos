import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
import theme from '../../theme';
import {typeMappers} from './viewerPlugins';

const Viewer = props => (
  <RichContentViewer
    theme={theme}
    typeMappers={typeMappers}
    inlineStyleMappers={[]}
    {...props}
  />
);

export default Viewer;
