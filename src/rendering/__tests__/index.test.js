import * as entry from '../index';
import * as defaultFieldRenderers from '../fields';
import * as defaultSubmissionRenderers from '../submissions';

describe('rendering package', () => {
  test('should export exactly what it should export',  () => {
    expect(Object.keys(entry)).toEqual(["fieldRenderers", "submissionRenderers", "registerFieldRenderer", "registerSubmissionRenderer"]);
  });

  test('should already have all default renderers registered', () => {
    const keysFields = Array.from(entry.fieldRenderers.keys());
    const keysSubmissions = Array.from(entry.submissionRenderers.keys());
    const defaultsFields = Object.keys(defaultFieldRenderers);
    const defaultsSubmissions = Object.keys(defaultSubmissionRenderers);

    expect(keysFields).toHaveLength(defaultsFields.length);
    defaultsFields.forEach(trans => expect(keysFields).toContainEqual(trans));

    expect(keysSubmissions).toHaveLength(defaultsSubmissions.length);
    defaultsSubmissions.forEach(trans => expect(keysSubmissions).toContainEqual(trans));
  });

  test('should register new transformation', () => {
    const fn = () => {};
    entry.registerFieldRenderer('test', fn);
    entry.registerSubmissionRenderer('test', fn);
    expect(entry.fieldRenderers.get('test')).toBe(fn);
    expect(entry.submissionRenderers.get('test')).toBe(fn);
  });
});
