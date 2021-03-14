import { Children, ReactElement, ComponentClass } from 'react';
import { RichContentProps } from './types';
import { DraftContent } from 'wix-rich-content-common';

export const emptyState: DraftContent = { blocks: [], entityMap: {} };

export const shouldRenderChild = (
  expectedChildName: 'RichContentViewer' | 'RichContentEditor',
  children: ReactElement
): boolean => {
  const child = Children.only(children) as ReactElement<RichContentProps, ComponentClass>; // ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};
