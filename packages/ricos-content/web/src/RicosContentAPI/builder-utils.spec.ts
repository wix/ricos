import {
  Node_Type,
  TextData,
  DividerData_Type,
  DividerData_Width,
  DividerData_Alignment,
} from 'ricos-schema';
import { updateNode, setNode, addNode, toTextDataArray } from './builder-utils';

describe('addNode util', () => {
  it('should append node, if no index/key provided', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'foo', nodes: [], type: Node_Type.PARAGRAPH });
    const expected = { nodes: [...content.nodes, node] };
    const actual = addNode({ node, content });
    expect(actual).toEqual(expected);
  });
  it('should insert node at index, if index provided', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'new', nodes: [], type: Node_Type.DIVIDER });
    const expected = {
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'new', nodes: [], type: Node_Type.DIVIDER },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    };
    const actual = addNode({ node, content, index: 1 });
    expect(actual).toEqual(expected);
  });
  it('should insert node after a node by key, if after key provided', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'new', nodes: [], type: Node_Type.DIVIDER });
    const expected = {
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'new', nodes: [], type: Node_Type.DIVIDER },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    };
    const actual = addNode({ node, content, after: 'foo' });
    expect(actual).toEqual(expected);
  });
  it('should insert node before a node by key, if before key provided', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'new', nodes: [], type: Node_Type.DIVIDER });
    const expected = {
      nodes: [
        { key: 'new', nodes: [], type: Node_Type.DIVIDER },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    };
    const actual = addNode({ node, content, before: 'foo' });
    expect(actual).toEqual(expected);
  });
});

describe('updateNode util', () => {
  it('should update existing node', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'ass', nodes: [], type: Node_Type.DIVIDER },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({
      key: 'new',
      nodes: [],
      type: Node_Type.DIVIDER,
      dividerData: {
        type: DividerData_Type.SINGLE,
        width: DividerData_Width.SMALL,
        alignment: DividerData_Alignment.CENTER,
      },
    });
    const actual = updateNode({ node, content, key: 'ass' });
    const expected = Object.freeze({
      nodes: [
        {
          key: 'ass',
          nodes: [],
          type: Node_Type.DIVIDER,
          dividerData: {
            type: DividerData_Type.SINGLE,

            width: DividerData_Width.SMALL,
            alignment: DividerData_Alignment.CENTER,
          },
        },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    expect(actual).toEqual(expected);
  });

  it(`should have no effect if node types are not matching`, () => {
    const content = Object.freeze({
      nodes: [
        { key: 'ass', nodes: [], type: Node_Type.DIVIDER },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = {
      key: 'new',
      // nodes: [],
      type: Node_Type.DIVIDER,
      dividerData: {
        type: DividerData_Type.SINGLE,
        width: DividerData_Width.SMALL,
        alignment: DividerData_Alignment.CENTER,
      },
    };
    const actual = updateNode({ node, content, key: 'foo' });
    expect(actual).toEqual(content);
  });
});

describe('setNode util', () => {
  it('should override existing node', () => {
    const content = Object.freeze({
      nodes: [
        { key: 'ass', nodes: [], type: Node_Type.DIVIDER },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'new', nodes: [], type: Node_Type.IMAGE });
    const actual = setNode({ node, content, key: 'ass' });
    const expected = Object.freeze({
      nodes: [
        { key: 'ass', nodes: [], type: Node_Type.IMAGE },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    expect(actual).toEqual(expected);
  });

  it(`should have no effect if node doesn't exist`, () => {
    const content = Object.freeze({
      nodes: [
        { key: 'ass', nodes: [], type: Node_Type.DIVIDER },
        { key: 'foo', nodes: [], type: Node_Type.PARAGRAPH },
        { key: 'bar', nodes: [], type: Node_Type.POLL },
      ],
    });
    const node = Object.freeze({ key: 'new', nodes: [], type: Node_Type.IMAGE });
    const actual = setNode({ node, content, key: 'baz' });
    expect(actual).toEqual(content);
  });
});

describe('toTextDataArray util', () => {
  it('should return [] for invalid input', () => {
    const expected = [];
    const actual = toTextDataArray((123 as unknown) as TextData);
    expect(actual).toEqual(expected);
  });

  it('should convert string to TextData[]', () => {
    const expected = [{ text: 'test', decorations: [] }];
    const actual = toTextDataArray('test');
    expect(actual).toEqual(expected);
  });
  it('should convert TextData to TextData[]', () => {
    const expected = [{ text: 'test', decorations: [] }];
    const actual = toTextDataArray({ text: 'test', decorations: [] });
    expect(actual).toEqual(expected);
  });
  it('should convert mixed array to TextData[]', () => {
    const expected = [
      { text: 'test', decorations: [] },
      { text: 'foo', decorations: [] },
      { text: 'bar', decorations: [] },
    ];
    const actual = toTextDataArray(['test', { text: 'foo', decorations: [] }, 'bar']);
    expect(actual).toEqual(expected);
  });
});
