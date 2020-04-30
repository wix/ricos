import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, Dropdown, MultiSelectCheckbox, MobilePreviewWidget } from 'wix-style-react';

const optionsIdMap = {
  1: true,
  2: false,
};

export default () => {
  class PluginMenuStory extends Component {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0, selectedPlugins: ['all'], withAddPluginMenuConfig: true };
    }

    getCheckbox = () => {
      const configOptions = ['showSearch', 'splitToSections', 'withAddPluginMenuConfig'];
      const { editorKey } = this.state;
      return configOptions.map(option => (
        <Box padding="3px" key={option} align="space-between" maxWidth="440px">
          {`${option}: `}
          <Dropdown
            size="small"
            placeholder="Select an option"
            options={[
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
        <Box padding="3px" align="space-between" maxWidth="440px">
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
              { value: 'map', id: 'map' },
              { value: 'soundCloud', id: 'soundCloud' },
              { value: 'video', id: 'video' },
              { value: 'socialEmbed', id: 'socialEmbed' },
              { value: 'verticalEmbed', id: 'verticalEmbed' },
            ]}
            selectedOptions={selectedPlugins}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
          />
        </Box>
      );
    };

    getEditor = ({ key, isMobile = false }) => {
      const { showSearch, splitToSections, withAddPluginMenuConfig, selectedPlugins } = this.state;
      const toolbarsConfig = {
        addPluginMenuConfig: {
          showSearch,
          splitToSections,
        },
      };
      const editorWrapperProps = {
        isMobile,
        contentState: emptyContentState,
        rcProps: {
          toolbarsConfig: withAddPluginMenuConfig && toolbarsConfig,
          pluginsToDisplay: !selectedPlugins.includes('all') && selectedPlugins,
        },
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
            <h3>Plugin Menu Config:</h3>
            {this.getCheckbox()}
            {this.getPluginsSelection()}
            <Section>
              <RichContentEditorBox>{this.getEditor({ key: editorKey })}</RichContentEditorBox>
            </Section>
            <Section>
              <MobilePreviewWidget skin="custom">
                {this.getEditor({ isMobile: true })}
              </MobilePreviewWidget>
            </Section>

            <div>
              Note: defaults for unset fields are:
              <ul>
                <li>
                  If addPluginMenuConfig not supplied - you will get horizontal menu without
                  search/sections.
                </li>
                <li>Search - off by default. </li>
                <li>Sections - on by default.</li>
              </ul>
            </div>
          </Section>
        </Page>
      );
    }
  }
  return <PluginMenuStory />;
};
