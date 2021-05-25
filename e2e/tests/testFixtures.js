/*global cy*/
import { fixturesToTestOnSeo, fixtures1, fixtures2 } from './settings';

const testFixture = fixtureObj => {
  const { fixture, config, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;
  it(`render ${fixture}`, function() {
    cy.loadRicosEditorAndViewer(fixture, config);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures1 = () => fixtures1.forEach(testFixture);
export const testFixtures2 = () => fixtures2.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
