import { Children, ReactElement, ComponentClass } from 'react';

export const emptyState: ContentState = { blocks: [], entityMap: {} };

export const shouldRenderChild = (name: 'RichContentViewer' | 'RichContentEditor', children: RichContentChild): boolean => {
  const child = Children.only(children) as ReactElement<ExportedRichContentProps, ComponentClass>; // RichContentChild with type ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === name;
};
