import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ExampleApp from '../src/ExampleApp';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';

const generateViewerState = editorState =>
  JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getInitialState(props);
  }

  getInitialState = ({ initialState }) => {
    const locale = getRequestedLocale();
    if (locale !== 'en') {
      this.setLocaleResource(locale);
    }
    return {
      viewerState: initialState || generateViewerState(createEmpty()),
      locale,
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
    const { editorState, viewerState, locale, localeResource } = this.state;
    const { initialState, mode } = this.props;
    if (mode === 'demo') {
      return (
        <ExampleApp
          initialState={initialState}
          editorState={editorState}
          viewerState={viewerState}
          locale={locale}
          isMobile={isMobile()}
          localeResource={localeResource}
          onEditorChange={this.onEditorChange}
          setLocale={this.setLocale}
        />
      );
    } else {
      return (
        <TestApp
          initialState={initialState}
          editorState={editorState}
          viewerState={viewerState}
          locale={locale}
          isMobile={isMobile()}
          localeResource={localeResource}
          onEditorChange={this.onEditorChange}
          setLocale={this.setLocale}
        />
      );
    }
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
