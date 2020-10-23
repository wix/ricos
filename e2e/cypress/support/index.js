require('cypress-plugin-tab');
import './commands';
import '@applitools/eyes-cypress/commands';
import { ONCHANGE_DEBOUNCE_TIME } from '../../../packages/ricos-editor/web/src/utils/editorUtils';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.overwrite('eyesCheckWindow', (originalFn, config = {}) => {
  cy.wait(ONCHANGE_DEBOUNCE_TIME);
  const obj = typeof config === 'string' ? { tag: config } : config;
  originalFn({
    ...obj,
    scriptHooks: {
      beforeCaptureScreenshot:
        "[...document.styleSheets].forEach(s => [...s.rules].forEach(r => r.style && r.style.getPropertyValue('font-family') && r.style.setProperty('font-family', r.style.getPropertyValue('font-family').split(',').map(f => f.trim() === 'HelveticaNeue' || f.trim() === 'Helvetica Neue' ? 'sans-serif' : f).join(','))))",
    },
  });
});
