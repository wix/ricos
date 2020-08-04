import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler';
import PropTypes from 'prop-types';

const SpoilerEditor = ({ content }) => (
  <RicosEditor plugins={[pluginSpoiler()]} content={content} />
);

SpoilerEditor.propTypes = {
  content: PropTypes.object,
};

export default SpoilerEditor;
