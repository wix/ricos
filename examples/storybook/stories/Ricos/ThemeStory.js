import React from 'react';
import { Page, Section, ContentState } from '../Components/StoryParts';
import exapmleState from '../../../../e2e/tests/fixtures/storybook-example-app.json';
import Palette from '../Components/Palette';
import { wixPalettes, ricosPalettes } from '../palettesExample';
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
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    document.onkeydown = event => {
      let { page } = this.state;
      if (event.key === 'ArrowLeft') {
        page > 0 && page--;
      } else if (event.key === 'ArrowRight') {
        page < this.palettes.length - 1 && page++;
      }
      this.setPalette(page);
    };
  }

  setPalette = page =>
    this.setState({
      page,
    });

  render() {
    const { page } = this.state;
    console.log(wixPalettes[page]);
    return (
      <React.Fragment>
        <Layout cols={1} justifyItems={'center'}>
          <Cell>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Heading appearance={'H2'} style={{ marginBottom: '16px' }}>
                Choose a Palette
              </Heading>
              <Palette palette={wixPalettes[page]} />
              <Pagination
                currentPage={this.state.page + 1}
                totalPages={this.palettes.length}
                onChange={({ page }) => this.setPalette(page - 1)}
              />
            </div>
          </Cell>
        </Layout>
        <div style={{ backgroundColor: ricosPalettes[page].bgColor, padding: 4 }}>
          <ExampleApplication
            key={page}
            initialState={exapmleState}
            palette={ricosPalettes[page]}
          />
        </div>
      </React.Fragment>
    );
  }
}
