require('cypress-plugin-snapshots/commands');
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();
import { INLINE_TOOLBAR_BUTTONS } from '../dataHooks';

const resizeForDesktop = () => cy.viewport('macbook-15');
const resizeForMobile = () => cy.viewport('iphone-5');

const buildQuery = params => {
  const parameters = params.filter(param => param);
  if (parameters.length === 0) return '';
  return '?' + parameters.join('&');
};

const getUrl = (componentId, fixtureName = '') =>
  `/${componentId}${fixtureName ? '/' + fixtureName : ''}${buildQuery([
    isMobile ? 'mobile' : '',
    isHebrew ? 'he' : '',
  ])}`;

// Viewport size commands

const run = (app, fixtureName) => {
  cy.visit(getUrl(app, fixtureName));
};

let isMobile = false;
let isHebrew = false;

Cypress.Commands.add('switchToMobile', () => {
  isMobile = true;
  resizeForMobile();
});

Cypress.Commands.add('switchToDesktop', () => {
  isMobile = false;
  resizeForDesktop();
});

Cypress.Commands.add('switchToHebrew', () => {
  isHebrew = true;
});

Cypress.Commands.add('switchToEnglish', () => {
  isHebrew = false;
});

Cypress.Commands.add('loadEditorAndViewer', fixtureName => {
  run('combined', fixtureName);
});

Cypress.Commands.add('loadEditor', fixtureName => {
  run('rce', fixtureName);
});

Cypress.Commands.add('matchContentSnapshot', () => {
  cy.window()
    .its('__CONTENT_SNAPSHOT__')
    .toMatchSnapshot();
});

Cypress.Commands.add('matchSnapshots', () => {
  cy.matchImageSnapshot().matchContentSnapshot();
});

// Editor commands
const getEditor = () => cy.get('[contenteditable="true"]');

Cypress.Commands.add('enterText', text => {
  getEditor().type(text);
});

Cypress.Commands.add('enterParagraphs', paragraphs => {
  cy.enterText(paragraphs.join('{enter}'));
});

Cypress.Commands.add('newLine', () => {
  cy.enterText('{enter}');
});

Cypress.Commands.add('blurEditor', () => {
  getEditor().blur();
});

Cypress.Commands.add('focusEditor', () => {
  getEditor().focus();
});

Cypress.on('window:before:load', win => {
  delete win.IntersectionObserver;
  win.IntersectionObserver = class IntersectionObserverMock {
    constructor(cb, options) {
      this.cb = cb;
      this.options = options;
    }

    thresholds = [0];
    root = win;
    rootMargin = '0px';
    observe = element =>
      this.cb([
        {
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: element.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: {},
          target: element,
          time: new Date().getTime(),
        },
      ]);
    unobserve = () => null;
    disconnect = () => {};
  };
});

function getTextElments(rootElement) {
  let textElement,
    offset = 0;
  const textElements = [],
    textOffsets = [];
  const walk = rootElement.ownerDocument.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while ((textElement = walk.nextNode())) {
    textElements.push(textElement);
    offset += textElement.length;
    textOffsets.push(offset);
  }
  return offset => {
    const i = textOffsets.findIndex(v => v > offset);
    return { element: textElements[i], offset: i === 0 ? offset : offset - textOffsets[i - 1] };
  };
}

Cypress.Commands.add('setSelection', (start, offset) => {
  cy.focusEditor().then(args => {
    const getTextElmentAndLocalOffset = getTextElments(args[0]);
    const document = args.context;
    const range = document.createRange();
    const startObj = getTextElmentAndLocalOffset(start);
    range.setStart(startObj.element, startObj.offset);
    const endObj = getTextElmentAndLocalOffset(start + offset);
    range.setEnd(endObj.element, endObj.offset);
    document.getSelection().removeAllRanges(range);
    document.getSelection().addRange(range);
  });
});

Cypress.Commands.add('moveCursorToStart', () => {
  cy.focusEditor().type('{selectall}{uparrow}');
});

Cypress.Commands.add('moveCursorToEnd', () => {
  cy.focusEditor().type('{selectall}{downarrow}');
});

Cypress.Commands.add('setTextStyle', (buttonSelector, selection) => {
  if (selection) {
    cy.setSelection(selection[0], selection[1]);
  }
  cy.get(`[data-hook=${buttonSelector}]`).click();
});

function setInlineToolbarMenueItem(item, selection, butttonIndex) {
  cy.setTextStyle(item, selection)
    .get('.ReactModalPortal')
    .find('button')
    .eq(butttonIndex)
    .click();
}

Cypress.Commands.add('setColor', (buttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.COLOR, selection, buttonIndex);
});

Cypress.Commands.add('setLineSpacing', (buttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.LINE_SPACING, selection, buttonIndex);
});

Cypress.Commands.add('openPluginToolbar', () => {
  cy.get('[aria-label="Plugin Toolbar"]').click();
  cy.get('#side_bar');
});

// disable screenshots in debug mode. So there is no diffrence to ci.
if (Cypress.browser.isHeaded) {
  const noop = () => {};
  Cypress.Commands.overwrite('matchImageSnapshot', noop);
}
