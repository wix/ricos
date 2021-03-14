/*global Cypress, cy*/
require('cypress-plugin-snapshots/commands');
import { PLUGIN_COMPONENT, TABLE_PLUGIN } from '../dataHooks';
import { setSelection } from './commands';

Cypress.Commands.add('setTableCellEditingSelection', (start, offset, cellIndex) => {
  setSelection(start, offset, cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`).eq(cellIndex));
});

Cypress.Commands.add('openTableModal', () => {
  cy.clickOnStaticButton(TABLE_PLUGIN.STATIC_TOOLBAR_BUTTON);
});

Cypress.Commands.add('addTableFromModal', (rowNum, colNum) => {
  cy.setTableRowNumAndColNum(rowNum, colNum);
  cy.get(`[data-hook*=${TABLE_PLUGIN.SUBMIT}]`).click();
});

Cypress.Commands.add('setTableRowNumAndColNum', (rowNum, colNum) => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.ROW_COUNT_INPUT}]`).type(rowNum);
  cy.get(`[data-hook*=${TABLE_PLUGIN.COL_COUNT_INPUT}]`).type(colNum);
});

Cypress.Commands.add('focusTable', () => {
  cy.get(`[data-hook*=${PLUGIN_COMPONENT.TABLE}]`)
    .first()
    .parent()
    .click();
});

Cypress.Commands.add('focusCell', cellIndex => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`)
    .eq(cellIndex)
    .trigger('mousedown')
    .trigger('mouseup');
});

Cypress.Commands.add('editCell', cellIndex => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`)
    .eq(cellIndex)
    .click()
    .type('table!!');
});

Cypress.Commands.add('editCellAndGoOut', cellIndex => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`)
    .eq(cellIndex)
    .click()
    .type('table!!{enter}');
});

Cypress.Commands.add('enterEditingCell', cellIndex => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`)
    .eq(cellIndex)
    .dblclick();
});

Cypress.Commands.add('paintBG', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.BG_COLOR}]`).click({ force: true });
  cy.get(`[data-scheme-color]`)
    .eq(2)
    .click();
});

Cypress.Commands.add('alignCell', alignTo => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.ALIGNMENT}]`).click({ force: true });
  cy.get(`[data-hook*=${alignTo}]`).click({ force: true });
});

Cypress.Commands.add('setRowHeader', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.ROW_HEADER}]`).click({ force: true });
});

Cypress.Commands.add('setColHeader', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.COL_HEADER}]`).click({ force: true });
});

Cypress.Commands.add('clickOnTableToolbarContextMenu', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.CONTEXT_MENU}]`).click({ force: true });
});

Cypress.Commands.add('clickOnTableToolbarContextMenuClear', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.CLEAR}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuDeleteCol', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.DELETE_COLUMN}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuDeleteRow', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.DELETE_ROW}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuInsertRight', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.INSERT_RIGHT}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuInsertLeft', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.INSERT_LEFT}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuInsertAbove', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.INSERT_ABOVE}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuInsertBelow', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.INSERT_BELOW}]`)
    .click();
});

Cypress.Commands.add('clickOnTableToolbarContextMenuMerge', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.MERGE}]`)
    .click({ force: true });
});

Cypress.Commands.add('clickOnTableToolbarContextMenuSplit', () => {
  cy.clickOnTableToolbarContextMenu()
    .get(`[data-hook*=${TABLE_PLUGIN.SPLIT}]`)
    .click({ force: true });
});

Cypress.Commands.add('paintBorder', (type, colorIndex) => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.BORDER_COLOR_BUTTONS}]`).click({ force: true });
  cy.get(`[data-hook*=${type}]`).click();
  cy.get(`[data-scheme-color]`)
    .eq(colorIndex)
    .click({ force: true });
});

Cypress.Commands.add('paintTableTextColor', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.TEXT_COLOR}]`).click({ force: true });
  cy.get(`[data-scheme-color=color1]`).click();
});

Cypress.Commands.add('paintTableHighlightColor', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.HIGHLIGHT_COLOR}]`).click({ force: true });
  cy.get(`[data-scheme-color=color4]`).click();
});

Cypress.Commands.add('goToTextStyle', () => {
  cy.get(`[data-hook*=${TABLE_PLUGIN.TEXT_STYLE_BUTTON}]`).click({ force: true });
});

Cypress.Commands.add('selectAllTableCells', () => {
  cy.get(`[data-hook*=selectAllTableCells]`).click();
});

Cypress.Commands.add('clickOnRowDrag', index => {
  cy.get(`[data-hook*=rowDrag-${index}]`).click();
});

Cypress.Commands.add('clickOnColDrag', index => {
  cy.get(`[data-hook*=colDrag-${index}]`).click();
});

Cypress.Commands.add('clickOnAddRow', () => {
  cy.get(`[data-hook*=addRow]`).click();
});

Cypress.Commands.add('clickOnAddCol', () => {
  cy.get(`[data-hook*=addCol]`).click();
});
