import { Children } from 'react';

// from: react-children-utilities

const hasChildren = element => element && element.props && element.props.children;

export const getChildrenText = children => {
  return Children.toArray(children)
    .reduce(
      (flattened, child) => [
        ...flattened,
        hasChildren(child) ? getChildrenText(child.props.children) : child,
      ],
      []
    )
    .join('');
};
