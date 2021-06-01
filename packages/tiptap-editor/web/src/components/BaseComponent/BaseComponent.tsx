import React, { useContext, useState } from 'react';
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
import classNames from 'classnames';
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
function useForceUpdate() {
  const [, setValue] = useState(0);

  return () => setValue(value => value + 1);
}

const BaseExtensionComponentHOC = Component => {
  return props => {
    return (
      <EditorContextConsumer>
        {context => {
          // const componentData = props.node.attrs;

          const componentData = {
            config: {
              size: 'small',
              alignment: 'right',
              textWrap: 'nowrap',
            },
            type: 'double',
          };
          const forceUpdate = useForceUpdate();

          const { editor, getPos } = props;
          let selected = props.selected;
          console.log({ props });
          editor.on('selectionUpdate', ({ editor }) => {
            // The selection has changed.
            console.log('selection changed', getPos());

            const position = getPos();
            console.log(' position', position);
            console.log(' editor.state.selection.$from', editor.state.selection.$from.pos);
            if (
              position >= editor.state.selection.$from.pos &&
              position <= editor.state.selection.$to.pos
            ) {
              forceUpdate();

              selected = true;
            } else {
              selected = false;
            }
          });

          const { theme } = context;
          const componentStyles = getComponentStyles({
            componentData,
            theme,
            isFocused: selected,
          });

          console.log(componentStyles, classNames(componentStyles));
          return (
            <NodeViewWrapper as="div">
              <div className={Object.values(componentStyles).join(' ')}>
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
