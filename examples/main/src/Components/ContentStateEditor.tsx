import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import { getContentStateSchema, RicosContent } from 'ricos/common';

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

import { DIVIDER_TYPE } from 'ricos/divider/editor';
import { VIDEO_TYPE } from 'ricos/video/editor';
import { IMAGE_TYPE } from 'ricos/image/editor';
import { GIPHY_TYPE } from 'ricos/giphy/editor';
import { FILE_UPLOAD_TYPE } from 'ricos/file/editor';
import { SOUND_CLOUD_TYPE } from 'ricos/sound-cloud/editor';
import { MAP_TYPE } from 'ricos/map/editor';
import { HTML_TYPE } from 'ricos/html/editor';
import { LINK_TYPE } from 'ricos/link/editor';
import { MENTION_TYPE } from 'ricos/mention/editor';
import { GALLERY_TYPE } from 'ricos/gallery/editor';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from 'ricos/button/editor';
import { VERTICAL_EMBED_TYPE } from 'ricos/vertical-embed/editor';
import { LINK_PREVIEW_TYPE } from 'ricos/link-preview/editor';
import { POLL_TYPE } from 'ricos/poll/editor';
import MonacoEditor, { ChangeHandler, EditorWillMount } from 'react-monaco-editor';
import { ensureDraftContent, ensureRicosContent } from 'ricos-content/libs/migrateSchema';

function nonSerializedAttribute(key, value) {
  if (typeof value === 'function') {
    throw Error('content is not serialized');
  }
  return value;
}

const stringifyJSON = obj => JSON.stringify(obj, nonSerializedAttribute, 2);

interface Props {
  contentState?: RicosContent;
  onChange: (contentState: RicosContent) => void;
  shouldUseNewContent?: boolean;
}
class ContentStateEditor extends PureComponent<Props> {
  state = {
    value: stringifyJSON(
      this.props.shouldUseNewContent
        ? ensureRicosContent(this.props.contentState)
        : this.props.contentState
    ),
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
  monaco: MonacoEditor;

  componentWillReceiveProps(nextProps: Props) {
    const { contentState, shouldUseNewContent } = nextProps;
    if (!this.monaco?.editor.hasTextFocus()) {
      const value = stringifyJSON(
        shouldUseNewContent ? ensureRicosContent(contentState) : contentState
      );
      this.setState({ value });
    }
  }

  editorWillMount: EditorWillMount = monaco => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: !this.props.shouldUseNewContent,
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

  onChange: ChangeHandler = value => {
    this.setState({ value });
    this.updateContentState(value);
  };

  updateContentState = debounce(value => {
    if (value !== '') {
      try {
        this.props.onChange(ensureDraftContent(JSON.parse(value)));
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

export default ContentStateEditor;
