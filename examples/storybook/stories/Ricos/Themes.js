import React from 'react';
import { Page, Section, ContentState } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/themeing-info.json';
import Palette from '../Components/Palette';
import { wixPalettes } from '../palettesExample';
import { SegmentedToggle, FormField, Layout } from 'wix-style-react';
import ExampleApplication from '../Components/ExampleApplication';

export default () => {
  return (
    <Page title="Theme Palette">
      <ThemeSelector />
      <Section title="Content State">
        <ContentState json={exapmleState} />
      </Section>
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
        <ExampleApplication
          key={selected}
          initialState={exapmleState}
          palette={wixPalettes[selected]}
        />
      </React.Fragment>
    );
  }
}
