/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import {
  ContentStateEditor,
  ErrorBoundary,
  Fab,
  SectionHeader,
  SectionContent,
} from './Components';
import {
  generateKey,
  getStateFromObject,
  getRequestedLocale,
  isMobile,
  loadStateFromStorage,
  saveStateToStorage,
} from './utils';
const Editor = React.lazy(() => import('./editor/Editor'));
const Viewer = React.lazy(() => import('./viewer/Viewer'));
const Preview = React.lazy(() => import('./preview/Preview'));

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.isMobile = isMobile();
    this.state = this.getInitialState();
    const locale = getRequestedLocale();
    if (locale !== 'en') {
      this.setLocale(locale);
    }
  }

  getInitialState() {
    const containerKey = generateKey('container');
    const editorState = createEmpty();
    const localState = loadStateFromStorage();
    return {
      containerKey,
      editorState,
      isEditorShown: true,
      isViewerShown: !this.isMobile,
      isPreviewShown: !this.isMobile,
      isContentStateShown: false,
      viewerResetKey: 0,
      previewResetKey: 0,
      editorResetKey: 0,
      ...localState,
    };
  }

  componentDidMount() {
    window && window.addEventListener('resize', this.onContentStateEditorResize);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  setContentStateEditor = ref => (this.contentStateEditor = ref);

  onContentStateEditorChange = obj => {
    this.setState(getStateFromObject(obj));
  };

  onContentStateEditorResize = () =>
    this.contentStateEditor && this.contentStateEditor.refreshLayout();

  onEditorChange = editorState => this.setState({ editorState });

  onSectionVisibilityChange = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };

  setLocale = locale => {
    import(`wix-rich-content-editor/statics/locale/messages_${locale}.json`).then(localeResource =>
      this.setState({ locale, localeResource: localeResource.default })
    );
  };

  renderEditor = () => {
    const {
      isEditorShown,
      editorState,
      editorIsMobile,
      staticToolbar,
      locale,
      localeResource,
    } = this.state;
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
    ];
    if (!isMobile()) {
      settings.push({
        name: 'Static Toolbar',
        active: staticToolbar,
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      });
      settings.push({
        name: 'Locale',
        active: locale,
        action: selectedLocale => this.setLocale(selectedLocale),
        items: this.props.allLocales,
      });
    }
    return (
      isEditorShown && (
        <ReflexElement key={`editor-section-${this.state.viewerResetKey}`} className="section">
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
                isMobile={this.state.editorIsMobile || this.isMobile}
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
    const { isPreviewShown, editorState } = this.state;
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
    const previewState = JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))); //emulate initilState passed in by consumers
    return (
      isPreviewShown && (
        <ReflexElement key={`preview-section-${this.state.previewResetKey}`} className="section">
          <SectionHeader
            title="Preview"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Preview
                initialState={previewState}
                isMobile={this.state.previewIsMobile || this.isMobile}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderViewer = () => {
    const { isViewerShown, editorState } = this.state;
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
    const viewerState = JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))); //emulate initilState passed in by consumers
    return (
      isViewerShown && (
        <ReflexElement key={`viewer-section-${this.state.viewerResetKey}`} className="section">
          <SectionHeader
            title="Viewer"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Viewer
                initialState={viewerState}
                isMobile={this.state.viewerIsMobile || this.isMobile}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { isContentStateShown, editorState } = this.state;
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
              contentState={convertToRaw(editorState.getCurrentContent())}
            />
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  setSectionVisibility = (sectionName, isVisible) =>
    this.setState({ [`show${sectionName}`]: isVisible });

  renderSections = () => {
    const sections = compact([this.renderEditor(), this.renderViewer(), this.renderPreview(), this.renderContentState()]);

    return flatMap(sections, (val, i, arr) =>
      arr.length - 1 !== i
        ? [val, <ReflexSplitter className="splitter" propagate={true} key={`splitter-${i}`} />]
        : val
    );
  };

  render() {
    const { isEditorShown, isViewerShown, isContentStateShown, isPreviewShown } = this.state;
    const showEmptyState = !isEditorShown && !isViewerShown && !isContentStateShown && !isPreviewShown;

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
          isMobile={this.isMobile}
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

export default hot(App);
