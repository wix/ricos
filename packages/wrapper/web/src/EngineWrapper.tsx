/* eslint-disable react/prop-types */
import React, { Children, Fragment, ReactElement, ElementType, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import FullscreenRenderer from './FullscreenRenderer';
import ModalRenderer from './ModalRenderer';
import { merge } from 'lodash';
import { EditorState } from 'draft-js';
import { RichContentProps } from './RichContentProps';
import { RichContentEditor } from 'wix-rich-content-editor';

interface Props {
  rcProps?: RichContentProps;
  plugins?: PluginConfig[];
  theme?: string | object;
  children: ReactElement;
  isEditor?: boolean;
  isMobile?: boolean;
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
}

interface State {
  ModalityProvider: typeof Fragment | typeof ModalRenderer | typeof FullscreenRenderer;
  editorState?: EditorState;
  MobileToolbar?: ElementType;
  TextToolbar?: ElementType;
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

  editorRef = { ref: editor => (this.editor = editor) };

  componentDidMount() {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ MobileToolbar, TextToolbar });
    }
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const {
      rcProps,
      children,
      isEditor,
      isMobile,
      textToolbarType,
      textToolbarContainer,
    } = this.props;
    const { ModalityProvider, MobileToolbar, TextToolbar } = this.state;
    let editorRef = {};

    const wrapperProps: { isMobile?: boolean; textToolbarType?: TextToolbarType } = {
      isMobile,
      textToolbarType: isMobile ? 'inline' : textToolbarType,
    };

    const mergedRCProps = merge(rcProps, wrapperProps, children.props);

    if (isEditor) {
      const { onChange } = mergedRCProps;
      mergedRCProps.onChange = editorState => {
        onChange?.(editorState);
        this.handleChange(editorState);
      };
      editorRef = this.editorRef;
    }

    const StaticToolbar = MobileToolbar || TextToolbar;

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={textToolbarContainer}
        />
        <ModalityProvider {...mergedRCProps}>
          {Children.only(React.cloneElement(children, { ...mergedRCProps, ...editorRef }))}
        </ModalityProvider>
      </Fragment>
    );
  }
}

const StaticToolbarPortal: FunctionComponent<{
  StaticToolbar?: ElementType;
  textToolbarContainer?: HTMLElement;
}> = ({ StaticToolbar, textToolbarContainer }) => {
  if (!StaticToolbar) return null;

  if (textToolbarContainer) {
    return ReactDOM.createPortal(<StaticToolbar />, textToolbarContainer);
  }
  return <StaticToolbar />;
};

export default EngineWrapper;
