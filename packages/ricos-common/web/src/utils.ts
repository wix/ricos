import { Children, ReactElement, ComponentClass } from 'react';
import { RicosContent, RichContentChild, ExportedRichContentProps } from './types';

export const emptyState: RicosContent = { blocks: [], entityMap: {} };

export const shouldRenderChild = (
  expectedChildName: 'RichContentViewer' | 'RichContentEditor',
  children: RichContentChild
): boolean => {
  const child = Children.only(children) as ReactElement<ExportedRichContentProps, ComponentClass>; // RichContentChild with type ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};
