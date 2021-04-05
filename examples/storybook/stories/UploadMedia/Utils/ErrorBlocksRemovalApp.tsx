import React, { Component } from 'react';
import { RichContentEditorBox, RichContentViewerBox, Section } from '../../Components/StoryParts';

import contentState from '../../../../../e2e/tests/fixtures/empty.json';
import MediaEditor from './MediaEditor';
import MediaViewer from './MediaViewer';
import { getMediaUploadErrorFunctions } from './upload-functions';
import { DraftContent, RicosEditorType } from 'ricos-editor';

export default class ErrorBlocksRemovalApp extends Component<
  {},
  { isEditing: boolean; content: DraftContent }
> {
  editor: RicosEditorType;

  constructor(props) {
    super(props);
    this.state = { isEditing: true, content: contentState };
  }

  async handleClick() {
    let { isEditing, content } = this.state;
    if (isEditing) {
      const shouldRemoveErrorBlocks = true;
      content = await this.editor.getContent('', false, shouldRemoveErrorBlocks);
    }
    this.setState({ isEditing: !isEditing, content });
  }

  render() {
    const {
      handleFileUpload,
      handleVideoUpload,
      handleImageUpload,
    } = getMediaUploadErrorFunctions();
    const { isEditing, content } = this.state;
    return (
      <>
        <button onClick={this.handleClick.bind(this)}>{isEditing ? 'View' : 'Edit'}</button>
        <Section type={Section.Types.COMPARISON}>
          {isEditing ? (
            <RichContentEditorBox>
              <MediaEditor
                content={content}
                handleFileUpload={handleFileUpload}
                handleVideoUpload={handleVideoUpload}
                handleImageUpload={handleImageUpload}
                ref={ref => (this.editor = ref)}
              />
            </RichContentEditorBox>
          ) : (
            <RichContentViewerBox>
              <MediaViewer content={content} />
            </RichContentViewerBox>
          )}
        </Section>
      </>
    );
  }
}
