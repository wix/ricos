import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { getContentStateSchema, isSSR } from 'wix-rich-content-common';

import dividerSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-divider.schema.json';
import imageSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-image.schema.json';
import videoSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-video.schema.json';
import giphySchema from 'wix-rich-content-common/dist/statics/schemas/plugin-giphy.schema.json';
import soundCloudSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-sound-cloud.schema.json';
import fileUploadSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-file-upload.schema.json';
import mapSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-map.schema.json';
import htmlSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-html.schema.json';
import linkSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link.schema.json';
import mentionSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-mentions.schema.json';
import gallerySchema from 'wix-rich-content-common/dist/statics/schemas/plugin-gallery.schema.json';
import buttonSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-button.schema.json';
import verticalEmbedSchema from 'wix-rich-content-common/dist/statics/schemas/vertical-embed.schema.json';
import linkPreviewSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link-preview.schema.json';
import pollsSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-polls.schema.json';

import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import { FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { SOUND_CLOUD_TYPE } from 'wix-rich-content-plugin-sound-cloud';
import { MAP_TYPE } from 'wix-rich-content-plugin-map';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';
import { MENTION_TYPE } from 'wix-rich-content-plugin-mentions';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from 'wix-rich-content-plugin-button';
import { VERTICAL_EMBED_TYPE } from 'wix-rich-content-plugin-vertical-embed';
import { LINK_PREVIEW_TYPE } from 'wix-rich-content-plugin-link-preview';
import { POLL_TYPE } from 'wix-rich-content-plugin-social-polls';
import MonacoEditor from 'react-monaco-editor';

const stringifyJSON = obj => JSON.stringify(obj, null, 2);

class ContentStateEditor extends PureComponent {
  state = {
    value: stringifyJSON(this.props.contentState),
  };

  editorOptions = {
    codeLens: false,
    formatOnType: true,
    formatOnPaste: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
  };

  componentWillReceiveProps(nextProps) {
    if (!this.monaco?.editor.hasTextFocus()) {
      this.setState({ value: stringifyJSON(nextProps.contentState) });
    }
  }

  editorWillMount = monaco => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'https://wix-rich-content/content-state-schema.json', // scema id
          fileMatch: ['*'],
          schema: getContentStateSchema({
            [DIVIDER_TYPE]: dividerSchema,
            [IMAGE_TYPE]: imageSchema,
            [VIDEO_TYPE]: videoSchema,
            [GIPHY_TYPE]: giphySchema,
            [FILE_UPLOAD_TYPE]: fileUploadSchema,
            [SOUND_CLOUD_TYPE]: soundCloudSchema,
            [MAP_TYPE]: mapSchema,
            [HTML_TYPE]: htmlSchema,
            [LINK_TYPE]: linkSchema,
            [MENTION_TYPE]: mentionSchema,
            [GALLERY_TYPE]: gallerySchema,
            [LINK_BUTTON_TYPE]: buttonSchema,
            [ACTION_BUTTON_TYPE]: buttonSchema,
            [VERTICAL_EMBED_TYPE]: verticalEmbedSchema,
            [LINK_PREVIEW_TYPE]: linkPreviewSchema,
            [POLL_TYPE]: pollsSchema,
          }),
        },
      ],
    });
  };

  onChange = value => {
    this.setState({ value });
    this.updateContentState(value);
  };

  updateContentState = debounce(value => {
    if (value !== '') {
      try {
        this.props.onChange(JSON.parse(value));
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
      }
    }
  }, 70);

  refreshLayout = () => this.monaco?.editor.layout();

  render = () => {
    const { value } = this.state;

    return (
      <MonacoEditor
        ref={ref => (this.monaco = ref)}
        language="json"
        value={value}
        options={this.editorOptions}
        onChange={this.onChange}
        editorWillMount={this.editorWillMount}
      />
    );
  };
}

ContentStateEditor.propTypes = {
  contentState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContentStateEditor;
