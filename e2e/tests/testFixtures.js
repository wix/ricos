/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures } from './settings';

const testFixture = (fixtureObj, isWrapper) => {
  const { fixture, plugins, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;
  const itNameAddition = isWrapper ? ' - wrapper' : '';

  return it(`render ${fixture}${itNameAddition}`, function() {
    const loadTest = isWrapper ? cy.loadWrapperEditorAndViewer : cy.loadEditorAndViewer;
    loadTest(fixture, plugins);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = () => fixtures.forEach(testFixture, false);
export const testWrapperFixtures = () => fixtures.forEach(testFixture, true);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
