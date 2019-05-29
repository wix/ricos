/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { Container, Bar } from 'react-simple-resizer';
import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';
import { convertToRaw, EditorState } from '@wix/draft-js';
import { ContentStateEditor, ErrorBoundary, Fab, Section } from './Components';
import { generateKey, isMobile, loadStateFromStorage, saveStateToStorage } from './utils';
const Editor = React.lazy(() => import('./editor/Editor'));
const Viewer = React.lazy(() => import('./viewer/Viewer'));

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.isMobile = isMobile();
    this.state = this.getInitialState();
  }

  getInitialState() {
    const containerKey = generateKey('container');
    const editorState = EditorState.createEmpty();
    const localState = loadStateFromStorage();
    if (localState) {
      return { containerKey, editorState, ...JSON.parse(localState) };
    } else {
      return {
        containerKey,
        editorState,
        isEditorShown: true,
        isViewerShown: !this.isMobile,
        isContentStateShown: false,
      };
    }
  }

  componentDidMount() {
    window && window.addEventListener('resize', () => this.onContentStateEditorResize());
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize');
  }

  setContentStateEditor = ref => (this.contentStateEditor = ref);

  setViewerState = editorState => {
    const content = editorState.getCurrentContent();
    if (content !== this.state.editorState.getCurrentContent()) {
      this.setState({ viewerState: JSON.parse(JSON.stringify(convertToRaw(content))) });
    }
  };

  onContentStateEditorChange = obj => {
    this.setState(getStateFromObject(obj));
  };

  onContentStateEditorResize = () =>
    this.contentStateEditor && this.contentStateEditor.refreshLayout();

  onEditorChange = editorState => {
    const state = {
      editorState,
    };
    this.setState(state);
    this.setViewerState(editorState);
  };

  onSectionSizeChanged = (sectionName, size) => {
    this.setState({ [`${sectionName}Size`]: size }, () => saveStateToStorage(this.state));
    if (sectionName === 'contentState') {
      this.onContentStateEditorResize();
    }
  };

  onSectionVisibilityChange = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };

  renderEditor = () => {
    const { isEditorShown, editorSize, editorState, staticToolbar } = this.state;
    const settings = [];
    if (!isMobile()) {
      settings.push({
        name: 'Static Toolbar',
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      });
    }
    return (
      isEditorShown && (
        <Section
          title="Editor"
          key="editor-section"
          settings={settings}
          defaultSize={editorSize}
          onHide={this.onSectionVisibilityChange}
          onSizeChanged={size => this.onSectionSizeChanged('editor', size)}
        >
          <Editor
            onChange={this.onEditorChange}
            editorState={editorState}
            isMobile={this.isMobile}
            staticToolbar={staticToolbar}
          />
        </Section>
      )
    );
  };

  renderViewer = () => {
    const { isViewerShown, viewerSize, viewerState } = this.state;
    return (
      isViewerShown && (
        <Section
          title="Viewer"
          key="viewer-section"
          defaultSize={viewerSize}
          onHide={this.onSectionVisibilityChange}
          onSizeChanged={size => this.onSectionSizeChanged('viewer', size)}
        >
          <ErrorBoundary>
            <Viewer initialState={viewerState} isMobile={this.isMobile} />
          </ErrorBoundary>
        </Section>
      )
    );
  };

  renderContentState = () => {
    const { isContentStateShown, contetStateSize, editorState } = this.state;
    return (
      isContentStateShown && (
        <Section
          title="Content State"
          key="contentstate-section"
          defaultSize={contetStateSize}
          onHide={this.onSectionVisibilityChange}
          onSizeChanged={size => this.onSectionSizeChanged('contentState', size)}
        >
          <ContentStateEditor
            ref={this.setContentStateEditor}
            onChange={this.onContentStateEditorChange}
            contentState={convertToRaw(editorState.getCurrentContent())}
          />
        </Section>
      )
    );
  };

  setSectionVisibility = (sectionName, isVisible) =>
    this.setState({ [`show${sectionName}`]: isVisible });

  renderSections = () => {
    const sections = compact([this.renderEditor(), this.renderViewer(), this.renderContentState()]);

    return flatMap(sections, (val, i, arr) =>
      arr.length - 1 !== i ? [val, <Bar size={5} className="bar" key={`bar-${i}`} />] : val
    );
  };

  render() {
    const { containerKey, isEditorShown, isViewerShown, isContentStateShown } = this.state;
    const showEmptyState = !isEditorShown && !isViewerShown && !isContentStateShown;

    return (
      <div className="wrapper">
        <Container key={containerKey} className="container">
          {showEmptyState ? (
            <div className="empty-state">Add a Section</div>
          ) : (
            this.renderSections()
          )}
        </Container>
        <Fab
          isMobile={this.isMobile}
          isEditorShown={isEditorShown}
          isViewerShown={isViewerShown}
          isContentStateShown={isContentStateShown}
          toggleSectionVisibility={this.onSectionVisibilityChange}
        />
      </div>
    );
  }
}

export default hot(App);
