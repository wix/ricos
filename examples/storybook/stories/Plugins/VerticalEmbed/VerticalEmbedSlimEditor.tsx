import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { MockVerticalSearchModule } from '../../../../main/shared/utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const plugins = [
  pluginVerticalEmbed({
    verticalsApi: type => new MockVerticalSearchModule(type),
    exposeEmbedButtons: [product, event, booking],
    slimLayout: true,
  }),
];

const VerticalEmbedSlimEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default VerticalEmbedSlimEditor;
