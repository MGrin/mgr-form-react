import * as defaultTransformations from './transformations';

export const transformations = new Map();

export const registerTransformation = (name, transform) => {
  if (!name) throw new Error('Provide a transformation name');
  if (!transform) throw new Error('Provide a transformation function');
  if (typeof(transform) !== 'function') throw new Error('Transformation should be a function');
  if (transformations.has(name)) console.warn(`Transformation called ${name} is already registered and will be overrided`);

  transformations.set(name, transform);
};

Object.keys(defaultTransformations).forEach(transform => registerTransformation(transform, defaultTransformations[transform]));
