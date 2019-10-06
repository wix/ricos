import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { debounce } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ExampleApp from '../src/ExampleApp';
import { isSSR } from 'wix-rich-content-common';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';

const generateViewerState = editorState =>
  JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
  }

  getInitialState = ({ initialState, locale }) => {
    const tmpLocale = locale ? locale : getRequestedLocale();
    //todo: check this
    if (!isSSR() && this.props.mode === 'demo' && tmpLocale !== 'en') {
      this.setLocaleResource(tmpLocale);
    }
    return {
      viewerState: initialState || generateViewerState(createEmpty()),
      locale: tmpLocale,
    };
  };

  setLocaleResource = locale => {
    import(`wix-rich-content-editor/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ locale, localeResource: localeResource.default })
    );
  };
  onChange = editorState => {
    this.setState({
      editorState,
      viewerState: generateViewerState(editorState),
    });
    this.props.onEditorChange && this.props.onEditorChange(editorState);
  };
  onEditorChange = editorState => {
    // if (this.props.mode === 'demo') {
    //   debounce(this.onChange(editorState), 100);
    // } else {
    this.onChange(editorState);
    //}
  };

  render() {
    const { editorState, viewerState, localeResource, locale } = this.state;
    const { allLocales, initialState, mode } = this.props;
    const App = mode === 'demo' ? ExampleApp : TestApp;
    return (
      <App
        allLocales={allLocales}
        initialState={initialState}
        editorState={editorState}
        viewerState={viewerState}
        locale={locale}
        isMobile={mode === 'demo' ? isMobile() : this.props.isMobile}
        localeResource={localeResource}
        onEditorChange={this.onEditorChange}
        setLocale={this.setLocaleResource}
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
