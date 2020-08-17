require('cypress-plugin-tab');
import './commands';

import '@applitools/eyes-cypress/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.overwrite('eyesCheckWindow', (originalFn, config = {}) => {
  const obj = typeof config === 'string' ? { tag: config } : config;
  originalFn({
    ...obj,
    scriptHooks: {
      beforeCaptureScreenshot:
        "[...document.styleSheets].forEach(s => [...s.rules].forEach(r => r.style && r.style.getPropertyValue('font-family') && r.style.setProperty('font-family', r.style.getPropertyValue('font-family').split(',').map(f => f.trim() === 'Helvetica' ? 'sans-serif' : f).join(','))))",
    },
  });
});
