import { Children, ReactElement, ComponentClass } from 'react';
import { RichContentProps } from './types';
import { DraftContent, BICallbacks } from 'wix-rich-content-common';

export const emptyState: DraftContent = { blocks: [], entityMap: {} };

export const shouldRenderChild = (
  expectedChildName: 'RichContentViewer' | 'RichContentEditor',
  children: ReactElement
): boolean => {
  const child = Children.only(children) as ReactElement<RichContentProps, ComponentClass>; // ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};

export function getBiCallback<T extends keyof BICallbacks>(key: T): BICallbacks[T] | undefined {
  const { children, _rcProps } = this.props;
  return children?.props.helpers?.[key] || _rcProps?.helpers?.[key];
}
