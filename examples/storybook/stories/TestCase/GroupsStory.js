/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import cx from 'classnames';
import InitialIntentToolbar from '../Components/InitialIntentToolbar';
import { Page } from '../Components/StoryParts';
import { wixPalettes } from '../palettesExample';
import firstContent from '../../../../e2e/tests/fixtures/plain.json';
import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
import s from './GroupsStory.scss';
import { TOOLBARS } from 'wix-rich-content-editor-common';

const GropusPlugins = ['image', 'gallery', 'video', 'gif', 'fileUpload', 'emoji', 'undoRedo'];

let editor;

export default () => {
  const [modalState, setModal] = useState(false);
  const [saveContents, setContents] = useState([firstContent]);
  const [currentContent, setCurrentContent] = useState(null);

  const closeModal = () => {
    setCurrentContent({});
    setModal(false);
  };

  const publish = () => {
    setContents([{ ...(currentContent || {}) }, ...saveContents]);
    closeModal();
  };

  const Modal = (
    <div className={cx(s.modalContainer, { [s.hidden]: !modalState })}>
      <div className={s.ricosContainer}>
        <div className={s.header}>
          <div className={s.avatar} />
          <div className={s.username}>Musa</div>
          <div className={s.x} onClick={closeModal}>
            X
          </div>
        </div>
        <EditorWrapper
          ref={ref => (editor = ref)}
          palette={wixPalettes.site1}
          onChange={setCurrentContent}
          content={currentContent}
          pluginsToDisplay={GropusPlugins}
          toolbarSettings={{
            getToolbarSettings: () => {
              return [
                {
                  name: 'SIDE',
                  shouldCreate: () => ({
                    desktop: false,
                    mobile: false,
                  }),
                },
                {
                  name: TOOLBARS.INSERT_PLUGIN,
                  shouldCreate: () => ({ desktop: true }),
                  getButtons: () => ({
                    desktop: [
                      'ImagePlugin_InsertButton',
                      'VideoPlugin_InsertButton',
                      'GIFPlugin_InsertButton',
                    ],
                  }),
                },
              ];
            },
          }}
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

  const posts = saveContents.map(content => [
    <div className={cx(s.box, s.post)} key="firstone">
      <div className={s.postHeader}>
        <div className={s.avatar} />
        <div className={s.details}>
          <div>Musa </div>
          <div>5 Minutes ago</div>
        </div>
      </div>
      <ViewerWrapper
        content={content}
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
                <InitialIntentToolbar
                  onClick={() => setModal(true)}
                  {...(editor && editor.getToolbarProps(TOOLBARS.INSERT_PLUGIN))}
                />
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
