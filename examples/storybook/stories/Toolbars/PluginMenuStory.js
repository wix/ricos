import React, { Component } from 'react';
import { Section, Page, RichContentEditorBox } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, MultiSelectCheckbox, Checkbox } from 'wix-style-react';

export default (isMobile = false) => {
  class PluginMenuStory extends Component {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0, selectedPlugins: ['all'] };
    }

    getCheckbox = () => {
      const configOptions = ['splitToSections'];
      !isMobile && configOptions.push('showSearch');
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

    getEditor = ({ key, withPluginMenuConfig = false }) => {
      const { showSearch, splitToSections, selectedPlugins } = this.state;
      const addPluginMenuConfig = { showSearch, splitToSections };

      const getToolbarSettings = withPluginMenuConfig
        ? () => [
            { name: 'SIDE', addPluginMenuConfig },
            { name: 'MOBILE', addPluginMenuConfig },
          ]
        : () => [];
      const editorWrapperProps = {
        isMobile,
        content: emptyContentState,
        toolbarSettings: { getToolbarSettings },
        pluginsToDisplay: !selectedPlugins.includes('all') && selectedPlugins,
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
            <h3>Plugin Menu With Config:</h3>
            {this.getCheckbox()}
            <Section>
              <RichContentEditorBox>
                {this.getEditor({ key: editorKey, withPluginMenuConfig: true })}
              </RichContentEditorBox>
            </Section>
            {!isMobile && (
              <div>
                <h3>Horizontal Plugin Menu Without Config:</h3>
                <Section>
                  <RichContentEditorBox>
                    {this.getEditor({ key: editorKey + 1 })}
                  </RichContentEditorBox>
                </Section>
                <div>
                  Note: defaults for unset fields are:
                  <ul>
                    <li>If addPluginMenuConfig not supplied - you will get the horizontal menu.</li>
                    <li>Search - off by default. </li>
                    <li>Sections - on by default.</li>
                  </ul>
                </div>
              </div>
            )}
          </Section>
        </Page>
      );
    }
  }
  return <PluginMenuStory />;
};
