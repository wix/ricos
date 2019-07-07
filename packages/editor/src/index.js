import { convertFromRaw as fromRaw, convertToRaw as toRaw, EditorState } from '@wix/draft-js';
import { Version } from 'wix-rich-content-common';
import RichContentEditor from './RichContentEditor';
import RichContentEditorModal from './RichContentEditor/RichContentEditorModal';

const addVersion = (obj, version) => {
  obj.VERSION = version;
  return obj;
};

const convertToRaw = ContentState => addVersion(toRaw(ContentState), Version.getCurrent());
const convertFromRaw = rawState => addVersion(fromRaw(rawState), rawState.VERSION);

const createEmpty = () => addVersion(EditorState.createEmpty(), Version.getCurrent());
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
