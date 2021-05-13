import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import 'wix-rich-content-viewer/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/viewer';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { linkTypeMapper } from 'wix-rich-content-plugin-link/viewer';
import 'wix-rich-content-plugin-link/dist/styles.min.css';

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
