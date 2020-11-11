import React from 'react';
import { RicosEditor } from 'ricos-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import { RichContentEditor } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';

function getPlugins(handleVideoUpload, handleFileUpload) {
  return [
    pluginImage({
      imageEditorWixSettings: {
        initiator: 'some-initiator',
        siteToken:
          'JWS.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5FUXljQzlOIn0.eyJpYXQiOjE1Njc1MjY3NzQsImRhdGEiOiJ7XCJ1c2VySWRcIjpcIjE5YTY0YTRjLWVlZTAtNGYxNC1iNjI3LTY3MmQ1ZjE2OGJkNFwiLFwibWV0YXNpdGVJZFwiOlwiNTM4ZmE2YzYtYzk1My00Y2RkLTg2YzQtNGI4NjlhZWNmOTgwXCJ9IiwiZXhwIjoxNTY4NzM2Mzc0fQ.n21OxIzSbqi8N3v30b6cIxMdshBnkkf2WQLWEFVXsLk',
        metaSiteId: '538fa6c6-c953-4cdd-86c4-4b869aecf980',
        mediaRoot: 'some-mediaRoot',
      },
    }),
    pluginVideo({ handleFileUpload: handleVideoUpload }),
    pluginGallery({ scrollingElement: () => document.body }),
    pluginFileUpload({ handleFileSelection: handleFileUpload }),
  ];
}

const MediaEditor = React.forwardRef(
  ({ content, handleFileUpload, handleVideoUpload, handleImageUpload }, ref) => (
    <RicosEditor
      plugins={getPlugins(handleVideoUpload, handleFileUpload)}
      content={content}
      ref={ref}
    >
      <RichContentEditor helpers={{ handleFileSelection: handleImageUpload }} />
    </RicosEditor>
  )
);

MediaEditor.propTypes = {
  content: PropTypes.object,
  handleFileUpload: PropTypes.func,
  handleVideoUpload: PropTypes.func,
  handleImageUpload: PropTypes.func,
};

export default MediaEditor;
