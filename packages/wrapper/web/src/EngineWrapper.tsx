import React, { Children, Fragment, ReactElement } from 'react';
import FullscreenRenderer from './FullscreenRenderer';
import ModalRenderer from './ModalRenderer';
import { merge } from 'lodash';
import { EditorState } from 'draft-js';
import { RichContentProps } from './RichContentWrapperTypes';
import { RichContentEditor } from 'wix-rich-content-editor';

interface Props {
  rcProps?: RichContentProps;
  plugins?: PluginConfig[];
  theme?: string | object;
  children: ReactElement;
  isEditor?: boolean;
  isMobile?: boolean;
}

interface State {
  ModalityProvider: typeof Fragment | typeof ModalRenderer | typeof FullscreenRenderer;
  editorState?: EditorState;
  MobileToolbar?: React.ElementType;
}

class EngineWrapper extends React.Component<Props, State> {
  editor: typeof RichContentEditor;

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    if (props.isEditor) {
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "rce-editorStateConversion"  */ `wix-rich-content-editor/dist/lib/editorStateConversion`
      ).then(module => this.setState({ editorState: module.createEmpty() }));
    }
  }

  stateFromProps(props) {
    const { isEditor, children } = props;
    const { closeModal, openModal, onExpand } = children.props?.helpers || {};
    if (isEditor && !closeModal && !openModal) {
      return { ModalityProvider: ModalRenderer };
    } else if (!isEditor && !onExpand) {
      return { ModalityProvider: FullscreenRenderer };
    }
    return { ModalityProvider: Fragment };
  }

  componentDidMount() {
    const { isMobile, isEditor } = this.props;
    if (isMobile && isEditor) {
      const { MobileToolbar } = this.editor.getToolbars();
      this.setState({ MobileToolbar });
    }
  }

  handleChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  render() {
    const { rcProps, children, isEditor, isMobile } = this.props;
    const { ModalityProvider, MobileToolbar } = this.state;
    const { onChange } = children.props;

    const mergedRCProps = merge(rcProps, { isMobile }, children.props);

    if (isEditor && !onChange) {
      mergedRCProps.onChange = this.handleChange;
    }

    return (
      <Fragment>
        {MobileToolbar && <MobileToolbar />}
        <ModalityProvider {...mergedRCProps}>
          {Children.only(
            React.cloneElement(children, { ...mergedRCProps, ref: ref => (this.editor = ref) })
          )}
        </ModalityProvider>
      </Fragment>
    );
  }
}
export default EngineWrapper;
