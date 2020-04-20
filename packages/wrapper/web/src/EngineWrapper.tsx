import React, { Children, Fragment, ReactElement } from 'react';
import ViewerRenderer from './ViewerRenderer';
import EditorRenderer from './EditorRenderer';
import { merge } from 'lodash';
import { RichContentProps } from './RichContentWrapperTypes';

interface Props {
  rcProps?: RichContentProps;
  plugins?: PluginConfig[];
  theme?: string | object;
  children: ReactElement;
  isEditor?: boolean;
  isMobile?: boolean;
}

interface State {
  ModalityProvider: typeof Fragment | typeof EditorRenderer | typeof ViewerRenderer;
}

class EngineWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props: Props) {
    const { isEditor, children } = props;
    const { closeModal, openModal, onExpand } = children.props?.helpers || {};
    if (isEditor && !closeModal && !openModal) {
      return { ModalityProvider: EditorRenderer };
    } else if (!isEditor && !onExpand) {
      return { ModalityProvider: ViewerRenderer };
    }
    return { ModalityProvider: Fragment };
  }

  render() {
    const { rcProps, children, isMobile } = this.props;
    const { ModalityProvider } = this.state;

    const mergedRCProps = merge(rcProps, { isMobile }, children.props);

    return (
      <ModalityProvider {...mergedRCProps}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}
export default EngineWrapper;
