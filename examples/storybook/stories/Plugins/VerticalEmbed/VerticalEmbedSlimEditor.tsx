import React, { FunctionComponent } from 'react';
import { RicosContent, RicosEditor } from 'ricos/editor';
import { pluginVerticalEmbed, verticalEmbedProviders } from 'ricos/vertical-embed/editor';
import { MockVerticalSearchModule } from '../../../../main/shared/utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const plugins = [
  pluginVerticalEmbed({
    verticalsApi: type => new MockVerticalSearchModule(type),
    exposeEmbedButtons: [product, event, booking],
    slimLayout: true,
  }),
];

const VerticalEmbedSlimEditor: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosEditor plugins={plugins} content={content} />
);

export default VerticalEmbedSlimEditor;
