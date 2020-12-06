import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import {
  convertToRaw,
  convertFromRaw,
  createEmpty,
  createWithContent,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isSSR } from 'wix-rich-content-common';
import { getRequestedLocale, normalize } from '../src/utils';

class RichContentApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
    if (props.debounce) {
      this.updateContentState = debounce(this.updateContentState, 60);
      this.updateEditorState = debounce(this.updateEditorState, 60);
    }
  }

  getInitialState = ({ initialState, locale = getRequestedLocale(), mode }) => {
    if (!isSSR() && mode === 'demo' && locale !== 'en') {
      this.setLocaleResource(locale);
    }
    const editorState = initialState
      ? createWithContent(convertFromRaw(initialState))
      : createEmpty();
    return {
      editorState,
      contentState: initialState || convertToRaw(editorState.getCurrentContent()),
      locale,
    };
  };

  setLocaleResource = locale => {
    import(`wix-rich-content-common/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({
        locale,
        localeResource: localeResource.default,
        remountKey: !this.state.remountKey,
      })
    );
  };

  onEditorChange = (editorState, traits) => {
    this.setState({
      editorState,
    });
    console.debug(traits);

    this.updateContentState(editorState);
  };

  onRicosEditorChange = contentState => this.setState({ contentState });

  onContentStateChange = contentState => {
    this.setState({
      contentState,
    });

    this.updateEditorState(contentState);
  };

  updateContentState = editorState => {
    this.setState({ contentState: convertToRaw(editorState.getCurrentContent()) });
  };

  updateEditorState = contentState => {
    this.setState({ editorState: createWithContent(convertFromRaw(normalize(contentState))) });
  };

  render() {
    const { editorState, contentState, localeResource, locale, remountKey } = this.state;
    const { allLocales, seoMode, isMobile, app: App, testAppConfig } = this.props;
    return (
      <App
        key={remountKey}
        allLocales={allLocales}
        editorState={editorState}
        contentState={contentState}
        locale={locale}
        isMobile={isMobile}
        localeResource={localeResource}
        onEditorChange={this.onEditorChange}
        onRicosEditorChange={this.onRicosEditorChange}
        onContentStateChange={this.onContentStateChange}
        setLocale={this.setLocaleResource}
        seoMode={seoMode}
        testAppConfig={testAppConfig}
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
