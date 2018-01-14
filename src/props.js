import PropTypes from 'prop-types';

export const FIELD = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  renderer: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  validators: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  transformations: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  disable: PropTypes.func,
  hide: PropTypes.func,
});

export const SUBMISSION = PropTypes.shape({
  renderer: PropTypes.string.isRequired,
});

export const DESCRIPTION = PropTypes.shape({
  fields: PropTypes.arrayOf(FIELD).isRequired,
  submission: SUBMISSION.isRequired,
});

export const FIELD_RENDERER_PROPS = {
  value: PropTypes.any,
  className: PropTypes.string,
  fieldNameAsCss: PropTypes.string,
  validate: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export const SUBMISSION_RENDERER_PROPS = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  clear: PropTypes.func.isRequired,
};
