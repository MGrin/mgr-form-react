import Form from './Form';
if (!process.env.TESTING) require('./styles.css');

export default Form;
export { validateFormDescription, registerValidator } from './validation';
export { registerTransformation } from './transformation';
export { registerFieldRenderer, registerSubmissionRenderer } from './rendering';
export { FIELD_RENDERER_PROPS, SUBMISSION_RENDERER_PROPS } from './props';