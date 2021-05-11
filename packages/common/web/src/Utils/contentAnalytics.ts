import { ContentBlock, ContentState, EntityInstance } from 'draft-js';
import { countBy } from 'lodash';

export const getBlockTypePlugins = (blocks: ContentBlock[]) =>
  blocks.filter(block => block.getType() !== 'unstyled' && block.getType() !== 'atomic');

export const getEntities = (content: ContentState, entityType?: string): EntityInstance[] => {
  const entities: EntityInstance[] = [];

  content.getBlockMap().forEach(block => {
    block?.findEntityRanges(
      character => {
        const char = character.getEntity();
        if (char) {
          const entity = content.getEntity(char);
          if (!entityType || entity.getType() === entityType) {
            entities.push(entity);
          }
        } else {
          // regular text block
          entities.push({
            getType: () => 'text',
            getData: () => '',
          } as EntityInstance);
        }
        return false;
      },
      () => {}
    );
  });
  return entities;
};

export const countByType = (obj: { getType: () => string }[]) => countBy(obj, x => x.getType());

export function getContentSummary(content: ContentState) {
  if (content.getBlocksAsArray().length === 0) return;
  const blocks = content.getBlocksAsArray();
  const entries = getEntities(content);
  const blockPlugins = getBlockTypePlugins(blocks);
  const pluginsDetails = entries
    .filter(entry => entry.getType() !== 'text')
    .map(entry => ({ type: entry.getType(), data: entry.getData() }));
  return {
    pluginsCount: {
      ...countByType(blockPlugins),
      ...countByType(entries),
    },
    pluginsDetails,
  };
}
