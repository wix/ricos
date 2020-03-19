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

export { EditorState, createEmpty, createWithContent, convertToRaw, convertFromRaw };
