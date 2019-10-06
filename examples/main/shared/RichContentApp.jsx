import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ExampleApp from '../src/ExampleApp';
import { isSSR } from 'wix-rich-content-common';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';
const isItMobile = isMobile;
const generateViewerState = editorState =>
  JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
  }

  getInitialState = ({ initialState, isMobile, localeFromProps }) => {
    const locale = localeFromProps ? localeFromProps : getRequestedLocale();
    //todo: check this
    if (!isSSR() && locale && locale !== 'en') {
      this.setLocaleResource(locale);
    }
    return {
      viewerState: initialState || generateViewerState(createEmpty()),
      locale,
      isMobile,
    };
  };

  setLocaleResource = locale => {
    import(`wix-rich-content-editor/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ localeResource: localeResource.default })
    );
  };

  onEditorChange = debounce(editorState => {
    this.setState({
      editorState,
      viewerState: generateViewerState(editorState),
    });
    this.props.onEditorChange && this.props.onEditorChange(editorState);
  }, 100);

  render() {
    const { editorState, viewerState, locale, localeResource, isMobile } = this.state;
    const { initialState, mode } = this.props;
    const App = mode === 'demo' ? ExampleApp : TestApp;
    return (
      <App
        initialState={initialState}
        editorState={editorState}
        viewerState={viewerState}
        locale={locale}
        isMobile={isMobile || isItMobile()}
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
