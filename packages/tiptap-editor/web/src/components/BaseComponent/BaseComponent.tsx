import React, { useContext } from 'react';
import { EditorPropsContext } from '../../context';
import { NodeViewWrapper } from '@tiptap/react';

const EditorContextConsumer = ({ children }) => {
  const editorContext = useContext(EditorPropsContext);
  return children(editorContext);
};

const BaseExtensionComponentHOC = Component => {
  return props => {
    return (
      <EditorContextConsumer>
        {context => {
          // const componentData = props.node.attrs;
          const componentData = {
            config: {
              size: 'small',
              alignment: 'left',
              textWrap: 'nowrap',
            },
            type: 'dashed',
          };
          return (
            <NodeViewWrapper as="div">
              <Component {...props} context={context} componentData={componentData} />
            </NodeViewWrapper>
          );
        }}
      </EditorContextConsumer>
    );
  };
};

export default BaseExtensionComponentHOC;
