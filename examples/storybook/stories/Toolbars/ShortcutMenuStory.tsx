import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, MultiSelectCheckbox, Checkbox } from 'wix-style-react';
import { ACTION_BUTTON_TYPE } from 'ricos/button';
import { CODE_BLOCK_TYPE } from 'ricos/code-block';
import { DIVIDER_TYPE } from 'ricos/divider';
import { EMOJI_TYPE } from 'ricos/emoji';
import { FILE_UPLOAD_TYPE } from 'ricos/file-upload';
import { GALLERY_TYPE } from 'ricos/gallery';
import { GIPHY_TYPE } from 'ricos/giphy';
import { HTML_TYPE } from 'ricos/html';
import { IMAGE_TYPE } from 'ricos/image';
import { LINK_TYPE } from 'ricos/link';
import { MAP_TYPE } from 'ricos/map';
import { SOUND_CLOUD_TYPE } from 'ricos/sound-cloud';
import { VIDEO_TYPE } from 'ricos/video';
import { VERTICAL_EMBED_TYPE } from 'ricos/vertical-embed';
import TabsWrapper from '../Components/TabsWrapper';
import apiData from '../Plugins/apiData';
import { RicosContent, ToolbarSettings } from 'ricos/editor';
import { ToolbarType } from 'ricos/common';
import { FooterToolbarConfig } from '../../../main/src/types';

export default () => {
  class ShortcutMenuStory extends Component<
    {},
    {
      editorKey: number;
      selectedPlugins?: string[];
      showSearch?: boolean;
      splitToSections?: boolean;
    }
  > {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0, selectedPlugins: ['all'] };
    }

    getCheckbox = () => {
      const configOptions: ('splitToSections' | 'showSearch')[] = ['splitToSections', 'showSearch'];
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

    getEditor = (key: number) => {
      const { showSearch, splitToSections, selectedPlugins } = this.state;
      const footerToolbarConfig: FooterToolbarConfig = {
        morePluginsMenu: {
          showSearch,
          splitToSections,
        },
        pluginsToDisplayInToolbar: !selectedPlugins.includes('all') && selectedPlugins,
      };

      const getToolbarSettings = () => [{ name: ToolbarType.FOOTER, footerToolbarConfig }];
      const editorWrapperProps: {
        content: RicosContent;
        toolbarSettings: ToolbarSettings;
        key?: number;
      } = {
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
