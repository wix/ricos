import { Children, ReactElement, ComponentClass } from 'react';

export const emptyState: ContentState = { blocks: [], entityMap: {} };

export const shouldRenderChild = (isViewer: boolean, children: RichContentChild): boolean => {
  const expectedChildName = isViewer ? 'RichContentViewer' : 'RichContentEditor';
  const child = Children.only(children) as ReactElement<ExportedRichContentProps, ComponentClass>; // RichContentChild with type ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};
