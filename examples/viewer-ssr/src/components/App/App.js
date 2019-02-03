import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import { RichContentModal, mergeStyles, normalizeInitialState } from 'wix-rich-content-common';

import { RichContentViewer } from 'wix-rich-content-viewer';

import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer.cjs';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer.cjs';
import {
  linkTypeMapper,
  LinkViewer,
  LinkParseStrategy,
} from 'wix-rich-content-plugin-link/dist/module.viewer.cjs';
import { Strategy as HashTagStrategy, Component as HashTag } from 'wix-rich-content-plugin-hashtag';

import TestData from './TestData/initial-state';

import theme from './theme/theme';
import styles from './App.scss';

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const anchorTarget = '_top';
const relValue = 'noreferrer';

const INITIAL_TEST_DATA_KEY = 'onlyText';

class App extends Component {
  constructor(props) {
    super(props);
    this.md = null;
    try {
      this.md = new MobileDetect(window.navigator.userAgent);
    } catch (e) {}
    this.initViewerProps();
    this.styles = mergeStyles({ styles, theme });
    this.state = {
      testDataKey: INITIAL_TEST_DATA_KEY,
      raw: TestData[INITIAL_TEST_DATA_KEY],
    };

    this.typeMappers = [videoTypeMapper, dividerTypeMapper, htmlTypeMapper, linkTypeMapper];

    this.decorators = [
      {
        strategy: HashTagStrategy,
        component: ({ children, decoratedText }) =>
          children.map((child, i) => (
            <HashTag
              key={i}
              decoratedText={decoratedText}
              theme={theme}
              onClick={this.onHashTagClick}
              createHref={this.createHref}
            >
              {child}
            </HashTag>
          )),
      },
      {
        strategy: LinkParseStrategy,
        component: ({ children, decoratedText, rel, target }) =>
          children.map((child, i) => (
            <LinkViewer
              key={i}
              componentData={{ rel, target, url: decoratedText }}
              anchorTarget={anchorTarget}
              relValue={relValue}
            >
              {child}
            </LinkViewer>
          )),
      },
    ];

    this.config = {
      [HTML_TYPE]: {
        htmlIframeSrc: 'http://localhost:3001/static/html-plugin-embed.html',
      },
    };
  }

  initViewerProps() {
    this.helpers = {};
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };

  handleContentChange = () => {
    const value = document.getElementById('testData').value;
    this.setState({
      testDataKey: value,
      raw: TestData[value],
    });
  };

  isMobile = () => {
    return this.md && this.md.mobile() !== null;
  };

  generateViewerState() {
    if (this.state.content && this.state.content.jsObject) {
      const normalizedState = normalizeInitialState(this.state.content.jsObject, {
        anchorTarget,
        relValue,
      });
      this.setState({ raw: normalizedState });
    }
  }

  onHashTagClick = (event, text) => {
    event.preventDefault();
    console.log(`'${text}' hashtag clicked!`); // eslint-disable-line no-console
  };

  createHref = decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`;

  render() {
    const contentOptions = Object.keys(TestData).map(key => (
      <option value={key} key={key}>
        {key}
      </option>
    ));

    const { styles } = this;
    /* eslint-disable jsx-a11y/no-onchange */
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {!this.isMobile() ? (
            <div className={styles.header}>
              <h1>Wix Rich Content Viewer</h1>
              <div className={styles['toggle-container']}>
                <div className={styles.toggle}>
                  <select
                    id="testData"
                    name="testData"
                    onChange={() => this.handleContentChange(this)}
                    value={this.state.testDataKey}
                  >
                    {contentOptions}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <select
              id="testData"
              name="testData"
              onChange={() => this.handleContentChange(this)}
              value={this.state.testDataKey}
            >
              {contentOptions}
            </select>
          )}
          <div className={styles.content}>
            <RichContentViewer
              helpers={this.helpers}
              typeMappers={this.typeMappers}
              decorators={this.decorators}
              initialState={this.state.raw}
              theme={theme}
              isMobile={this.isMobile()}
              anchorTarget={anchorTarget}
              relValue={relValue}
              config={this.config}
            />
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={this.state.modalStyles || modalStyleDefaults}
              onRequestClose={this.closeModal}
            >
              {this.state.showModal && <RichContentModal {...this.state.modalProps} />}
            </ReactModal>
          </div>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-onchange */
  }
}

export default App;
