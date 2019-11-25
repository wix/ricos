// import { validator, getContentStateSchema } from '../Utils/data-schema-validator';
import { validator } from '../Utils/data-schema-validator';
import contentStateSchema from '../../statics/schemas/content-state.schema.json';

export const isValidEditorData = payload => validator(payload, contentStateSchema);
