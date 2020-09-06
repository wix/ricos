/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures } from './settings';
import { noop } from 'lodash';

const testFixture = (fixtureObj, firefoxUserAgent = noop) => {
  const { fixture, config, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;

  return it(`render ${fixture}`, function() {
    firefoxUserAgent();
    cy.loadRicosEditorAndViewer(fixture, config);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = firefoxUserAgent =>
  fixtures.forEach(fixture => testFixture(fixture, firefoxUserAgent));
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
