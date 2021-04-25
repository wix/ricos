import { loadModules, Interface, Properties, Property, Type } from '@typeonly/loader';
// import { Prism, Lens, fromTraversable } from 'monocle-ts';

const traverseProperties = (rtoInterface: Interface) => {
  const properties = rtoInterface.properties || {};
  return Object.values(properties).map((property: Property) => {
    const { name, type, optional, readonly } = property;
    return { name, type, optional, readonly };
  });
};

const mapPropertyType = (
  type: Property['type'],
  types: Record<string, Type>,
  api: Record<string, unknown>
) => {
  if (type.kind === 'localRef') {
    return traverseTypes(types[type.refName], types, api);
  }
  if (type.kind === 'array') {
    return [{ type: mapPropertyType(type.itemType, types, api), dataType: 'array' }];
  }
  if (type.kind === 'composite' && type.op === 'union') {
    return type.types.map(t => mapPropertyType(t, types, api));
  }
  if (type.kind === 'name') {
    return [{ type: type.refName }];
  }
};

const mapPropertiesToApi = (
  properties: Pick<Property, 'name' | 'type' | 'optional' | 'readonly'>[],
  types: Record<string, Type>,
  api: Record<string, unknown>
) => {
  return properties.reduce((api, p) => {
    const typeDescriptors = mapPropertyType(p.type, types, api);
    return { ...api, [p.name]: { type: typeDescriptors } };
  }, api);
};

const isInterface = (namedType: Type): namedType is Interface => namedType.kind === 'interface';

const traverseTypes = (
  type: Type,
  types: Record<string, Type>,
  api: Record<string, unknown> = {}
) => {
  if (isInterface(type)) {
    const properties = traverseProperties(type);
    const processed = mapPropertiesToApi(properties, types, api);
    console.log(processed); // eslint-disable-line no-console
  }
};

export const generateContentAPI = () => {
  const modules = loadModules({
    bundle: { './v1': require('../../statics/v1.rto.json') },
  });
  const { RichContent } = modules['./v1'].namedTypes;
  traverseTypes(RichContent, modules['./v1'].namedTypes);
};
