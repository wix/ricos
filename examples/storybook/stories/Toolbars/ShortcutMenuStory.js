import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, MultiSelectCheckbox, Checkbox } from 'wix-style-react';

export default () => {
  class ShortcutMenuStory extends Component {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0, selectedPlugins: ['all'] };
    }

    getCheckbox = () => {
      const configOptions = ['splitToSections', 'showSearch'];
      const { editorKey } = this.state;
      return configOptions.map(option => (
        <Box padding="3px" key={option}>
          <Checkbox
            checked={this.state[option]}
            onChange={() =>
              this.setState({ [option]: !this.state[option], editorKey: editorKey + 1 })
            }
          >
            {option}
          </Checkbox>
        </Box>
      ));
    };

    onSelect = option => {
      const { selectedPlugins, editorKey } = this.state;
      console.log('in option', option);
      const newPlugins = option === 'all' ? [] : selectedPlugins.filter(item => item !== 'all');
      this.setState({
        selectedPlugins: [...newPlugins, option],
        editorKey: editorKey + 1,
      });
    };

    onDeselect = option =>
      this.setState({
        selectedPlugins: this.state.selectedPlugins.filter(item => item !== option),
        editorKey: this.state.editorKey + 1,
      });

    getPluginsSelection = () => {
      const { selectedPlugins } = this.state;
      return (
        <Box padding="3px" align="space-between" maxWidth="440px">
          Plugins to displsy in shortcut:
          <MultiSelectCheckbox
            size="small"
            options={[
              { value: 'all', id: 'all' },
              { value: 'button', id: 'ButtonPlugin_InsertButton' },
              { value: 'codeBlock', id: 'CodeblockPlugin_InsertButton' },
              { value: 'divider', id: 'DividerPlugin_InsertButton' },
              { value: 'fileUpload', id: 'UploadFilePlugin_InsertButton' },
              { value: 'gallery', id: 'GalleryPlugin_InsertButton' },
              { value: 'gif', id: 'GIFPlugin_InsertButton' },
              { value: 'html', id: 'HTMLCodePlugin_InsertButton' },
              { value: 'image', id: 'ImagePlugin_InsertButton' },
              { value: 'map', id: 'MapPlugin_InsertButton' },
              { value: 'soundCloud', id: 'SoundcloudPlugin_InsertButton' },
              { value: 'video', id: 'VideoPlugin_InsertButton' },
              { value: 'socialEmbed', id: 'socialEmbed' },
              { value: 'verticalEmbed', id: 'verticalEmbed' },
              { value: 'emoji', id: 'EmojiPlugin_InsertButton' },
              { value: 'undo', id: 'UndoPlugin_InsertButton' },
              { value: 'redo', id: 'RedoPlugin_InsertButton' },
            ]}
            selectedOptions={selectedPlugins}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
          />
        </Box>
      );
    };

    getEditor = key => {
      const { showSearch, splitToSections, selectedPlugins } = this.state;
      const footerToolbarConfig = {
        showSearch,
        splitToSections,
        displayPlugins: !selectedPlugins.includes('all') && selectedPlugins,
      };

      const getToolbarSettings = () => [{ name: 'FOOTER', footerToolbarConfig }];
      const editorWrapperProps = {
        content: emptyContentState,
        toolbarSettings: { getToolbarSettings },
      };
      if (key) {
        editorWrapperProps.key = key;
      }
      return <EditorWrapper {...editorWrapperProps} />;
    };

    render() {
      const { editorKey } = this.state;
      return (
        <Page title="Plugin Menu">
          <Section>
            {this.getPluginsSelection()}
            <h3>Footer Toolbar Config:</h3>
            {this.getCheckbox()}
            <Section>
              <RichContentEditorBox>{this.getEditor(editorKey)}</RichContentEditorBox>
            </Section>
            <div>
              Note: defaults for unset fields are:
              <ul>
                <li>displayPlugins - 8 plugins with default soted order.</li>
                <li>
                  addMorePlugin - TRUE if there are more then 10 plugins consumed, 8 plugins will
                  remain outside, and the rest shoud be under 'More +', in the same order of the
                  plugin menu
                </li>
                <li>showSearch - off by default. </li>
                <li>splitToSections - on by default.</li>
              </ul>
            </div>
          </Section>
        </Page>
      );
    }
  }
  return <ShortcutMenuStory />;
};
