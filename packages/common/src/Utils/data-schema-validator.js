export const validate = (data, schema) => {
  const Validator = require('jsonschema').Validator;
  if (process.env.NODE_ENV !== 'production') {
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
