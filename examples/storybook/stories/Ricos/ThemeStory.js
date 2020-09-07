import React from 'react';
import { Page, Section, ContentState } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/storybook-example-app.json';
import Palette from '../Components/Palette';
import { wixPalettes } from '../palettesExample';
import { Layout, Pagination, Cell, Heading } from 'wix-style-react';
import ExampleApplication from '../Components/ExampleApplication';

export default () => {
  return (
    <Page title="Ricos Theme">
      <h4>
        See Usage{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wix-incubator.github.io/rich-content/docs/ricos/ricos-api#theme"
        >
          here
        </a>
        <ThemeSelector />
        <Section title="Content State">
          <ContentState json={exapmleState} />
        </Section>
      </h4>
    </Page>
  );
};

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.palettes = Object.keys(wixPalettes);
    const page = 1;
    this.state = {
      selected: this.palettes[page - 1],
      page,
    };
  }

  componentDidMount() {
    document.onkeydown = event => {
      let { page } = this.state;
      if (event.key === 'ArrowLeft') {
        page > 1 && page--;
      } else if (event.key === 'ArrowRight') {
        page < this.palettes.length && page++;
      }
      this.setPalette(page);
    };
  }

  setPalette = page =>
    this.setState({
      selected: this.palettes[page - 1],
      page,
    });

  render() {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <Layout cols={1} justifyItems={'center'}>
          <Cell>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Heading appearance={'H2'} style={{ marginBottom: '16px' }}>
                Choose a Palette
              </Heading>
              <Palette palette={wixPalettes[selected]} />
              <Pagination
                currentPage={this.state.page}
                totalPages={this.palettes.length}
                onChange={({ page }) => this.setPalette(page)}
              />
            </div>
          </Cell>
        </Layout>
        <div style={{ backgroundColor: wixPalettes[selected][5].value, padding: 4 }}>
          <ExampleApplication
            key={selected}
            initialState={exapmleState}
            palette={wixPalettes[selected]}
          />
        </div>
      </React.Fragment>
    );
  }
}
