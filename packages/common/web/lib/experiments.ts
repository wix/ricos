import { AvailableExperiments } from '../../src/types/commonTypes';

export function parseExperiments(petriExperiments: Record<string, string>): AvailableExperiments {
  return Object.entries(petriExperiments).reduce((parsed, [key, value]) => {
    // splits specs.namespace.name to elements
    const [, namespace, name] = key.split('.');
    parsed[name] = {
      enabled: value === 'True',
      value,
      namespace,
    };
    return parsed;
  }, {});
}
