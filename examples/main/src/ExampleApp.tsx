/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap, debounce } from 'lodash';
import { set, get } from 'local-storage';
import { ErrorBoundary, Fab, SectionHeader, SectionContent, ExternalToolbar } from './Components';
import {
  generateKey,
  loadStateFromStorage,
  saveStateToStorage,
  disableBrowserBackButton,
} from './utils';
import { SectionSettings, OnVisibilityChanged } from './types';
import { RicosContent as RicosDraftContent } from 'wix-rich-content-common';
import type ContentStateEditorType from './Components/ContentStateEditor';
import { EditorState } from 'draft-js';
import { RicosContent } from 'ricos-schema';
import { ensureDraftContent } from 'ricos-content/libs/migrateSchema';

const ContentStateEditor = React.lazy(() => import('./Components/ContentStateEditor'));
const Editor = React.lazy(() => import('../shared/editor/Editor'));
const Viewer = React.lazy(() => import('../shared/viewer/Viewer'));
const Preview = React.lazy(() => import('../shared/preview/Preview'));

interface ExampleAppProps {
  isMobile?: boolean;
  onRicosChange?: (content: RicosContent | RicosDraftContent) => void;
  content?: RicosContent | RicosDraftContent;
  setLocale?: (locale: string) => void;
  locale?: string;
  allLocales?: string[];
  editorState?: EditorState;
  localeResource?: Record<string, string>;
}

interface ExampleAppState {
  containerKey?: string;
  isEditorShown?: boolean;
  isViewerShown?: boolean;
  isPreviewShown?: boolean;
  isContentStateShown?: boolean;
  viewerResetKey?: number;
  previewResetKey?: number;
  editorResetKey?: number;
  shouldMockUpload?: boolean;
  shouldMultiSelectImages?: boolean;
  shouldNativeUpload?: boolean;
  shouldUseRicosContent?: boolean;
  [key: string]: any;
}

