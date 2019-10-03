import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ExampleApp from '../src/ExampleApp';
import TestApp from '../../../e2e/test-env/src/client/TestApp';
import { getRequestedLocale, isMobile } from '../src/utils';

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    const locale = getRequestedLocale();
    if (locale !== 'en') {
      this.setLocale(locale);
    }
  }

  getInitialState() {
    const editorState = createEmpty();
    const locale = getRequestedLocale();
    return {
      editorState,
      locale,
    };
  }

  onEditorChange = editorState => this.setState({ editorState });

  setLocale = locale => {
    import(`wix-rich-content-editor/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ locale, localeResource: localeResource.default })
    );
  };

  render() {
    const { editorState, locale, localeResource } = this.state;
    const { mode } = this.props;
    if (mode === 'demo') {
      return (
        <ExampleApp
          editorState={editorState}
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
          editorState={editorState}
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
