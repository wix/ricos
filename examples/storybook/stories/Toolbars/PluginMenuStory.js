import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, Dropdown, MultiSelectCheckbox } from 'wix-style-react';

const optionsIdMap = {
  0: undefined,
  1: true,
  2: false,
};

export default () => {
  class PluginMenuStory extends Component {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0, selectedPlugins: ['all'] };
    }

    getCheckbox = () => {
      const configOptions = ['showSearch', 'splitToSections', 'horizontalMenu'];
      const { editorKey } = this.state;
      return configOptions.map(option => (
        <Box padding="3px" key={option} align="space-between" maxWidth="400px">
          {`${option}: `}
          <Dropdown
            size="small"
            placeholder="Select an option"
            options={[
              { id: 0, value: 'unset' },
              { id: 1, value: 'true' },
              { id: 2, value: 'false' },
            ]}
            onSelect={({ id }) =>
              this.setState({ [option]: optionsIdMap[id], editorKey: editorKey + 1 })
            }
          />
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
        <Box padding="3px" align="space-between" maxWidth="400px">
          Plugins to consume:
          <MultiSelectCheckbox
            size="small"
            options={[
              { value: 'all', id: 'all' },
              { value: 'button', id: 'button' },
              { value: 'codeBlock', id: 'codeBlock' },
              { value: 'divider', id: 'divider' },
              { value: 'fileUpload', id: 'fileUpload' },
              { value: 'gallery', id: 'gallery' },
              { value: 'gif', id: 'gif' },
              { value: 'html', id: 'html' },
              { value: 'image', id: 'image' },
              { value: 'link', id: 'link' },
              { value: 'map', id: 'map' },
              { value: 'soundCloud', id: 'soundCloud' },
              { value: 'video', id: 'video' },
              { value: 'linkPreview', id: 'linkPreview' },
              { value: 'verticalEmbed', id: 'verticalEmbed' },
            ]}
            selectedOptions={selectedPlugins}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
          />
        </Box>
      );
    };

    render() {
      const {
        showSearch,
        splitToSections,
        horizontalMenu,
        editorKey,
        selectedPlugins,
      } = this.state;
      const toolbarsConfig = {
        addPluginMenuConfig: {
          showSearch,
          splitToSections,
          horizontalMenu,
        },
      };

      return (
        <Page title="Plugin Menu">
          <Section>
            <h3>Plugin Menu Config:</h3>
            {this.getCheckbox()}
            {this.getPluginsSelection()}
            <Section>
              <RichContentEditorBox>
                <EditorWrapper
                  key={editorKey}
                  contentState={emptyContentState}
                  rcProps={{
                    toolbarsConfig,
                    pluginsToDisplay: !selectedPlugins.includes('all') && selectedPlugins,
                  }}
                />
              </RichContentEditorBox>
            </Section>
            <div>
              Note: defaults for unset fields are:
              <ul>
                <li>Search - will be included for menus with more than 9 plugins. </li>
                <li>
                  Sections - will be presented if there are at least 2 basic plugins and 2 more from
                  another category.
                </li>
                <li>horizontal - false by default. </li>
              </ul>
            </div>
          </Section>
        </Page>
      );
    }
  }
  return <PluginMenuStory />;
};
