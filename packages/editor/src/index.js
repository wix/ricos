import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from '@wix/draft-js';
import RichContentEditor from './RichContentEditor';
import RichContentEditorModal from './RichContentEditor/RichContentEditorModal';
import { CONTENT_STATE_VERSION } from 'wix-rich-content-common';

const addVersion = (obj, version) => {
  obj.VERSION = version;
  return obj;
};

const convertToRaw = ContentState => addVersion(toRaw(ContentState), CONTENT_STATE_VERSION); //todo get current version
const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), CONTENT_STATE_VERSION);
const createWithContent = contentState =>
  addVersion(EditorState.createWithContent(contentState), contentState.VERSION);

export {
  EditorState,
  RichContentEditorModal,
  RichContentEditor,
  createEmpty,
  createWithContent,
  convertToRaw,
  convertFromRaw,
};
