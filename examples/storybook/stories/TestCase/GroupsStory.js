/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { debounce } from 'lodash';
import cx from 'classnames';
import { convertToRaw } from 'wix-rich-content-editor';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';
import VideoCamera from 'wix-ui-icons-common/VideoCamera';

import { Page } from '../Components/StoryParts';
import { wixPalettes } from '../palettesExample';
import firstContentState from '../../../../e2e/tests/fixtures/plain.json';
import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
import s from './GroupsStory.scss';

const GropusPlugins = ['image', 'gallery', 'video', 'gif', 'fileUpload', 'emoji'];
export default () => {
  const [modalState, setModal] = useState(false);
  const [saveContentStates, setContantStates] = useState([firstContentState]);
  const [currentContentState, setCurrentContentState] = useState(null);

  const closeModal = () => {
    setCurrentContentState(false);
    setModal(false);
  };

  const publish = () => {
    setContantStates([{ ...(currentContentState || {}) }, ...saveContentStates]);
    closeModal();
  };

  const onChange = editorState =>
    setCurrentContentState(convertToRaw(editorState.getCurrentContent()));

  const Modal = modalState && (
    <div className={s.modalContainer}>
      <div className={s.ricosContainer}>
        <div className={s.header}>
          <div className={s.avatar} />
          <div className={s.username}>Musa</div>
          <div className={s.x} onClick={closeModal}>
            X
          </div>
        </div>
        <EditorWrapper
          //   contentState={contentState}
          palette={wixPalettes.site1}
          onChange={onChange}
          contentState={currentContentState}
          pluginsToDisplay={GropusPlugins}
        />
        <div className={s.footer}>
          <div onClick={closeModal} className={cx(s.button, s.cancel)}>
            Cancel
          </div>
          <div onClick={publish} className={cx(s.button, s.publish)}>
            Publish
          </div>
        </div>
      </div>
    </div>
  );

  const posts = saveContentStates.map(contentState => [
    <div className={cx(s.box, s.post)} key="firstone">
      <div className={s.postHeader}>
        <div className={s.avatar} />
        <div className={s.details}>
          <div>Musa </div>
          <div>5 Minutes ago</div>
        </div>
      </div>
      <ViewerWrapper
        contentState={contentState}
        palette={wixPalettes.site1}
        pluginsToDisplay={GropusPlugins}
      />
    </div>,
  ]);

  return (
    <Page title="Groups Example">
      <div className={s.root}>
        {Modal}
        <div className={s.groupsContainer}>
          <h2>Welcome to my group!</h2>
          <div className={s.columns}>
            <div className={s.columnA}>
              <div className={cx(s.shareSomething, s.box)} onClick={() => setModal(true)}>
                <div className={s.avatar} />
                <div className={s.placeHolder}>Share something...</div>
                <div className={cx(s.iconButton, s.camera)}>
                  <PhotoCamera />
                </div>
                <div className={cx(s.iconButton, s.video)}>
                  <VideoCamera />
                </div>
                <div className={cx(s.iconButton, s.gif)}>GIF</div>
              </div>

              {posts}
            </div>
            <div className={cx(s.columnB, s.box)}>
              <div>
                <h3>About</h3>
                <p>This is Ricos simulation of Groups layout & behavior</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
