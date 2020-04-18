/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures } from './settings';

const testFixture = fixtureObj => {
  const { fixture, plugins, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;

  return it(`render ${fixture}`, function() {
    cy.loadEditorAndViewer(fixture, plugins);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    const focusEle = cy.focused({ log: false, timeout: 1000 });
    if (focusEle) {
      focusEle.blur();
    }

    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = () => fixtures.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
