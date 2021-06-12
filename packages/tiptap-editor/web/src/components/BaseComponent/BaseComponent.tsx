import React, { useContext, useState, useEffect } from 'react';
import { EditorPropsContext } from '../../context';
import { NodeViewWrapper } from '@tiptap/react';
import {
  getAlignmentClassName,
  getFocusClassName,
  getSizeClassName,
  getTextWrapClassName,
} from './styles';
import generalStyles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';
import generalRTLIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';
import { proseMirrorNodeDataToDraft, toProseMirror } from 'ricos-content/libs/converters';

const stylesWithRTL = { ...generalStyles, ...generalRTLIgnoredStyles };
const EditorContextConsumer = ({ children }) => {
  const editorContext = useContext(EditorPropsContext);
  return children(editorContext);
};

const getComponentStyles = ({ componentData, theme, isFocused }) => {
  const alignment = componentData?.config?.alignment;
  const size = componentData?.config?.size;
  const textWrap = componentData?.config?.textWrap;

  return {
    alignmentClassName: getAlignmentClassName(stylesWithRTL, alignment, theme),
    sizeClassName: getSizeClassName(stylesWithRTL, size, theme),
    focusClassName: getFocusClassName(stylesWithRTL, theme, isFocused),
    textWrapClassName: getTextWrapClassName(stylesWithRTL, theme, textWrap),
  };
};

const BaseExtensionComponentHOC = Component => {
  return props => {
    return (
      <EditorContextConsumer>
        {context => {
          const componentData = proseMirrorNodeDataToDraft(
            props.node.type.name.toUpperCase(),
            props.node.attrs
          );

          const [isSelected, setSelected] = useState(false);
          const { editor, getPos } = props;
          const selected = props.selected;
          const { theme } = context;

          const componentStyles = getComponentStyles({
            componentData: toProseMirror(componentData),
            theme,
            isFocused: isSelected || selected,
          });

          useEffect(() => {
            editor.on('selectionUpdate', ({ editor }) => {
              const position = getPos();
              if (
                position >= editor.state.selection.$from.pos &&
                position <= editor.state.selection.$to.pos
              ) {
                setSelected(true);
              } else {
                setSelected(false);
              }
            });
          });

          return (
            <NodeViewWrapper as="div">
              <div data-drag-handle className={Object.values(componentStyles).join(' ')}>
                <Component {...props} context={context} componentData={componentData} />
              </div>
            </NodeViewWrapper>
          );
        }}
      </EditorContextConsumer>
    );
  };
};

export default BaseExtensionComponentHOC;
