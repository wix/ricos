import React, { Component } from 'react';
import { setupImageEditor } from './image-editor-logic';
import { ComponentData, Helpers, Pubsub } from 'wix-rich-content-common';
import { ImageEditorWixSettings } from '../types';

export type ExtendedBlob = Blob & { lastModifiedDate: Date; name: string };

interface Props {
  imageEditorWixSettings: ImageEditorWixSettings;
  onImageEditorOpen?: () => void;
  componentData: ComponentData;
  helpers?: Helpers;
  pubsub?: Pubsub;
}

class ImageEditor extends Component<Props> {
  id: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      mediaImageStudio: undefined,
      mediaImageStudioEvents: undefined,
    };

    const {
      componentData: { src },
      helpers,
      pubsub,
      imageEditorWixSettings,
      onImageEditorOpen,
    } = this.props;

    const onSave = (file: ExtendedBlob) => {
      pubsub?.getBlockHandler('handleFilesSelected')([file]);
      onClose();
    };

    const onClose = () => {
      helpers?.closeModal?.();
    };

    onImageEditorOpen && onImageEditorOpen();

    this.id = 'imageEditor';
    setupImageEditor(imageEditorWixSettings, this.id, src.file_name, onSave, onClose);
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <div id={this.id} nofocus="true" />;
  }
}

export default ImageEditor;