class ExampleApp extends PureComponent<ExampleAppProps, ExampleAppState> {
  editorSettings: SectionSettings[];
  viewerSettings: SectionSettings[];
  editorScrollingElementFn: () => Element;
  viewerScrollingElementFn: () => Element;
  contentEditor: ContentStateEditorType;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.initSectionsSettings();
    disableBrowserBackButton();
  }

  getInitialState() {
    const { isMobile } = this.props;
    const containerKey = generateKey('container');
    const localState = loadStateFromStorage();
    return {
      containerKey,
      isEditorShown: true,
      isViewerShown: !isMobile,
      isPreviewShown: false,
      isContentStateShown: false,
      viewerResetKey: 0,
      previewResetKey: 0,
      editorResetKey: 0,
      shouldMockUpload: true,
      shouldMultiSelectImages: false,
      shouldNativeUpload: false,
      shouldUseRicosContent: false,
      ...localState,
    };
  }

  componentDidMount() {
    this.editorScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('editor-example')[0];
    this.viewerScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('viewer-example')[0];
    window && window.addEventListener('resize', this.onContentStateEditorResize);
    const content = this.loadContentStateFromLocalStorage();
    if (content) {
        this.props.onRicosChange(content);
    }
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  componentDidUpdate(prevProps) {
    this.saveContentStateToLocalStorage(this.props.content);
  }

  saveContentStateToLocalStorage = debounce(content => set('contentState', content), 500);

  loadContentStateFromLocalStorage = (): RicosContent | RicosDraftContent => get('contentState');

  setContentStateEditor = (ref: ContentStateEditorType) => (this.contentEditor = ref);

  onContentStateEditorResize = () =>
    this.contentEditor && this.contentEditor.refreshLayout();

  onSectionVisibilityChange: OnVisibilityChanged = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };

  onSetLocale = (locale: string) => {
    this.props.setLocale && this.props.setLocale(locale);
  };

  initSectionsSettings = () => {
    const {
      editorIsMobile,
      shouldMockUpload,
      shouldMultiSelectImages,
      staticToolbar,
      shouldNativeUpload,
      shouldUseRicosContent
    } = this.state;
    this.editorSettings = [
      {
        name: 'Mobile',
        active: editorIsMobile,
        action: () =>
          this.setState(state => ({
            editorIsMobile: !state.editorIsMobile,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
      {
        name: 'Mock Upload',
        active: shouldMockUpload,
        action: () =>
          this.setState(state => ({
            shouldMockUpload: !state.shouldMockUpload,
          })),
      },
      {
        name: 'Native Upload Mock',
        active: shouldNativeUpload,
        action: () =>
          this.setState(state => ({
            shouldNativeUpload: !state.shouldNativeUpload,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
      {
        name: 'Use Ricos Content',
        active: shouldUseRicosContent,
        action: () =>
          this.setState(state => ({
            shouldUseRicosContent: !state.shouldUseRicosContent,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
      {
        name: 'Multi-Select Images',
        active: shouldMultiSelectImages,
        action: () =>
          this.setState(state => ({
            shouldMultiSelectImages: !state.shouldMultiSelectImages,
          })),
      },
      {
        name: 'Static Toolbar',
        active: staticToolbar,
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      },
      {
        name: 'Locale',
        active: this.props.locale,
        action: selectedLocale => this.onSetLocale(selectedLocale),
        items: this.props.allLocales,
      },
    ];

    this.viewerSettings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            viewerIsMobile: !state.viewerIsMobile,
            viewerResetKey: state.viewerResetKey + 1,
          })),
      },
    ];
  };

  renderEditor = () => {
    const {
      content,
      onRicosChange,
      locale,
      isMobile,
    } = this.props;
    const {
      isEditorShown,
      staticToolbar,
      shouldMultiSelectImages,
      editorIsMobile,
      shouldNativeUpload,
      shouldUseRicosContent
    } = this.state;

    return (
      isEditorShown && (
        <ReflexElement
          key={`editor-section-${this.state.editorResetKey}`}
          className="section editor-example"
        >
          <SectionHeader
            title="Editor"
            settings={this.editorSettings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Editor
                onRicosChange={onRicosChange}
                content={content}
                isMobile={editorIsMobile || isMobile}
                shouldMultiSelectImages={shouldMultiSelectImages}
                shouldNativeUpload={shouldNativeUpload}
                shouldUseRicosContent={shouldUseRicosContent}
                staticToolbar={staticToolbar}
                locale={locale}
                scrollingElementFn={this.editorScrollingElementFn}
                externalToolbar={ExternalToolbar}
                shouldUseRicos
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderPreview = () => {
    const { content, isMobile, locale, localeResource } = this.props;
    const { isPreviewShown } = this.state;
    const settings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            previewIsMobile: !state.previewIsMobile,
            previewResetKey: state.previewResetKey + 1,
          })),
      },
    ];
    return (
      isPreviewShown && (
        <ReflexElement
          key={`preview-section-${this.state.previewResetKey}`}
          className="section preview-example"
        >
          <SectionHeader
            title="Preview"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Preview
                content={ensureDraftContent(content)}
                isMobile={this.state.previewIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderViewer = () => {
    const { content, isMobile, locale, localeResource } = this.props;
    const { isViewerShown } = this.state;

    return (
      isViewerShown && (
        <ReflexElement
          key={`viewer-section-${this.state.viewerResetKey}`}
          className="section viewer-example"
        >
          <SectionHeader
            title="Viewer"
            settings={this.viewerSettings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Viewer
                content={content}
                isMobile={this.state.viewerIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
                scrollingElementFn={this.viewerScrollingElementFn}
                shouldUseRicos
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { content, onRicosChange } = this.props;
    const { isContentStateShown, shouldUseRicosContent } = this.state;
    return (
      isContentStateShown && (
        <ReflexElement
          key="contentstate-section"
          className="section"
          onStopResize={this.onContentStateEditorResize}
        >
          <SectionHeader title="Content State" onHide={this.onSectionVisibilityChange} />
          <SectionContent>
            <ContentStateEditor
              ref={this.setContentStateEditor}
              onChange={onRicosChange}
              shouldUseRicosContent={shouldUseRicosContent}
              content={content}
            />
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  setSectionVisibility: OnVisibilityChanged = (sectionName, isVisible) =>
    this.setState({ [`show${sectionName}`]: isVisible });

  renderSections = () => {
    const sections = compact([
      this.renderEditor(),
      this.renderViewer(),
      this.renderPreview(),
      this.renderContentState(),
    ]);

    return flatMap(sections, (val, i, arr) =>
      arr.length - 1 !== i
        ? [val, <ReflexSplitter className="splitter" propagate={true} key={`splitter-${i}`} />]
        : val
    );
  };

  render() {
    const { isMobile } = this.props;
    const { isEditorShown, isViewerShown, isContentStateShown, isPreviewShown } = this.state;
    const showEmptyState =
      !isEditorShown && !isViewerShown && !isContentStateShown && !isPreviewShown;

    return (
      <div className="wrapper">
        <ReflexContainer orientation="vertical" windowResizeAware={true} className="container">
          {showEmptyState ? (
            <div className="empty-state">Wix Rich Content</div>
          ) : (
            this.renderSections()
          )}
        </ReflexContainer>
        <Fab
          isMobile={isMobile}
          isEditorShown={isEditorShown}
          isViewerShown={isViewerShown}
          isPreviewShown={isPreviewShown}
          isContentStateShown={isContentStateShown}
          toggleSectionVisibility={this.onSectionVisibilityChange}
        />
      </div>
    );
  }
}

export default hot(ExampleApp);
