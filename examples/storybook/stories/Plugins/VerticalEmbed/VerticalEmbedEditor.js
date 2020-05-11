import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import PropTypes from 'prop-types';
import MockVerticalSearchModule from '../../../../main/shared/editor/Utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const plugins = [
  pluginVerticalEmbed({
    verticalsApi: {
      [product]: new MockVerticalSearchModule(product),
      [event]: new MockVerticalSearchModule(event),
      [booking]: new MockVerticalSearchModule(booking),
    },
    exposeEmbedButtons: [product, event, booking],
  }),
];

const VerticalEmbedEditor = ({ editorState }) => (
  <RichContentWrapper plugins={plugins} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

VerticalEmbedEditor.propTypes = {
  editorState: PropTypes.object,
};

export default VerticalEmbedEditor;
