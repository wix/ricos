/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures } from './settings';

const testFixture = fixtureObj => {
  const { fixture, config, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;
  if (fixture !== 'gallery-layouts' && fixture !== 'gallery-out-of-view') {
    return it(`render ${fixture}`, function() {
      cy.loadRicosEditorAndViewer(fixture, config);
      if (additionalCommands) {
        additionalCommands(cy);
      }
      cy.eyesCheckWindow(this.test.title);
    });
  }
};

export const testFixtures = () => fixtures.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
