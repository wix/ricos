/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import MobileDetect from 'mobile-detect';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import { normalizeInitialState } from 'wix-rich-content-common';
import './App.css';
import RichContentRawDataEditor from './RichContentRawDataEditor';
const Editor = React.lazy(() => import('./editor/Editor'));
const Viewer = React.lazy(() => import('./viewer/Viewer'));
import Resizable from 're-resizable';
import startCase from 'lodash/startCase';
import local from 'local-storage';

// const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
// whyDidYouRender(React, { include: [/.*/], exclude: [/Decor|JSONI/] });

const anchorTarget = '_top';
const relValue = 'noreferrer';
function Checkbox({ name, onChange, ...inputProps }) {
  const handleChange = e => onChange(name, e.target.checked);
  return (
    <label>
      <input type="checkbox" onChange={handleChange} {...inputProps} />
      {startCase(name)}
    </label>
  );
}

const checkBoxes = [
  'editor',
  'viewer',
  'contentStateEditor',
  'mounted',
  'staticToolbar',
  'mobile',
  'readOnly',
];
const mobileCheckBoxes = ['editor', 'viewer'];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastSave: new Date(),
      editorState: EditorState.createEmpty(),
      mounted: true,
      contentStateEditor: true,
      showDevToggles: true,
      editor: true,
      viewer: true,
      ...this.getLocalStorageState(),
    };
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
  }

  getLocalStorageState() {
    const state = {};
    [...checkBoxes, 'contentWidth'].forEach(key => {
      let val = local.get(key);
      if (val !== null) {
        state[key] = val;
      }
    });
    return state;
  }

  setViewerState = editorState => {
    const content = editorState.getCurrentContent();
    if (content !== this.state.editorState.getCurrentContent()) {
      this.setState({ viewerState: convertToRaw(content) });
    }
  };

  onEditorChange = editorState => {
    const state = {
      lastSave: new Date(),
      editorState,
    };
    this.setState(state);
    this.setViewerState(editorState);
  };

  isMobileDevice = () => {
    return this.md && this.md.mobile() !== null;
  };

  onRichContentRawDataEditorChange = obj => {
    this.setState(this.convertJsObject(obj));
  };

  convertJsObject(obj) {
    const normalizedState = normalizeInitialState(obj, {
      anchorTarget,
      relValue,
    });
    const editorState = EditorState.createWithContent(convertFromRaw(normalizedState));
    return { editorState, viewerState: normalizedState };
  }

  onCheckBoxChange = (name, checked) => {
    this.setState({ [name]: checked });
    local.set(name, checked);
  };

  render() {
    const {
      showDevToggles,
      mobile: simulateMobile,
      editor: showEditor,
      viewer: showViewer,
      contentStateEditor: showContentStateEditor,
    } = this.state;
    const isMobileDevice = this.isMobileDevice();
    const isMobile = simulateMobile || isMobileDevice;
    const editor = (
      <Suspense fallback={<div>Loading...</div>}>
        <Editor
          onChange={this.onEditorChange}
          editorState={this.state.editorState}
          readOnly={this.state.readOnly}
          isMobile={isMobile}
          staticToolbar={this.state.staticToolbar}
        />
      </Suspense>
    );
    const viewer = (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Viewer initialState={this.state.viewerState} mobile={isMobile} config={this.config} />
        </ErrorBoundary>
      </Suspense>
    );
    const checkBoxComponents = (isMobileDevice ? mobileCheckBoxes : checkBoxes).map((name, i) => (
      <div className="toggle" key={i}>
        <Checkbox name={name} checked={this.state[name]} onChange={this.onCheckBoxChange} />
      </div>
    ));
    return (
      <div className="wrapper">
        <div className="container">
          {!isMobileDevice && (
            <div className="header">
              <h1 onClick={() => this.setState({ showDevToggles: !showDevToggles })}>
                Wix Rich Content Editor
              </h1>
              <div
                className="toggle-container"
                style={{ display: this.state.showDevToggles ? 'block' : 'none' }}
              >
                {checkBoxComponents}
              </div>
              <span className="intro">Last saved on {this.state.lastSave.toTimeString()}</span>
            </div>
          )}
          <div className="content">
            {this.state.mounted && (
              <div className="columns">
                {isMobileDevice ? (
                  <div className={'mobileDevice'} style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>{checkBoxComponents}</div>
                    {showEditor && editor}
                    {showViewer && viewer}
                  </div>
                ) : (
                  <Resizable
                    onResize={(event, direction, { clientWidth }) =>
                      local.set('contentWidth', clientWidth)
                    }
                    defaultSize={{ width: this.state.contentWidth || '85%' }}
                    className={'resizable'}
                  >
                    {showEditor && editor}
                    {showViewer && viewer}
                  </Resizable>
                )}
                {showContentStateEditor && !isMobileDevice && (
                  <div className="column side">
                    <RichContentRawDataEditor
                      onChange={this.onRichContentRawDataEditorChange}
                      content={convertToRaw(this.state.editorState.getCurrentContent())}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  retry = () => {
    this.setState({ error: undefined });
  };

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ whiteSpace: 'pre-wrap', marginLeft: '5px' }}>
          <h1> oh oh :(</h1>
          <button style={{ fontSize: '20px', background: 'aliceblue' }} onClick={this.retry}>
            Retry
          </button>
          <p>Look for more info in the console</p>
          <p>{error + info.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default hot(App);
