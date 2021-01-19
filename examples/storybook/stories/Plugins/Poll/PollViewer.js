import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls/dist/module.viewer';
import PropTypes from 'prop-types';

const PollViewer = ({ content }) => <RicosViewer content={content} plugins={[pluginPoll()]} />;

PollViewer.propTypes = {
  content: PropTypes.object,
};

export default PollViewer;
