import { Children, ReactElement } from 'react';

// from: react-children-utilities

const hasChildren = (element: ReactElement) => element && element.props && element.props.children;

export const getChildrenText = (children: React.ReactChildren) => {
  return (Children.toArray(children).reduce(
    (flattened: string[], child: ReactElement) => [
      ...flattened,
      hasChildren(child) ? getChildrenText(child.props.children) : child,
    ],
    []
  ) as string[]).join('');
};
