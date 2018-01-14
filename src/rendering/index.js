import * as defaultRenderers from './renderers';

export const renderers = new Map();

export const registerRenderer = (name, render) => {
  if (!name) throw new Error('Provide a transformation name');
  if (!render) throw new Error('Provide a transformation function');
  if (typeof(render) !== 'function') throw new Error('Transformation should be a function');
  if (renderers.has(name)) console.warn(`Transformation called ${name} is already registered and will be overrided`);

  renderers.set(name, render);
};

Object.keys(defaultRenderers).forEach(render => registerRenderer(render, defaultRenderers[render]));
