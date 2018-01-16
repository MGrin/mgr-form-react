import * as defaultTransformations from './transformations';
import { registerToStore } from '../utils';

export const transformations = new Map();

export const registerTransformation = (name, transform) => registerToStore(transformations, 'Transformation', name, transform);

Object.keys(defaultTransformations).forEach(transform => registerTransformation(transform, defaultTransformations[transform]));
