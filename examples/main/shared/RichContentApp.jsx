import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ExampleApp from '../src/ExampleApp';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    const locale = getRequestedLocale();
    this.state = {
      viewerState: props.initialState || {},
      locale,
    };
    if (locale !== 'en') {
      this.setLocaleResource(locale);
    }
  }

  setLocaleResource = locale => {
    import(`wix-rich-content-editor/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ localeResource: localeResource.default })
    );
  };

  onEditorChange = debounce(editorState => {
    this.setState({
      viewerState: JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))),
    });
    this.props.onEditorChange && this.props.onEditorChange(editorState);
  }, 100);

  render() {
    const { viewerState, locale, localeResource } = this.state;
    const { initialState, mode } = this.props;
    if (mode === 'demo') {
      return (
        <ExampleApp
          initialState={initialState}
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
