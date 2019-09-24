import { PLUGIN_COMPONENT } from '../cypress/dataHooks';

describe('plugins', () => {
  context('image', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('images').openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
    });

    it('should render settings', () => {});
  });

  context('gallery', () => {
    it('should render plugin toolbar', () => {});

    it('should render settings', () => {});
  });

  context('video', () => {
    it('should render plugin toolbar', () => {});

    it('should render settings', () => {});
  });

  context('html', () => {
    it('should render plugin toolbar', () => {
      cy.loadEditor('html').openPluginToolbar(PLUGIN_COMPONENT.HTML);
    });

    it('should render settings', () => {});
  });

  context('divider', () => {
    it.only('should render plugin toolbar', () => {
      cy.loadEditor('divider').openPluginToolbar(PLUGIN_COMPONENT.DIVIDER);
    });

    it('should render settings', () => {});
  });

  context('gif', () => {
    it('should render plugin toolbar', () => {});

    it('should render settings', () => {});
  });

  afterEach(() => cy.matchSnapshots({ capture: 'viewport' }));
});
