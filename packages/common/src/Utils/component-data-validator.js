export const validate = (componentData, schema) => {
  const Validator = require('jsonschema').Validator;
  if (process.env.NODE_ENV !== 'production') {
    const validator = new Validator();
    const result = validator.validate(componentData, schema);
    if (!result.valid && result.errors) {
      result.errors.forEach(error => console.warn('Plugin schema validation error:', error)); // eslint-disable-line no-console
    }
  }
};
