import { AvailableExperiments } from '../src/types';

export function parseExperiments(
  wixExperiments: Record<string, string | boolean>
): AvailableExperiments {
  return Object.entries(wixExperiments).reduce((parsed, [key, value]) => {
    // splits specs.namespace.name to elements
    const [, namespace, name] = key.split('.');
    parsed[name] = {
      enabled: value.toString().toLowerCase() === 'true',
      value,
      namespace,
    };
    return parsed;
  }, {});
}
