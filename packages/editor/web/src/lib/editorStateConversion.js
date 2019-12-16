import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from 'draft-js';
import { version } from '../../package.json';

const addVersion = (obj, version) => {
  obj.VERSION = version;
  return obj;
};

const convertToRaw = ContentState => addVersion(toRaw(ContentState), version);
const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), version);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

const getEntities = (editorState, entityType = null) => {
  const content = editorState.getCurrentContent();
  const entities = [];
  content.getBlocksAsArray().forEach(block => {
    let selectedEntity = null;
    block.findEntityRanges(
      character => {
        if (character.getEntity() !== null) {
          const entity = content.getEntity(character.getEntity());
          if (!entityType || (entityType && entity.getType() === entityType)) {
            selectedEntity = {
              entityKey: character.getEntity(),
              blockKey: block.getKey(),
              type: entity.getType(),
              entity,
            };
            return true;
          }
        }
        return false;
      },
      (start, end) => {
        entities.push({ ...selectedEntity, start, end });
      }
    );
  });
  return entities;
};

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw, getEntities };
