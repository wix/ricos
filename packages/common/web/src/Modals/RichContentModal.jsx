import React from 'react';
import PropTypes from 'prop-types';
import FocusManager from '../Components/FocusManager';
import { DECORATION_MODE } from '../consts';
import { getLangDir } from 'rtl-detect';

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

const RichContentModal = ({ modalElement, modalDecorations, locale, ...modalProps }) => {
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

RichContentModal.propTypes = {
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
  modalDecorations: PropTypes.arrayOf(
    PropTypes.shape({
      decorationMode: PropTypes.oneOf(Object.values(DECORATION_MODE)).isRequired,
      decorator: PropTypes.func.isRequired,
    })
  ),
  locale: PropTypes.string,
};

RichContentModal.defaultProps = {
  modalDecorations: [],
};

export default RichContentModal;
