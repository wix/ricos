import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { isSSR } from 'wix-rich-content-common';

import { getRequestedLocale } from '../src/utils';

const generateViewerState = editorState =>
  JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
    if (props.debounce) {
      this.onEditorChange = debounce(this.onEditorChange, props.debounce);
    }
  }

  getInitialState = ({ initialState, locale = getRequestedLocale(), mode }) => {
    if (!isSSR() && mode === 'demo' && locale !== 'en') {
      this.setLocaleResource(locale);
    }
    return {
      viewerState: initialState || generateViewerState(createEmpty()),
      locale,
    };
  };

  setLocaleResource = locale => {
    import(`wix-rich-content-common/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ locale, localeResource: localeResource.default })
    );
  };

  onEditorChange = editorState => {
    this.setState({
      editorState,
      viewerState: generateViewerState(editorState),
    });
    this.props.onEditorChange && this.props.onEditorChange(editorState);
  };

  render() {
    const { editorState, viewerState, localeResource, locale } = this.state;

    const { allLocales, initialState, seoMode, isMobile, app: App } = this.props;
    return (
      <App
        allLocales={allLocales}
        initialState={initialState}
        editorState={editorState}
        viewerState={viewerState}
        previewState={viewerState}
        locale={locale}
        isMobile={isMobile}
        localeResource={localeResource}
        onEditorChange={this.onEditorChange}
        setLocale={this.setLocaleResource}
        seoMode={seoMode}
      />
    );
  }
}

RichContentApp.propTypes = {
  mode: PropTypes.oneOf(['demo', 'test']),
  allLocales: PropTypes.arrayOf(PropTypes.string),
};

RichContentApp.defaultProps = {
  mode: 'demo',
  allLocales: ['en'],
};

export default RichContentApp;
