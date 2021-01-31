import React, { ElementType, PureComponent } from 'react';
import { debounce } from 'lodash';
import {
  convertToRaw,
  convertFromRaw,
  createEmpty,
  createWithContent,
  EditorState,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isSSR, RicosContent, SEOSettings } from 'wix-rich-content-common';
import { getRequestedLocale, normalize } from '../src/utils';
import { TestAppConfig } from '../src/types';

type Mode = 'demo' | 'test';

interface Props {
  mode?: Mode;
  allLocales?: string[];
  debounce?: number;
  initialState?: RicosContent;
  locale?: string;
  seoMode?: SEOSettings;
  isMobile?: boolean;
  app?: ElementType;
  testAppConfig?: TestAppConfig;
}

interface State {
  editorState?: EditorState;
  contentState?: RicosContent;
  localeResource?: Record<string, string>;
  locale?: string;
  remountKey?: boolean;
}

class RichContentApp extends PureComponent<Props, State> {
  static defaultProps: Props = {
    mode: 'demo',
    allLocales: ['en'],
  };

  constructor(props: Props) {
    super(props);
    this.state = this.getInitialState(props);
    if (props.debounce) {
      this.updateContentState = debounce(this.updateContentState, 60);
      this.updateEditorState = debounce(this.updateEditorState, 60);
    }
  }

  getInitialState = ({
    initialState,
    locale = getRequestedLocale(),
    mode,
  }: {
    initialState?: RicosContent;
    locale?: string;
    mode?: Mode;
  }) => {
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

  setLocaleResource = (locale: string) => {
    import(`wix-rich-content-common/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({
        locale,
        localeResource: localeResource.default,
        remountKey: !this.state.remountKey,
      })
    );
  };

  onEditorChange = (editorState: EditorState, traits) => {
    this.setState({
      editorState,
    });
    this.updateContentState(editorState);
  };

  onRicosEditorChange = (contentState: RicosContent) => this.setState({ contentState });

  onContentStateChange = (contentState: RicosContent) => {
    this.setState({
      contentState,
    });

    this.updateEditorState(contentState);
  };

  updateContentState = (editorState: EditorState) => {
    this.setState({ contentState: convertToRaw(editorState.getCurrentContent()) });
  };

  updateEditorState = (contentState: RicosContent) => {
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

export default RichContentApp;
