/* eslint-disable max-len */
/*global cy*/
import { TABLE_PLUGIN } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';
import { usePlugins, plugins } from '../cypress/testAppConfig';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Plugins',
    testName: title,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });

describe('plugins', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('table', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('should open table modal and create table by the settings', function() {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.table));
      cy.openTableModal();
      cy.eyesCheckWindow(this.test.title);
      cy.addTableFromModal(2, 2);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should limit cells number', function() {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.table));
      cy.openTableModal();
      cy.setTableRowNumAndColNum(100, 100);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should select/unSelect all cells', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.selectAllTableCells();
      cy.eyesCheckWindow(this.test.title);
      cy.selectAllTableCells();
      cy.eyesCheckWindow(this.test.title);
    });

    it('should add rows and columns from table entry points', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.clickOnAddRow();
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnAddCol();
      cy.eyesCheckWindow(this.test.title);
    });

    it('should open table toolbars in different positions', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.focusCell(0);
      cy.eyesCheckWindow(this.test.title);
      cy.goToTextStyle();
      cy.eyesCheckWindow(this.test.title);
      cy.focusCell(3);
      cy.eyesCheckWindow(this.test.title);
      cy.goToTextStyle();
      cy.eyesCheckWindow(this.test.title);
      cy.focusCell(4);
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnColDrag(1);
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnRowDrag(2);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should edit cell', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.editCell(0);
      cy.eyesCheckWindow(this.test.title);
      cy.setTableCellEditingSelection(1, 2, 0);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should use table toolbars', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.clickOnRowDrag(0);
      cy.paintBG();
      cy.goToTextStyle();
      cy.paintTableTextColor();
      cy.paintTableHighlightColor();
      cy.clickOnRowDrag(2);
      cy.goToTextStyle();
      cy.get(`[data-hook*=textInlineStyleButton_BOLD]`).click();
      cy.clickOnColDrag(2);
      cy.paintBorder(TABLE_PLUGIN.BORDER_COLOR_AROUND, 3);
      cy.clickOnColDrag(3);
      cy.paintBorder(TABLE_PLUGIN.BORDER_COLOR_ALL, 4);
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnColDrag(0);
      cy.setColHeader();
      cy.clickOnRowDrag(0);
      cy.setRowHeader();
      cy.eyesCheckWindow(this.test.title);
    });

    it('should use cell alignment', function() {
      cy.loadRicosEditorAndViewer('table-alignment', usePlugins(plugins.all));
      cy.focusTable();
      cy.focusCell(0);
      cy.alignCell(TABLE_PLUGIN.ALIGN_BOTTOM);
      cy.alignCell(TABLE_PLUGIN.ALIGN_TOP);
      cy.focusCell(1);
      cy.alignCell(TABLE_PLUGIN.ALIGN_MIDDLE);
      cy.focusCell(2);
      cy.alignCell(TABLE_PLUGIN.ALIGN_BOTTOM);
      cy.eyesCheckWindow(this.test.title);
      cy.editCell(0);
      cy.eyesCheckWindow(this.test.title);
      cy.editCell(1);
      cy.eyesCheckWindow(this.test.title);
      cy.editCell(2);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should use table toolbar context menu', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.clickOnRowDrag(1);
      cy.clickOnTableToolbarContextMenuInsertAbove();
      cy.clickOnRowDrag(2);
      cy.clickOnTableToolbarContextMenuDeleteRow();
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnRowDrag(0);
      cy.clickOnTableToolbarContextMenuInsertBelow();
      cy.eyesCheckWindow(this.test.title);
      cy.clickOnRowDrag(0);
      cy.clickOnTableToolbarContextMenuClear();
      cy.clickOnColDrag(0);
      cy.clickOnTableToolbarContextMenuInsertRight();
      cy.clickOnColDrag(0);
      cy.clickOnTableToolbarContextMenuInsertLeft();
      cy.clickOnTableToolbarContextMenuDeleteCol();
      cy.eyesCheckWindow(this.test.title);
    });

    it('should test the first and last block logic', function() {
      cy.loadRicosEditorAndViewer('table-with-images', usePlugins(plugins.all));
      cy.focusTable();
      cy.eyesCheckWindow(this.test.title);
      cy.enterEditingCell(0);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should select all cell content after go out from edit', function() {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.editCellAndGoOut(0);
      cy.goToTextStyle();
      cy.eyesCheckWindow(this.test.title);
    });

    // it('should use table toolbar context menu', function() {
    //   cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
    //   cy.focusTable();
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnTableToolbarContextMenuSplit();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(1);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(1);
    //   cy.clickOnTableToolbarContextMenuInsertAbove();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(2);
    //   cy.clickOnTableToolbarContextMenuDeleteRow();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertBelow();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuClear();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertRight();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertLeft();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnTableToolbarContextMenuDeleteCol();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuDeleteCol();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(4);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.eyesCheckWindow(this.test.title);
    //   cy.clickOnRowDrag(4);
    //   cy.clickOnTableToolbarContextMenuDeleteRow();
    //   cy.eyesCheckWindow(this.test.title);
    // });
  });
});
