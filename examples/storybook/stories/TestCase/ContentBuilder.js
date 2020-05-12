import React, { useState } from 'react';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import { Input, Button, Container, Row, FormField, Dropdown } from 'wix-style-react';
import { RichContentEditorBox, ContentState, Section, Page } from '../Components/StoryParts';

import ContentStateBuilder from 'wix-rich-content-common/dist/lib/ContentStateBuilder';

const { Alignments, Sizes } = ContentStateBuilder;
const { CENTER, LEFT, RIGHT } = Alignments;
const { ORIGINAL, INLINE, SMALL, BEST_FIT, FULL_WIDTH } = Sizes;

import EditorWrapper from '../Components/EditorWrapper';

const contentStateObject = new ContentStateBuilder();
import { wixPalettes } from '../palettesExample';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

const PLUGINS = [createImagePlugin, createDividerPlugin];

export default () => {
  const [contentState, setContentState] = useState(contentStateObject.getContent());
  const [textInput, setTextInput] = useState('');
  const [dividerType, setDividerType] = useState('single');

  const updateContent = () => {
    setContentState(contentStateObject.getContent());
  };
  const addText = text => {
    contentStateObject.addText(text);
    updateContent();
    setTextInput('');
  };

  const addImage = () => {
    const imageSrc = {
      filename: '8bb438_095b661d7d2549efbde6b6e981eeb90b.jpg',
      width: 2557,
      height: 1700,
    };
    const imageConfig = {
      alignment: CENTER,
      size: BEST_FIT,
      showTitle: true,
      showDescription: true,
    };

    contentStateObject.addImage(imageSrc, imageConfig);
    updateContent();
  };

  const addDivider = () => {
    contentStateObject.appendBlock(ContentStateBuilder.createDividerBlock(dividerType));
    updateContent();
  };
  const editorState = createWithContent(convertFromRaw(contentState));

  return (
    <Page title="Content Builder">
      <Section type={Section.Types.COMPARISON}>
        <Container fluid>
          <Row>
            <FormField label="Text">
              <Input onChange={e => setTextInput(e.target.value)} value={textInput} />
            </FormField>
            <Button onClick={() => addText(textInput)}>Add</Button>
          </Row>
          <Row>
            <FormField label="Divider">
              <Dropdown
                placeholder="Select an option"
                onSelect={({ value }) => setDividerType(value)}
                options={[
                  { id: 0, value: 'single' },
                  { id: 1, value: 'double' },
                  { id: 2, value: 'dashed' },
                  { id: 3, value: 'dotted' },
                ]}
              />
              <Button onClick={() => addDivider()}>Add</Button>
            </FormField>
          </Row>
          <Row>
            <FormField label="Image">
              <Button onClick={() => addImage()}>Add</Button>
            </FormField>
          </Row>
        </Container>
        <RichContentEditorBox preset="blog-preset">
          <RichContentEditor editorState={editorState} plugins={PLUGINS} />
        </RichContentEditorBox>
      </Section>
      <Section title={'RCE With wrapper'}>
        <RichContentEditorBox preset="blog-preset">
          <EditorWrapper contentState={contentState} palette={wixPalettes.site1} />
        </RichContentEditorBox>
      </Section>

      <Section title="Content State">
        <ContentState json={contentState} />
      </Section>
    </Page>
  );
};
