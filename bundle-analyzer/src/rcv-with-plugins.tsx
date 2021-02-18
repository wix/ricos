import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'ricos/image/viewer';
import { linkTypeMapper } from 'ricos/link/viewer';
import { htmlTypeMapper } from 'ricos/html/viewer';

const typeMappers = [imageTypeMapper, linkTypeMapper, htmlTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
