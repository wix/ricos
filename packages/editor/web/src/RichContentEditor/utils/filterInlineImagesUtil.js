import { BlockMapBuilder } from 'draft-js';

export default (contentBlocks, editorState) => {
  return BlockMapBuilder.createFromArray(
    contentBlocks.filter(block => {
      let hasPhoto = false;
      block.findEntityRanges(
        value => {
          const key = value.getEntity();
          return key && editorState.getCurrentContent().getEntity(key).type === 'IMAGE';
        },
        () => (hasPhoto = true)
      );
      return !hasPhoto;
    })
  );
};
