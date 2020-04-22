import contentStateSchema from '../../statics/schemas/content-state.schema.json';

export const validate = (data, schema) => {
  if (process.env.NODE_ENV !== 'production') {
    const Validator = require('jsonschema').Validator;
    const validator = new Validator();
    const result = validator.validate(data, schema);
    if (!result.valid && result.errors) {
      result.errors.forEach(error => console.warn('schema validation error:', error)); // eslint-disable-line no-console
    }
    return result.valid;
  } else {
    return true;
  }
};

export const getContentStateSchema = (pluginDataSchemas = {}) => {
  const schema = contentStateSchema;
  schema.definitions.entityDef.anyOf = Object.keys(pluginDataSchemas).map(pluginType => {
    return {
      properties: {
        type: { const: pluginType },
        data: pluginDataSchemas[pluginType],
      },
    };
  });

  return schema;
};
