import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import { compose, transformToArray } from '../utils';
import { renderers as renderersMap} from '../rendering';
import { transformations as transformationsMap } from '../transformation';
import { validators as validatorsMap, validateFormDescription } from '../validation';

import { DESCRIPTION } from '../props';

const composeTransformations = compose(transformationsMap);

let initialState = {
  values: {},
  errors: {},
  disabled: {},
  hidden: {},
};

export default class MGRForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(props) {
    this.validateProps(props);
  }

  componentWillMount() {
    this.validateProps(this.props);
  }

  validateProps = ({ description, validate }) => {
    if (validate) validateFormDescription({ fields: description.fields, submission: description.submission });

    const values = description.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue || '',
    }), {});

    const errors = description.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: this.validateField(field.name, field.validators, false)(values[field.name]),
    }), {});

    const disabled = description.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.disable ? field.disable(values, errors) : false,
    }), {});

    const hidden = description.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.hide ? field.hide(values, errors) : false,
    }), {});

    initialState = {
      ...initialState,
      values,
      errors,
      disabled,
      hidden,
    };

    this.setState(initialState);
  }

  dispatch = (store, update, cb = () => {}) => {
    this.setState(state => ({
      ...state,
      [store]: {
        ...state[store],
        ...update,
      },
    }), () => cb(this.state));
  }

  validateField = (field, validatorsSource = [], dispatch = true) => (val) => {
    const validators = transformToArray(validatorsSource);
    
    const value = val || this.state.values[field];
    let error = '';

    for (let i = 0; i < validators.length; i++) {
      const err = validatorsMap.get(validators[i])(value);
      if (err) error = error + '\n' + err;
    }

    const errorsUpdate = {
      [field]: error ? error : null,
    };

    if (dispatch) this.dispatch('errors', errorsUpdate, this.updateHiddenAndDisabled);
    else return errorsUpdate[field];
  }

  updateHiddenAndDisabled = (state) => {
    const { fields } = this.props.description;
    let valuesUpdate = {};
    let errorsUpdate2 = {};

    const isDisabled = (field) => {
      const res = field.disable(state.values, state.errors);
      if (res) errorsUpdate2[field.name] = null;

      return res;
    };

    const isHidden = (field) => {
      const res = field.hide(state.values, state.errors);
      if (res) {
        errorsUpdate2[field.name] = null;
        valuesUpdate[field.name] = '';
      }

      return res;
    }

    const disabledUpdate = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.disable ? isDisabled(field) : false,
    }), {});

    const hiddenUpdate = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.hide ? isHidden(field) : false,
    }), {});

    this.dispatch('disabled', disabledUpdate);
    this.dispatch('hidden', hiddenUpdate);
    this.dispatch('values', valuesUpdate);
    this.dispatch('errors', errorsUpdate2);
  }

  onValueChange = (field, transform) => value => {
    this.dispatch('values', {
      [field]: transform(value),
    });
  }

  clear = () => {
    this.setState(initialState);
  }

  canSubmit = () => {
    const errors = { ...this.state.errors };
    return Object
      .keys(errors)
      .reduce((acc, field) => !(errors[field]) && acc, true);
  }

  render() {
    const { errors, values, disabled, hidden } = this.state;
    const { fields, submission } = this.props.description;
    const { classNames } = this.props;

    const Submission = renderersMap.get(submission.renderer);
    const submissionProps = { ...submission };
    delete submissionProps.renderer;
    
    return (
      <div className={`${classNames.form} ${classNames.form}-wrapper`}>
        {fields.map(({ name, label, renderer, transformations, validators, ...fieldProps}, idx) => {
          delete fieldProps.defaultValue;
          delete fieldProps.disable;
          delete fieldProps.hide;

          return (
            <Field
              key={`field-${name}-${idx}`}
              name={name}
              label={label || name}
              value={values[name]}
              error={errors[name]}
              disabled={disabled[name]}
              hidden={hidden[name]}
              className={classNames.field}
              render={renderersMap.get(renderer)}
              validate={this.validateField(name, validators)}
              onValueChange={this.onValueChange(name, composeTransformations(transformations))}
              {...fieldProps}
              />
          )
        })}
        <div className={`${classNames.submission} ${classNames.submission}-wrapper`}>
          <Submission
            className={classNames.submission}
            data={values}
            disabled={!this.canSubmit()}
            clear={this.clear}
            {...submissionProps} />
        </div>
      </div>
    );
  }
}

MGRForm.propTypes = {
  description: DESCRIPTION.isRequired,
  classNames: PropTypes.shape({
    form: PropTypes.string,
    field: PropTypes.string,
    submission: PropTypes.string,
  }),
  validate: PropTypes.bool,
};

MGRForm.defaultProps = {
  validate: true,
  classNames: {
    form: 'mgr-form',
    field: 'mgr-form-field',
    submission: 'mgr-form-submission',
  }
};
