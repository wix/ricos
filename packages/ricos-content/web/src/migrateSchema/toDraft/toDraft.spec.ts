import { toDraft, fromDraft, convertNodeDataToDraft, convertDecorationDataToDraft } from '..';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import anchorBlocksFixture from '../../../../../../e2e/tests/fixtures/all-blocks-with-anchors.json';
import { ANCHOR_TYPE } from '../..';
import { rich_content } from 'ricos-schema';
import { convertDecorationToDraftData, convertNodeToDraftData } from './convertDraftPluginData';

const fixtures = { intro: fixture, complex: complexFixture };

describe('migrate to draft', () => {
  Object.entries(fixtures).forEach(([name, content]) =>
    it(`should migrate ${name} fixture`, () => {
      expect(compareWithConverted(content)).toEqual({});
    })
  );

  it('should migrate anchors', () => {
    const content = convert(anchorBlocksFixture);
    const anchorKeys = Object.values(content.entityMap)
      .filter(({ type }) => type === ANCHOR_TYPE)
      .map(({ data }) => data.anchor);
    const blockKeys = content.blocks.map(({ key }) => key);
    const anchorsWithoutBlock = anchorKeys.filter(anchor => !blockKeys.includes(anchor));
    expect(anchorsWithoutBlock.length).toEqual(0);
  });

  const imageNodeData = {
    nodes: [],
    type: 'IMAGE',
    key: 'eoba3',
    imageData: {
      config: {
        size: 'CONTENT',
        alignment: 'CENTER',
        showTitle: true,
        showDescription: true,
        disableExpand: false,
      },
      src: {
        id: '036c6bf6cef5e4409848eb4eb6f80de1',
        originalFileName: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        fileName: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        width: 2898,
        height: 3354,
      },
      metadata: {
        alt: 'feet',
        caption: 'The caption!',
      },
    },
  };

  const expectedImageBlockData = {
    config: {
      alignment: 'center',
      size: 'content',
      showTitle: true,
      showDescription: true,
      disableExpand: false,
    },
    src: {
      id: '036c6bf6cef5e4409848eb4eb6f80de1',
      original_file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
      file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
      width: 2898,
      height: 3354,
    },
    metadata: {
      caption: 'The caption!',
      alt: 'feet',
    },
  };

  it('should convert node data', () => {
    const blockData = convertNodeDataToDraft(Node_Type.IMAGE, imageNodeData.imageData);

    expect(blockData).toEqual(expectedImageBlockData);
  });

  it('should convert node', () => {
    const blockData = convertNodeToDraftData(imageNodeData);

    expect(blockData).toEqual(expectedImageBlockData);
  });

  const mentionDecoration = {
    type: 'MENTION',
    mentionData: {
      name: 'Test One',
      slug: 'testone',
    },
  };

  const expectedMentionBlockData = {
    mention: {
      name: 'Test One',
      slug: 'testone',
    },
  };

  it('should convert decoration data', () => {
    const blockData = convertDecorationDataToDraft(
      Decoration_Type.MENTION,
      mentionDecoration.mentionData
    );

    expect(blockData).toEqual(expectedMentionBlockData);
  });

  it('should convert decoration', () => {
    const blockData = convertDecorationToDraftData(mentionDecoration);

    expect(blockData).toEqual(expectedMentionBlockData);
  });
});

const convert = content => toDraft(fromDraft(content));
const compareWithConverted = content => compare(convert(content), content);
