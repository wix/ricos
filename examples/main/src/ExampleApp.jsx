/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap, debounce } from 'lodash';
import local from 'local-storage';
import { ErrorBoundary, Fab, SectionHeader, SectionContent, ExternalToolbar } from './Components';
import {
  generateKey,
  loadStateFromStorage,
  saveStateToStorage,
  disableBrowserBackButton,
} from './utils';
const ContentStateEditor = React.lazy(() => import('./Components/ContentStateEditor'));
const Editor = React.lazy(() => import('../shared/editor/Editor'));
const Viewer = React.lazy(() => import('../shared/viewer/Viewer'));
const Preview = React.lazy(() => import('../shared/preview/Preview'));

import { convertFromRaw, EditorState, SelectionState } from 'wix-rich-content-editor-common';

const raw = {
  blocks: [
    {
      key: 'ap77n',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '6hc2b',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'cqrco',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'center',
          size: 'content',
          showTitle: true,
          showDescription: true,
        },
        src: {
          id: '17ef104520dd9a0711f1cc900d970b79',
          original_file_name: '8bb438_277609c27d9346c38d480b6da8237820.jpg',
          file_name: '8bb438_277609c27d9346c38d480b6da8237820.jpg',
          width: 1920,
          height: 1280,
        },
      },
    },
  },
  VERSION: '7.10.5',
};

class ExampleApp extends PureComponent {
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
      ...localState,
    };
  }

  componentDidMount() {
    this.editorScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('editor-example')[0];
    this.viewerScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('viewer-example')[0];
    window && window.addEventListener('resize', this.onContentStateEditorResize);
    const contentState = this.loadContentStateFromLocalStorage();
    if (contentState) {
      this.props.onContentStateChange(contentState);
    }
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  componentDidUpdate(prevProps) {
    this.saveContentStateToLocalStorage(this.props.contentState);
  }

  saveContentStateToLocalStorage = debounce(
    contentState => local.set('contentState', contentState),
    500
  );

  loadContentStateFromLocalStorage = () => local.get('contentState');

  setContentStateEditor = ref => (this.contentStateEditor = ref);

  onContentStateEditorResize = () =>
    this.contentStateEditor && this.contentStateEditor.refreshLayout();

  onSectionVisibilityChange = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };
  onSetLocale = locale => {
    // this.props.setLocale && this.props.setLocale(locale);
    this.setState({ testEditorState: EditorState.createWithContent(convertFromRaw(raw)) });
  };

  initSectionsSettings = () => {
    const {
      editorIsMobile,
      shouldMockUpload,
      shouldMultiSelectImages,
      staticToolbar,
      shouldNativeUpload,
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
      allLocales,
      editorState,
      onEditorChange,
      locale,
      localeResource,
      isMobile,
    } = this.props;
    const {
      isEditorShown,
      staticToolbar,
      shouldMockUpload,
      shouldMultiSelectImages,
      editorIsMobile,
      isToolbarShown,
      shouldNativeUpload,
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
                onChange={onEditorChange}
                editorState={this.state.testEditorState || editorState}
                isMobile={editorIsMobile || isMobile}
                shouldMockUpload={shouldMockUpload}
                shouldMultiSelectImages={shouldMultiSelectImages}
                shouldNativeUpload={shouldNativeUpload}
                staticToolbar={staticToolbar}
                locale={locale}
                localeResource={localeResource}
                scrollingElementFn={this.editorScrollingElementFn}
                externalToolbar={ExternalToolbar}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderPreview = () => {
    const { contentState, isMobile, locale, localeResource } = this.props;
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
                initialState={contentState}
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
    const { contentState, isMobile, locale, localeResource } = this.props;
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
                initialState={contentState}
                isMobile={this.state.viewerIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
                scrollingElementFn={this.viewerScrollingElementFn}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { contentState, onContentStateChange } = this.props;
    const { isContentStateShown } = this.state;
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
              onChange={onContentStateChange}
              contentState={contentState}
            />
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  setSectionVisibility = (sectionName, isVisible) =>
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
