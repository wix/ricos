import React from 'react';
import { RicosEditor } from 'ricos-editor';

const modalSettings = {
  openModal: () => {},
  closeModal: () => {},
};

export default () => {
  <RicosEditor modalSettings={modalSettings} />;
};
