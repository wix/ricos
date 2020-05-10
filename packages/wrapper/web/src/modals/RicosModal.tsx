/* eslint-disable react/prop-types */
import React, {
  FunctionComponent,
  useEffect,
  useState,
  Fragment,
  ComponentType,
  Suspense,
  Children,
} from 'react';
import { EngineProps } from '../RicosEngine';

const RicosModal: FunctionComponent<EngineProps> = props => {
  const [ModalProvider, setModalProvider] = useState<ComponentType>(Fragment);

  useEffect(() => {
    const { isViewer, children } = props;
    const { openModal, closeModal, onExpand } = children.props;

    const isFullscreenModalProvided = onExpand;
    const isEditorModalProvided = openModal || closeModal;
    let modalProvider = Fragment;

    if (isViewer && isFullscreenModalProvided) {
      modalProvider = React.lazy(() =>
        import(/* webpackChunkName: "RicosFullscreenModal"  */ './fullscreen/FullscreenProvider')
      );
    } else if (!isViewer && isEditorModalProvided) {
      modalProvider = React.lazy(() =>
        import(/* webpackChunkName: "RicosEditorModal"  */ './editorModal/EditorModalProvider')
      );
    }

    setModalProvider(modalProvider);
  });

  return (
    <Suspense fallback={<div />}>
      <ModalProvider {...props}>
        {Children.only(React.cloneElement(props.children, { ...props }))}
      </ModalProvider>
    </Suspense>
  );
};

export default RicosModal;
