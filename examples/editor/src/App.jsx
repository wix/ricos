/* eslint-disable */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import { convertFromRaw, convertToRaw, EditorState } from '@wix/draft-js';
import Plugins from './Plugins';

import { CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { EXTERNAL_EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { EXTERNAL_MENTIONS_TYPE } from 'wix-rich-content-plugin-mentions';

import ModalsMap from './ModalsMap';
import { EditorState as RichEditorState, RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import { Button, normalizeInitialState, TOOLBARS } from 'wix-rich-content-common';
import { testImages, testVideos } from './mock';
import './App.css';
import theme from './theme/theme'; // must import after custom styles
import RichContentRawDataViewer from './RichContentRawDataViewer';

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

const anchorTarget = '_blank';
const relValue = 'nofollow';

const uiSettings = {
  blankTargetToggleVisibilityFn: () => true,
  nofollowRelToggleVisibilityFn: () => true
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSave: new Date(),
      editorState: RichEditorState.createEmpty(),
      readOnly: false,
      mounted: true,
      textToolbarType: 'inline',
      showContentStateEditor: false,
      showDevToggles: false,
    };
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
    this.initEditorProps();
  }

  initEditorProps() {
    this.plugins = Plugins;
    this.config = {
      [HASHTAG_TYPE]: {
        createHref: decoratedText =>
          `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
        onClick: (event, text) => {
          event.preventDefault();
          console.log(`'${text}' hashtag clicked!`);
        },
      },
      [HTML_TYPE]: {
        htmlIframeSrc: 'http://localhost:3000/static/html-plugin-embed.html',
        // showInsertButtons: false,
      },
      [EXTERNAL_MENTIONS_TYPE]: {
        onMentionClick: mention => console.log({ mention }),
        getMentions: (searchQuery) => new Promise(resolve =>
          setTimeout(() => resolve([
              { name: searchQuery, slug: searchQuery },
              { name: 'Test One', slug: 'testone' },
              { name: 'Test Two', slug: 'testwo', avatar: 'https://via.placeholder.com/100x100?text=Image=50' },
            ]),
            250),
        ),
      },
      [LINK_TYPE]: { },
      [CODE_BLOCK_TYPE]: { },
      [DIVIDER_TYPE]: { },
      [EXTERNAL_EMOJI_TYPE]: { },
      [GALLERY_TYPE]: { },
      [IMAGE_TYPE]: { },
      [VIDEO_TYPE]: { },
      uiSettings,
      // getToolbarSettings: ({ pluginButtons, textButtons }) => [
      //   {
      //     name: TOOLBARS.SIDE,
      //     getVisibilityFn: () => ({
      //       desktop: () => true,
      //       mobile: {
      //         ios: () => true,
      //         android: () => true,
      //       }
      //     }),
      //   },
      //   {
      //     name: TOOLBARS.MOBILE,
      //     shouldCreate: () => ({
      //       desktop: false,
      //       mobile: {
      //         ios: false,
      //         android: false,
      //       }
      //     }),
      //   },
      //   {
      //     name: TOOLBARS.FOOTER,
      //     getPositionOffset: () => ({
      //       mobile: {
      //         ios: { x: 0, y: 500 },
      //       }
      //     }),
      //     getVisibilityFn: () => ({
      //       desktop: () => false,
      //       mobile: {
      //         ios: () => true,
      //         android: () => true,
      //       }
      //     }),
      //     shouldCreate: () => ({
      //       desktop: () => false,
      //       mobile: {
      //         ios: () => true,
      //         android: () => true,
      //       }
      //     }),
      //     getButtons: () => ({
      //       desktop: () => [],
      //       mobile: {
      //         ios: pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
      //         .map(({ component }) => component),
      //         android: () => [],
      //       }
      //     }),
      //   },
      //   {
      //     name: TOOLBARS.STATIC,
      //     getPositionOffset: () => ({
      //       desktop: { x: 40, y: 40 },
      //       mobile: {
      //         ios: { x: 40, y: 40 },
      //         android: { x: 50, y: 50 },
      //       }
      //     }),
      //     getVisibilityFn: () => ({
      //       desktop: () => false,
      //       mobile: {
      //         ios: () => true,
      //         android: () => true,
      //       }
      //     }),
      //   }
      // ]
    };
    const mockUpload = (files, updateEntity) => {
      //mock upload
      const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      const data = {
        id: testItem.photoId,
        original_file_name: files && files[0] ? files[0].name : testItem.url,
        file_name: testItem.url,
        width: testItem.metadata.width,
        height: testItem.metadata.height,
      };
      setTimeout(() => {
        updateEntity({ data, files });
        console.log('consumer uploaded', data);
      }, 500);
    };
    this.helpers = {
      onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
      // handleFileSelection: (index, multiple, updateEntity, removeEntity) => {
      //   const count = multiple ? [1,2,3] : [1];
      //   const data = [];
      //   count.forEach(_ => {
      //     const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      //     data.push({
      //       id: testItem.photoId,
      //       original_file_name: testItem.url,
      //       file_name: testItem.url,
      //       width: testItem.metadata.width,
      //       height: testItem.metadata.height,
      //     });
      //   })
      //   setTimeout(() => { updateEntity({ data }) }, 500);
      // },
      onVideoSelected: (url, updateEntity) => {
        setTimeout(() => {
          const testVideo = testVideos[Math.floor(Math.random() * testVideos.length)];
          updateEntity(testVideo);
        }, 500);
      },
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        try {
          document.body.style.overflow = document.documentElement.style.overflow = 'hidden';
          document.documentElement.style.height = '100%';
          document.documentElement.style.position = 'relative';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        try {
          document.body.style.overflow = document.documentElement.style.overflow = 'auto';
          document.documentElement.style.height = 'initial';
          document.documentElement.style.position = 'initial';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null,
        });
      },
    };
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.setEditorToolbars();
  }

  setEditor = editor => this.editor = editor;

  setEditorToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  };

  onMountedChange = event => this.setState({ mounted: event.target.checked });

  onTextToolbarTypeChange = event => {
    this.setState({ textToolbarType: event.target.checked ? 'static' : 'inline' }, () => {
      this.setEditorToolbars();
    });
  };

  onReadOnlyChange = event => this.setState({ readOnly: event.target.checked });

  onShowContentStateEditorChange = event => this.setState({ showContentStateEditor: event.target.checked });

  onChange = editorState => {
    this.setState({
      lastSave: new Date(),
      editorState,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };

  isMobile = () => {
    return this.md && this.md.mobile() !== null;
  };

  generateEditorState() {
    if (this.state.content && this.state.content.jsObject) {
      const normalizedState = normalizeInitialState(this.state.content.jsObject, { anchorTarget, relValue });
      const editorState = EditorState.createWithContent(convertFromRaw(normalizedState));
      this.setState({ editorState });
    }
  }

  render() {
    const modalStyles = {
      content: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).content, theme.modalTheme.content),
      overlay: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).overlay, theme.modalTheme.overlay),
    };
    const { showDevToggles } = this.state;

    const { MobileToolbar, TextToolbar } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          {!this.isMobile() &&
          <div className="header">
            <h1 onClick={() => this.setState({ showDevToggles: !showDevToggles })}>Wix Rich Content Editor</h1>
            <div className="toggle-container" style={{ display: this.state.showDevToggles ? 'block' : 'none' }}>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="mountedToggle"
                  onChange={this.onMountedChange}
                  defaultChecked={this.state.mounted}
                />
                <label htmlFor="mountedToggle">Mounted</label>
              </div>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="textToolbarType"
                  onChange={this.onTextToolbarTypeChange}
                  defaultChecked={this.state.textToolbarType === 'static'}
                />
                <label htmlFor="textToolbarType">Static Text Toolbar</label>
              </div>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="readOnlyToggle"
                  onChange={this.onReadOnlyChange}
                  defaultChecked={this.state.readOnly}
                />
                <label htmlFor="readOnlyToggle">Read Only</label>
              </div>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="showContentStateEditorToggle"
                  onChange={this.onShowContentStateEditorChange}
                  defaultChecked={this.state.showContentStateEditor}
                />
                <label htmlFor="showContentStateEditorToggle">Show Content State Editor</label>
              </div>
            </div>
            <span className="intro">
                Last saved on {this.state.lastSave.toTimeString()}
              </span>
          </div>
          }
          {MobileToolbar && <MobileToolbar/>}
          <div className="content">
            {this.state.mounted &&
            <div className="columns">
              <div className="column main">
                {TextToolbar && <TextToolbar/>}
                <RichContentEditor
                  ref={this.setEditor}
                  onChange={this.onChange}
                  helpers={this.helpers}
                  plugins={this.plugins}
                  config={this.config}
                  editorState={this.state.editorState}
                  // initialState={this.state.initialState}
                  readOnly={this.state.readOnly}
                  isMobile={this.isMobile()}
                  textToolbarType={this.state.textToolbarType}
                  theme={theme}
                  editorKey={'random-editorKey-ssr'}
                  anchorTarget={anchorTarget}
                  relValue={relValue}
                />
              </div>
              {this.state.showContentStateEditor &&
              <div className="column side">
                <RichContentRawDataViewer onChange={content => this.setState({ content })}
                                          content={convertToRaw(this.state.editorState.getCurrentContent())} width="740px"/>
                <Button className="raw_input_button submit" theme={theme} onClick={() => this.generateEditorState()}>Apply Rich Content</Button>
              </div>
              }
            </div>
            }
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={modalStyles}
              role="dialog"
              onRequestClose={this.closeModal}
            >
              {this.state.showModal &&
              <RichContentEditorModal
                modalsMap={ModalsMap}
                {...this.state.modalProps}
              />
              }
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
