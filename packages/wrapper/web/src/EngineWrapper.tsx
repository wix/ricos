import React, { Children, Fragment, ReactElement, forwardRef } from 'react';
import { RichContentProps, ForwardedRef } from './RichContentProps';
import FullscreenProvider from './FullscreenProvider';
import ModalDialogProvider from './ModalDialogProvider';
import { merge } from 'lodash';

interface Props {
  rcProps?: RichContentProps;
  plugins?: PluginConfig[];
  theme?: string | object;
  children: ReactElement;
  isEditor?: boolean;
  isMobile?: boolean;
  forwardedRef?: ForwardedRef;
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
}

interface State {
  ModalityProvider: typeof Fragment | typeof ModalDialogProvider | typeof FullscreenProvider;
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
      return { ModalityProvider: ModalDialogProvider };
    } else if (!isEditor && !onExpand) {
      return { ModalityProvider: FullscreenProvider };
    }
    return { ModalityProvider: Fragment };
  }

  render() {
    const { rcProps, children, forwardedRef } = this.props;
    const { ModalityProvider } = this.state;

    const mergedRCProps = merge(rcProps, children.props);

    return (
      <ModalityProvider {...mergedRCProps} ref={forwardedRef}>
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}

export default forwardRef((props: Props, ref: ForwardedRef) => (
  <EngineWrapper {...props} forwardedRef={ref}>
    {props.children}
  </EngineWrapper>
));
