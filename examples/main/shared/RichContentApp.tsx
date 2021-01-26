import React, { ElementType, PureComponent } from 'react';
import { debounce } from 'lodash';
import {
  convertToRaw,
  convertFromRaw,
  createEmpty,
  createWithContent,
  EditorState,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isSSR, RicosContent as RicosDraftContent, SEOSettings } from 'wix-rich-content-common';
import { getRequestedLocale, normalize } from '../src/utils';
import { TestAppConfig } from '../src/types';
import { RicosContent } from 'ricos-schema';
import { compare } from 'ricos-content/libs/comparision';

type Mode = 'demo' | 'test';

interface Props {
  mode?: Mode;
  allLocales?: string[];
  debounce?: number;
  initialState?: RicosDraftContent;
  locale?: string;
  seoMode?: SEOSettings;
  isMobile?: boolean;
  app?: ElementType;
  testAppConfig?: TestAppConfig;
}

interface State {
  editorState?: EditorState;
  content?: RicosDraftContent | RicosContent;
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
    initialState?: RicosDraftContent;
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
      content: initialState || convertToRaw(editorState.getCurrentContent()),
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

  onRicosChange = debounce((content: RicosDraftContent | RicosContent) => {
    const diff = compare(content, this.state.content, { ignoredKeys: ['key'] });
    if (Object.keys(diff).length > 0) {
      this.setState({ content });
    }
  }, 600);

  onContentStateChange = (content: RicosDraftContent) => {
    this.setState({
      content,
    });

    this.updateEditorState(content);
  };

  updateContentState = (editorState: EditorState) => {
    this.setState({ content: convertToRaw(editorState.getCurrentContent()) });
  };

  updateEditorState = (content: RicosDraftContent) => {
    this.setState({ editorState: createWithContent(convertFromRaw(normalize(content))) });
  };

  render() {
    const { editorState, content, localeResource, locale, remountKey } = this.state;
    const { allLocales, seoMode, isMobile, app: App, testAppConfig } = this.props;
    return (
      <App
        key={remountKey}
        allLocales={allLocales}
        editorState={editorState}
        content={content}
        locale={locale}
        isMobile={isMobile}
        localeResource={localeResource}
        onEditorChange={this.onEditorChange}
        onRicosChange={this.onRicosChange}
        onContentStateChange={this.onContentStateChange}
        setLocale={this.setLocaleResource}
        seoMode={seoMode}
        testAppConfig={testAppConfig}
      />
    );
  }
}

export default RichContentApp;
