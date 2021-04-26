import React from 'react';
import { RicosEditorType } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';

const modalSettings = {
  openModal: () => {},
  closeModal: () => {},
};

export default () => {
  <RicosEditorType modalSettings={modalSettings} />;
};
