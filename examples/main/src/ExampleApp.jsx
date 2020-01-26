/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap } from 'lodash';
import { createEmpty, convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import {
  ContentStateEditor,
  ErrorBoundary,
  Fab,
  SectionHeader,
  SectionContent,
} from './Components';
import { generateKey, getStateFromObject, loadStateFromStorage, saveStateToStorage } from './utils';
const Editor = React.lazy(() => import('../shared/editor/Editor'));
const Viewer = React.lazy(() => import('../shared/viewer/Viewer'));
const Preview = React.lazy(() => import('../shared/preview/Preview'));

const getContentStateFromEditorState = editorState => convertToRaw(editorState.getCurrentContent());

class ExampleApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    disableBrowserBackButton();
  }

  getInitialState() {
    const { isMobile } = this.props;
    const containerKey = generateKey('container');
    const localState = loadStateFromStorage();
    const contentState = getContentStateFromEditorState(createEmpty());
    return {
      containerKey,
      contentState,
      isEditorShown: true,
      isViewerShown: !isMobile,
      isPreviewShown: false,
      isContentStateShown: false,
      viewerResetKey: 0,
      previewResetKey: 0,
      editorResetKey: 0,
      shouldMockUpload: true,
      ...localState,
    };
  }

  componentDidMount() {
    window && window.addEventListener('resize', this.onContentStateEditorResize);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  onEditorChange = editorState => {
    this.setState({ contentState: getContentStateFromEditorState(editorState) });
    this.props.onEditorChange && this.props.onEditorChange(editorState);
  };

  setContentStateEditor = ref => (this.contentStateEditor = ref);

  onContentStateEditorChange = obj => {
    if (this.props.onEditorChange) {
      const { editorState } = getStateFromObject(obj);
      this.props.onEditorChange(editorState);
    }
  };

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
    this.props.setLocale && this.props.setLocale(locale);
  };

  renderEditor = () => {
    const { allLocales, editorState, locale, localeResource, isMobile } = this.props;
    const { isEditorShown, staticToolbar, shouldMockUpload, editorIsMobile } = this.state;
    const settings = [
      {
        name: 'Mobile',
        active: editorIsMobile,
        action: () =>
          this.setState(state => ({
            editorIsMobile: !editorIsMobile,
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
    ];
    if (!isMobile) {
      settings.push({
        name: 'Static Toolbar',
        active: staticToolbar,
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      });
      settings.push({
        name: 'Locale',
        active: locale,
        action: selectedLocale => this.onSetLocale(selectedLocale),
        items: allLocales,
      });
    }
    return (
      isEditorShown && (
        <ReflexElement
          key={`editor-section-${this.state.editorResetKey}`}
          className="section editor-example"
        >
          <SectionHeader
            title="Editor"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Editor
                onChange={this.onEditorChange}
                editorState={editorState}
                isMobile={this.state.editorIsMobile || isMobile}
                shouldMockUpload={this.state.shouldMockUpload}
                staticToolbar={staticToolbar}
                locale={locale}
                localeResource={localeResource}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderPreview = () => {
    const { previewState, isMobile, locale, localeResource } = this.props;
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
                initialState={previewState}
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
    const { viewerState, isMobile, locale, localeResource } = this.props;
    const { isViewerShown } = this.state;
    const settings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            viewerIsMobile: !state.viewerIsMobile,
            viewerResetKey: state.viewerResetKey + 1,
          })),
      },
    ];
    return (
      isViewerShown && (
        <ReflexElement
          key={`viewer-section-${this.state.viewerResetKey}`}
          className="section viewer-example"
        >
          <SectionHeader
            title="Viewer"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Viewer
                initialState={viewerState}
                isMobile={this.state.viewerIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { contentState, isContentStateShown } = this.state;
    return (
      isContentStateShown && (
        <ReflexElement
          key="contentstate-section"
          className="section"
          onStopResize={this.onContentStateEditorResize}
        >
          <SectionHeader title="Content State" onHide={this.onSectionVisibilityChange} />
          <SectionContent isLoadedLazily={false}>
            <ContentStateEditor
              ref={this.setContentStateEditor}
              onChange={this.onContentStateEditorChange}
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

function disableBrowserBackButton() {
  (function(global) {
    if (typeof global === 'undefined') {
      throw new Error('window is undefined');
    }

    var _hash = '!';
    var noBackPlease = function() {
      global.location.href += '#';

      // making sure we have the fruit available for juice (^__^)
      global.setTimeout(function() {
        global.location.href += '!';
      }, 50);
    };

    global.onhashchange = function() {
      if (global.location.hash !== _hash) {
        global.location.hash = _hash;
      }
    };

    global.onload = function() {
      noBackPlease();
    };
  })(window);
}

export default hot(ExampleApp);
