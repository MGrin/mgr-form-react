import * as defaultFieldRenderers from './fields';
import * as defaultSubmissionRenderers from './submissions';
import { registerToStore } from '../utils';

export const fieldRenderers = new Map();
export const submissionRenderers = new Map();

export const registerFieldRenderer = (name, render) => registerToStore(fieldRenderers, 'Field renderer', name, render);
export const registerSubmissionRenderer = (name, render) => registerToStore(submissionRenderers, 'Submission renderer', name, render);

Object.keys(defaultFieldRenderers).forEach(render => registerFieldRenderer(render, defaultFieldRenderers[render]));
Object.keys(defaultSubmissionRenderers).forEach(render => registerSubmissionRenderer(render, defaultSubmissionRenderers[render]));
