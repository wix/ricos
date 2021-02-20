import React, { FunctionComponent, ComponentType } from 'react';
import FocusManager from '../Components/FocusManager';
import { DECORATION_MODE } from '../consts';
import { getLangDir, ModalDecorations } from 'wix-rich-content-common';

const renderWrappedModalElement = (wrapping, ModalElement, modalProps) => {
  if (wrapping.length === 0) {
    return <ModalElement {...modalProps} />;
  } else {
    const Wrapper = wrapping.shift();
    return (
      <Wrapper {...modalProps}>
        {renderWrappedModalElement(wrapping, ModalElement, modalProps)}
      </Wrapper>
    );
  }
};

interface Props {
  modalElement?: ComponentType;
  modalDecorations?: ModalDecorations;
  locale?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

const RichContentModal: FunctionComponent<Props> = ({
  modalElement,
  modalDecorations = [],
  locale,
  ...modalProps
}) => {
  const ModalElement = modalElement;
  const prepended = modalDecorations
    .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.PREPEND)
    .map(({ decorator }) => decorator);
  const wrapping = modalDecorations
    .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.WRAP)
    .map(({ decorator }) => decorator);
  const appended = modalDecorations
    .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.APPEND)
    .map(({ decorator }) => decorator);

  return (
    <FocusManager dir={getLangDir(locale)}>
      {prepended.length > 0 &&
        prepended.map((Prepended, index) => (
          <Prepended key={`prepended_decorator_${index}`} {...modalProps} />
        ))}
      {renderWrappedModalElement(wrapping, ModalElement, modalProps)}
      {appended.length > 0 &&
        appended.map((Appended, index) => (
          <Appended key={`appended_decorator_${index}`} {...modalProps} />
        ))}
    </FocusManager>
  );
};

export default RichContentModal;
