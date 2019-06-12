import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import debounce from 'lodash/debounce';
import { getContentStateSchema } from 'wix-rich-content-common';

import dividerSchema from 'wix-rich-content-plugin-divider/dist/statics/data-schema.json';
import imageSchema from 'wix-rich-content-plugin-image/dist/statics/data-schema.json';
import videoSchema from 'wix-rich-content-plugin-video/dist/statics/data-schema.json';
import giphySchema from 'wix-rich-content-plugin-giphy/dist/statics/data-schema.json';
import soundCloudSchema from 'wix-rich-content-plugin-sound-cloud/dist/statics/data-schema.json';
import fileUploadSchema from 'wix-rich-content-plugin-file-upload/dist/statics/data-schema.json';
import mapSchema from 'wix-rich-content-plugin-map/dist/statics/data-schema.json';
import buttonSchema from 'wix-rich-content-plugin-button/dist/statics/data-schema.json';
import htmlSchema from 'wix-rich-content-plugin-html/dist/statics/data-schema.json';
import linkSchema from 'wix-rich-content-plugin-link/dist/statics/data-schema.json';

import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import { FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { SOUND_CLOUD_TYPE } from 'wix-rich-content-plugin-sound-cloud';
import { MAP_TYPE } from 'wix-rich-content-plugin-map';
import { BUTTON_TYPE } from 'wix-rich-content-plugin-map';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';

const stringifyJSON = obj => JSON.stringify(obj, null, 2);

class ContentStateEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      contentState: stringifyJSON(this.props.contentState),
    };

    this.editorOptions = {
      codeLens: false,
      formatOnType: true,
      formatOnPaste: true,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const contentState = stringifyJSON(nextProps.contentState);
    if (contentState !== this.state.contentState) {
      this.setState({ contentState });
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
            [BUTTON_TYPE]: buttonSchema,
            [HTML_TYPE]: htmlSchema,
            [LINK_TYPE]: linkSchema,
          }),
        },
      ],
    });
  };

  onEditorChange = debounce(content => {
    if (content !== '') {
      try {
        const contentJsObj = JSON.parse(content);
        this.props.onChange(contentJsObj);
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
      }
    }
  }, 500);

  refreshLayout = () => this.refs.monaco && this.refs.monaco.editor.layout();

  render = () => {
    const { contentState } = this.state;
    return (
      <MonacoEditor
        ref="monaco"
        language="json"
        value={contentState}
        options={this.editorOptions}
        onChange={this.onEditorChange}
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
