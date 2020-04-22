/*global cy Cypress*/
import { fixturesToTestOnSeo, fixtures, apps } from './settings';

const testFixture = fixtureObj => {
  const { fixture, plugins, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;

  return apps.forEach(app => {
    it(`render ${fixture} [${app.name}]`, function() {
      cy[app.loadApp](fixture, plugins);
      if (additionalCommands) {
        additionalCommands(cy);
      }
      cy.eyesCheckWindow(this.test.title);
    });
  });
};

export const testFixtures = () => fixtures.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
