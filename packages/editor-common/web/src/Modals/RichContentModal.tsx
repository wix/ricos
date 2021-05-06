import React, { Component, ComponentType } from 'react';
import FocusManager from '../Components/FocusManager';
import { DECORATION_MODE, OPEN_SETTINGS_MODAL_BI, CLOSE_SETTINGS_MODAL_BI } from '../consts';
import { getLangDir, ModalDecorations, Helpers, generateKey } from 'wix-rich-content-common';

const renderWrappedModalElement = (wrapping, ModalElement, modalProps) => {
  if (!wrapping) {
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
  helpers?: Helpers;
  pluginId?: string;
}

class RichContentModal extends Component<Props> {
  settingSessionId?: string;

  componentDidMount() {
    const { triggerSettingsBi, helpers, pluginId = '' } = this.props;
    if (triggerSettingsBi) {
      this.settingSessionId = generateKey();
      helpers?.onPluginAction?.(OPEN_SETTINGS_MODAL_BI, {
        plugin_id: pluginId,
        settingSessionId: this.settingSessionId,
      });
    }
  }

  componentWillUnmount() {
    const { triggerSettingsBi, helpers, pluginId = '' } = this.props;
    if (triggerSettingsBi && this.settingSessionId) {
      helpers?.onPluginAction?.(CLOSE_SETTINGS_MODAL_BI, {
        plugin_id: pluginId,
        settingSessionId: this.settingSessionId,
      });
    }
  }

  render() {
    const { modalElement, modalDecorations, locale, ...modalProps } = this.props;
    const ModalElement = modalElement;
    const prepended = modalDecorations
      ?.filter(({ decorationMode }) => decorationMode === DECORATION_MODE.PREPEND)
      .map(({ decorator }) => decorator);
    const wrapping = modalDecorations
      ?.filter(({ decorationMode }) => decorationMode === DECORATION_MODE.WRAP)
      .map(({ decorator }) => decorator);
    const appended = modalDecorations
      ?.filter(({ decorationMode }) => decorationMode === DECORATION_MODE.APPEND)
      .map(({ decorator }) => decorator);

    return (
      <FocusManager dir={getLangDir(locale)}>
        {prepended?.map((Prepended, index) => (
          <Prepended key={`prepended_decorator_${index}`} {...modalProps} />
        ))}
        {renderWrappedModalElement(wrapping, ModalElement, modalProps)}
        {appended?.map((Appended, index) => (
          <Appended key={`appended_decorator_${index}`} {...modalProps} />
        ))}
      </FocusManager>
    );
  }
}

export default RichContentModal;
