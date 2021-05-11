import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import Image from './Image';

export default props => {
  console.log({ props });
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };
  const componentProps = {
    data: {
      ...props.node.attrs,
    },
    isSelected: props.selected,
  };
  return (
    <NodeViewWrapper>
      <Image {...componentProps} />
    </NodeViewWrapper>
  );
};
