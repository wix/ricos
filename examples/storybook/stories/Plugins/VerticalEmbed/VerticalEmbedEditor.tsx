import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos-editor';
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
  }),
];

const VerticalEmbedEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default VerticalEmbedEditor;
