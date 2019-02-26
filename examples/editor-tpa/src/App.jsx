import React, { Component } from 'react';
import logo from './logo.svg';
import TestData from './TestData/initialState';
import { RichContentEditor } from 'wix-rich-content-editor';
import * as helpers from './helpers';
import { ReactHeight } from 'react-height';
import Styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { lastSave: new Date(), readOnly: false };
  }
  setEditor = editor => (this.editor = editor);

  onChange = editorState => {
    //TODO: this is the place where we want to auto-save
    this.setState({ lastSave: new Date() });
  };

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.readOnly !== 'undefined') {
      this.setState(this.setState({ readOnly: nextProps.readOnly }));
    }
  }

  componentDidMount() {
    this.lastHeight = 0;
    setInterval(() => {
      const component = document.getElementById('content-wrapper');
      if (component) {
        const height = component.scrollHeight;
        if (this.lastHeight !== height) {
          this.lastHeight = height;
          Wix.setHeight(height);
        }
      }
    }, 1000);
  }

  _getModalPointer = () => {
    for (let i = 0; i < window.parent.frames.length; i++) {
      try {
        if (window.parent.frames[i].location.pathname === '/modal.html') {
          return window.parent.frames[i];
        }
      } catch (e) {
        //console.log('catch '+ i);
      }
    }
  };

  setHeight(height) {
    console.log('Got new height', height);
    Wix.setHeight(height);
  }

  render() {
    return (
      <ReactHeight id="content-wrapper" onHeightReady={this.setHeight}>
        <div className={Styles.app}>
          <div className={Styles.appHeader}>
            <img src={logo} className={Styles.appLogo} alt="logo" />
            <h2>Welcome to Wix Rich-Content</h2>
            <h3>Last saved on {this.state.lastSave.toTimeString()}</h3>
            <div>
              <label htmlFor="readOnly">read only mode</label>
              <input
                type="checkbox"
                checked={this.state.readOnly}
                id="readOnly"
                onChange={event => this.setState({ readOnly: event.target.checked })}
              />
              <output htmlFor="readOnly" id="readOnlyVal">
                {this.state.readOnly}
              </output>
            </div>
          </div>
          <div className={Styles.appIntro}>
            <RichContentEditor
              ref={this.setEditor}
              initialState={TestData}
              onChange={this.onChange}
              helpers={helpers}
              handleFileSelection={false}
              readOnly={this.state.readOnly}
            />
          </div>
        </div>
      </ReactHeight>
    );
  }
}

export default App;
