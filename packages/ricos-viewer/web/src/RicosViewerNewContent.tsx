import React, { FunctionComponent } from 'react';
import { toDraft } from 'ricos-content/libs/migrateSchema';
import { RichContent } from 'ricos-schema';
import { RicosContent, RicosViewer, RicosViewerProps } from '.';

export interface RicosViewerNewContentProps extends Omit<RicosViewerProps, 'content'> {
  content?: RichContent;
}

export const RicosViewerNewContent: FunctionComponent<RicosViewerNewContentProps> = props => {
  const { content, ...ricosViewerProps } = props;
  const draftContent: RicosContent | undefined = content && toDraft(content);
  return <RicosViewer content={draftContent} {...ricosViewerProps} />;
};
