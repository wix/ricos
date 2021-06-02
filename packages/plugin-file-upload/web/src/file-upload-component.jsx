import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';

function FileUploadComponent(props) {
  const { componentData, theme, setComponentUrl, t, isMobile, tempData, isLoading } = props;
  return (
    <FileUploadViewer
      componentData={componentData}
      isLoading={isLoading || componentData.tempData}
      theme={theme}
      setComponentUrl={setComponentUrl}
      t={t}
      isMobile={isMobile}
      tempDataPlaceHolder={tempData}
    />
  );
}

FileUploadComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  commonPubsub: PropTypes.object,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadFinished: PropTypes.func.isRequired,
  tempData: PropTypes.object,
  isLoading: PropTypes.bool,
};

FileUploadComponent.defaultProps = {
  settings: {},
};

export { FileUploadComponent as Component };
