import React, { Children, Fragment, ReactElement } from 'react';
import FullscreenRenderer from './FullscreenRenderer';
import ModalRenderer from './ModalRenderer';
import { merge } from 'lodash';
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
  MobileToolbar?: React.ElementType;
}

class EngineWrapper extends React.Component<Props, State> {
  editor: typeof RichContentEditor;

  constructor(props: Props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props: Props) {
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

  getToolbars = () => this.editor.getToolbars();
  focus = () => this.editor.focus();
  blur = () => this.editor.blur();
  getData = (postId: string) => this.editor.getData(postId);

  render() {
    const { rcProps, children, isMobile } = this.props;
    const { ModalityProvider, MobileToolbar } = this.state;

    const mergedRCProps = merge(rcProps, { isMobile }, children.props);

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
