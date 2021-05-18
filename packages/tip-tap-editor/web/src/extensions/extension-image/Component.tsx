import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import Image from './image-editor';

const Component = () => {
  return props => {
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
      <NodeViewWrapper as="span">
        <Image {...componentProps} />
      </NodeViewWrapper>
    );
  };
};
export default Component;
