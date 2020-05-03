import React, { PureComponent } from 'react';
import Preview from '../../../../examples/main/shared/preview/Preview';
import PropTypes from 'prop-types';
import windowContentStateHoc from './WindowContentStateHoc';
class PreviewTestApp extends PureComponent {
  renderPreview = () => {
    const { isMobile, contentState, locale, seoMode } = this.props;
    return (
      <Preview initialState={contentState} isMobile={isMobile} locale={locale} seoMode={seoMode} />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className={`testApp ${isMobile ? 'mobile' : ''}`}>
        <div>
          <h3>Preview</h3>
          <div className="rcWrapper rcv">{this.renderPreview()}</div>
        </div>
      </div>
    );
  }
}

PreviewTestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
};

export default windowContentStateHoc(PreviewTestApp);
