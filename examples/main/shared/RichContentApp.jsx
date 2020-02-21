import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { isSSR } from 'wix-rich-content-common';
import ExampleApp from '../src/ExampleApp';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';

const generateViewerState = editorState =>
  JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
    if (this.props.mode === 'demo') {
      this.onEditorChange = debounce(this.onEditorChange, 100);
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
    const { allLocales, initialState, mode, seoMode } = this.props;
    const App = mode === 'demo' ? ExampleApp : TestApp;
    return (
      <App
        allLocales={allLocales}
        initialState={initialState}
        editorState={editorState}
        viewerState={viewerState}
        previewState={viewerState}
        locale={locale}
        isMobile={mode === 'demo' ? isMobile() : this.props.isMobile}
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
