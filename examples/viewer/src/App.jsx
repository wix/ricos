import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import {
  RichContentModal,
  mergeStyles,
  Button,
  normalizeInitialState,
} from 'wix-rich-content-common';
import { RichContentViewer } from 'wix-rich-content-viewer';
import RichContentRawDataViewer from './RichContentRawDataViewer';

import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import {
  linkTypeMapper,
  LinkViewer,
  LinkParseStrategy,
  LINK_TYPE,
} from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';

import { Strategy as HashTagStrategy, Component as HashTag } from 'wix-rich-content-plugin-hashtag';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/module.viewer';

import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';

import TestData from './TestData/initial-state';
import styles from './App.scss';
import theme from './theme/theme';

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

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

const anchorTarget = '_top';
const relValue = 'noreferrer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: TestData.onlyText,
    };
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
    this.initViewerProps();
    this.styles = mergeStyles({ styles, theme });

    this.typeMappers = [
      videoTypeMapper,
      dividerTypeMapper,
      htmlTypeMapper,
      linkTypeMapper,
      soundCloudTypeMapper,
      mentionsTypeMapper,
      imageTypeMapper,
    ];

    this.config = {
      [HEADERS_MARKDOWN_TYPE]: {
        hideMarkdown: true,
      },
      [HTML_TYPE]: {
        htmlIframeSrc: 'http://localhost:3001/static/html-plugin-embed.html',
      },
      [LINK_TYPE]: linkPluginSettings,
      [MENTION_TYPE]: mentionsPluginSettings,
    };

    this.decorators = [
      {
        strategy: LinkParseStrategy,
        component: ({ children, decoratedText, rel, target }) => (
          <LinkViewer
            componentData={{ rel, target, url: decoratedText }}
            anchorTarget={anchorTarget}
            relValue={relValue}
            settings={linkPluginSettings}
          >
            {children}
          </LinkViewer>
        ),
      },
      {
        strategy: HashTagStrategy,
        component: ({ children, decoratedText }) => (
          <HashTag
            theme={theme}
            onClick={this.onHashTagClick}
            createHref={this.createHref}
            decoratedText={decoratedText}
          >
            {children}
          </HashTag>
        ),
      },
      new CodeBlockDecorator({ theme }),
      createHeadersMarkdownDecorator(this.config),
    ];
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

  /* eslint-disable no-console */
  handleContentChange = () => {
    const value = document.getElementById('testData').value;
    this.setState({
      raw: TestData[value],
    });
    //console.log('on change are', TestData[value]);
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
    console.log(`'${text}' hashtag clicked!`);
  };

  createHref = decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`;

  render() {
    const contentOptions = Object.keys(TestData).map(key => (
      <option value={key} key={key}>
        {' '}
        {key}
      </option>
    ));

    const { styles } = this;

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
                  >
                    {contentOptions}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <select id="testData" name="testData" onChange={() => this.handleContentChange(this)}>
              {contentOptions}
            </select>
          )}
          <div className={styles.content}>
            <div className={styles.columns}>
              <div className={styles.column}>
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
              </div>
              {!this.isMobile() && (
                <div className={styles.column}>
                  <RichContentRawDataViewer
                    onChange={content => this.setState({ content })}
                    content={this.state.raw}
                    width="740px"
                  />
                  <Button
                    className={styles.raw_input_button}
                    theme={theme}
                    onClick={() => this.generateViewerState()}
                  >
                    Apply Rich Content
                  </Button>
                </div>
              )}
            </div>
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
  }
}

export default App;
