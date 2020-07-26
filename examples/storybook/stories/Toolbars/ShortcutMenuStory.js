import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, MultiSelectCheckbox, Checkbox } from 'wix-style-react';
import { ACTION_BUTTON_TYPE } from 'wix-rich-content-plugin-button';
import { CODE_BLOCK_TYPE } from 'wix-rich-content-plugin-code-block';
import { DIVIDER_TYPE } from 'wix-rich-content-plugin-divider';
import { EMOJI_TYPE } from 'wix-rich-content-plugin-emoji';
import { FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { GIPHY_TYPE } from 'wix-rich-content-plugin-giphy';
import { HTML_TYPE } from 'wix-rich-content-plugin-html';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { LINK_TYPE } from 'wix-rich-content-plugin-link';
import { MAP_TYPE } from 'wix-rich-content-plugin-map';
import { SOUND_CLOUD_TYPE } from 'wix-rich-content-plugin-sound-cloud';
import { VIDEO_TYPE } from 'wix-rich-content-plugin-video';
import { VERTICAL_EMBED_TYPE } from 'wix-rich-content-plugin-vertical-embed';
import TabsWrapper from '../Components/TabsWrapper';
import apiData from '../Plugins/apiData';

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
              { value: 'button', id: ACTION_BUTTON_TYPE },
              { value: 'codeBlock', id: CODE_BLOCK_TYPE },
              { value: 'divider', id: DIVIDER_TYPE },
              { value: 'fileUpload', id: FILE_UPLOAD_TYPE },
              { value: 'gallery', id: GALLERY_TYPE },
              { value: 'gif', id: GIPHY_TYPE },
              { value: 'html', id: HTML_TYPE },
              { value: 'image', id: IMAGE_TYPE },
              { value: 'map', id: MAP_TYPE },
              { value: 'soundCloud', id: SOUND_CLOUD_TYPE },
              { value: 'video', id: VIDEO_TYPE },
              { value: 'socialEmbed', id: LINK_TYPE },
              { value: 'verticalEmbed', id: VERTICAL_EMBED_TYPE },
              { value: 'emoji', id: EMOJI_TYPE },
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
        morePluginsMenu: {
          showSearch,
          splitToSections,
        },
        pluginsToDisplayInToolbar: !selectedPlugins.includes('all') && selectedPlugins,
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
        <TabsWrapper apiData={apiData.FOOTER_TOOLBAR}>
          <Page title="Plugin Menu">
            <Section>
              {this.getPluginsSelection()}
              <h3>Footer Toolbar Config:</h3>
              {this.getCheckbox()}
              <Section>
                <RichContentEditorBox>{this.getEditor(editorKey)}</RichContentEditorBox>
              </Section>
            </Section>
          </Page>
        </TabsWrapper>
      );
    }
  }
  return <ShortcutMenuStory />;
};
