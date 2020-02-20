import React from 'react';
import { RichContentEditorBox, Page } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/themeing-info.json';
import Palette from '../Components/Palette';
import { wixPalettes } from '../palettesExample';
import SegmentedToggle from 'wix-style-react/SegmentedToggle';
import FormField from 'wix-style-react/FormField';
import { Layout } from 'wix-style-react/Layout';
import EditorWrapper from '../Components/EditorWrapper';

export default () => {
  return (
    <Page title="Theme Palette">
      <ThemeSelector />
    </Page>
  );
};

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.palettes = Object.keys(wixPalettes);
    this.state = {
      selected: this.palettes[0],
    };
  }
  render() {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <Layout cols={1}>
          <FormField label="Choose a Palette:">
            <SegmentedToggle
              defaultSelected={this.palettes[0]}
              onClick={(evt, palette) => this.setState({ selected: palette })}
            >
              {this.palettes.map((palette, idx) => (
                <SegmentedToggle.Button
                  value={palette}
                  key={`p${idx}`}
                  selected={selected === palette}
                >
                  {palette}
                </SegmentedToggle.Button>
              ))}
            </SegmentedToggle>
          </FormField>
        </Layout>

        <Palette palette={wixPalettes[selected]} />

        <RichContentEditorBox>
          <EditorWrapper
            key={selected}
            contentState={exapmleState}
            palette={wixPalettes[selected]}
          />
        </RichContentEditorBox>
      </React.Fragment>
    );
  }
}
