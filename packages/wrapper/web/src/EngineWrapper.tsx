import React, { Children, Fragment, ReactElement, forwardRef, Ref } from 'react';
import FullscreenProvider from './FullscreenProvider';
import ModalDialogProvider from './ModalDialogProvider';
import { merge } from 'lodash';

interface Props extends RichContentWrapperProps {
  children: ReactElement;
  initialState?: ContentState;
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
    const {
      rcProps,
      children,
      forwardedRef,
      isMobile,
      textToolbarType,
      textToolbarContainer,
      placeholder,
      initialState,
    } = this.props;
    const { ModalityProvider } = this.state;

    // any of RichContentWrapperProps that should be merged into child
    const wrapperPropsToMerge: RichContentProps = {
      isMobile,
      textToolbarType: isMobile ? 'inline' : textToolbarType, // optimization - don't need static toolbar when isMobile
      initialState,
      placeholder,
    };

    const mergedRCProps = merge(rcProps, wrapperPropsToMerge, children.props);

    return (
      <ModalityProvider
        {...mergedRCProps}
        ref={forwardedRef}
        textToolbarContainer={textToolbarContainer}
      >
        {Children.only(React.cloneElement(children, { ...mergedRCProps }))}
      </ModalityProvider>
    );
  }
}

export default forwardRef((props: Props, ref: Ref<ReactElement>) => (
  <EngineWrapper {...props} forwardedRef={ref}>
    {props.children}
  </EngineWrapper>
));
