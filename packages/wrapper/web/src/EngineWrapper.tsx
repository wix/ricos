import React, { Children, Fragment, ReactElement } from 'react';
import FullscreenRenderer from './FullscreenRenderer';
import ModalRenderer from './ModalRenderer';
import { merge } from 'lodash';
import { EditorState } from 'draft-js';
import { RichContentProps } from './RichContentWrapperTypes';

interface Props {
  rcProps?: RichContentProps;
  plugins?: PluginConfig[];
  theme?: string | object;
  children: ReactElement;
  editor?: boolean;
}

interface State {
  ModalityProvider: typeof Fragment | typeof ModalRenderer | typeof FullscreenRenderer;
  editorState?: EditorState;
}

class EngineWrapper extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    if (props.editor) {
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "rce-editorStateConversion"  */ `wix-rich-content-editor/dist/lib/editorStateConversion`
      ).then(module => this.setState({ editorState: module.createEmpty() }));
    }
  }

  stateFromProps(props) {
    const { editor, children } = props;
    const { closeModal, openModal, onExpand } = children.props?.helpers || {};
    if (editor && !closeModal && !openModal) {
      return { ModalityProvider: ModalRenderer };
    } else if (!editor && !onExpand) {
      return { ModalityProvider: FullscreenRenderer };
    }
    return { ModalityProvider: Fragment };
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { rcProps, children, editor } = this.props;

    const mergedRCProps = merge(rcProps, children.props);

    if (editor) mergedRCProps.onChange = this.handleChange;

    const { ModalityProvider } = this.state;

    return (
      <ModalityProvider {...mergedRCProps}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}
export default EngineWrapper;
