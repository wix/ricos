/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures } from './settings';

const testFixture = (fixtureObj, isFirefox = false) => {
  const { fixture, config, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;

  return it(`render ${fixture}`, function() {
    cy.loadRicosEditorAndViewer(fixture, config, isFirefox);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = isFirefox =>
  fixtures.forEach(fixture => testFixture(fixture, isFirefox));
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
