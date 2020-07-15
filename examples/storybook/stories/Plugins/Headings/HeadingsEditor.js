import React from 'react';
import { RicosEditor } from 'ricos-editor';

import PropTypes from 'prop-types';

const HeadingsEditor = ({ content, pluginHeadings }) => (
  <RicosEditor plugins={pluginHeadings ? [pluginHeadings()] : []} content={content} />
);

HeadingsEditor.propTypes = {
  content: PropTypes.object,
  pluginHeadings: PropTypes.func,
};

export default HeadingsEditor;
