import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import { MockVerticalSearchModule } from '../../../../main/shared/utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const getPlugins = withError => [
  pluginVerticalEmbed({
    verticalsApi: type => (withError ? new Error() : new MockVerticalSearchModule(type)),
    exposeEmbedButtons: [product, event, booking],
  }),
];

const VerticalEmbedEditor: FunctionComponent<{ content?: DraftContent; withError?: boolean }> = ({
  content,
  withError,
}) => <RicosEditor plugins={getPlugins(withError)} content={content} />;

export default VerticalEmbedEditor;
