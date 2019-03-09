import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, WixUtils } from 'wix-rich-content-common';

export const ALIGN_CENTER = 'center';
import  UploadFileViewer  from './upload-file-viewer';

const DEFAULTS = {
  config: {
    alignment: ALIGN_CENTER,
    size: 'small'
  },
};

class UploadFileComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { componentData, theme } = this.props;
    return (
        <UploadFileViewer componentData={componentData} theme={theme}/>
    );
  }
}


UploadFileComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export { UploadFileComponent as Component, DEFAULTS };
