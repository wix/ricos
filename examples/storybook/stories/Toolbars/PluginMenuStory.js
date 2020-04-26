import React, { Component } from 'react';
import { Section, Page } from '../Components/StoryParts';
import EditorWrapper from '../Components/EditorWrapper';
import emptyContentState from '../../../../e2e/tests/fixtures/empty.json';
import { Box, Dropdown } from 'wix-style-react';

const optionsIdMap = {
  0: undefined,
  1: true,
  2: false,
};

export default () => {
  class PluginMenuStory extends Component {
    constructor(props) {
      super(props);
      this.state = { editorKey: 0 };
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

    render() {
      const { showSearch, splitToSections, horizontalMenu, editorKey } = this.state;
      const config = {
        toolbarsConfig: {
          addPluginMenuConfig: {
            showSearch,
            splitToSections,
            horizontalMenu,
          },
        },
      };

      return (
        <Page title="Plugin Menu">
          <Section>
            <h3>Plugin Menu Config:</h3>
            {this.getCheckbox()}
            <Section>
              <EditorWrapper key={editorKey} contentState={emptyContentState} config={config} />
            </Section>
            <p>
              Note: defaults for unset fields are:
              <ul>
                <li>Search - will be included for menus with more than 9 plugins. </li>
                <li>
                  Sections - will be presented if there are at least 2 basic plugins and 2 more from
                  another category.
                </li>
                <li>horizontal - false by default. </li>
              </ul>
            </p>
          </Section>
        </Page>
      );
    }
  }
  return <PluginMenuStory />;
};
