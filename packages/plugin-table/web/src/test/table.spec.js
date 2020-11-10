import Table from '../domain/table';
import { getMockComponentData } from './TestData/cell-content-state';
import { EditorState } from 'wix-rich-content-editor-common';
import { convertTableConfigToRaw } from 'wix-rich-content-editor';

describe('Test Table domain functions', () => {
  let componentData, table;
  beforeEach(() => {
    componentData = getMockComponentData();
    table = new Table(componentData, () => {});
  });
  afterEach(() => {
    expect(convertTableConfigToRaw(componentData.config, true)).toMatchSnapshot();
  });
  it('Test addRow function', () => {
    table.addRow(1);
  });
  it('Test addColumn function', () => {
    table.addColumn(0);
  });
  it('Test addColumn function', () => {
    table.addColumn(0);
  });
  it('Test pasteCells function', () => {
    table.pasteCells(
      [
        { i: 0, j: 0 },
        { i: 0, j: 1 },
      ],
      0,
      1
    );
  });
  it('Test clearRange function', () => {
    table.clearRange([{ i: 0, j: 0 }]);
  });
  it('Test updateCellContent function', () => {
    table.updateCellContent(0, 0, EditorState.createEmpty());
  });
  it('Test setCellsStyle function', () => {
    table.setCellsStyle({ backgroundColor: '#3a54b4' }, [{ i: 0, j: 0 }]);
  });
  it('Test setColumnWidth function', () => {
    table.setColumnWidth([{ i: 0, j: 0 }], 96);
  });
  it('Test setRowHeight function', () => {
    table.setRowHeight([{ i: 0, j: 0 }], 122);
  });
  it('Test distributeColumns function', () => {
    table.distributeColumns([0, 1], 122);
  });
  it('Test deleteRow function', () => {
    table.deleteRow(['0']);
  });
  it('Test deleteColumn function', () => {
    table.deleteColumn(['0']);
  });
});
