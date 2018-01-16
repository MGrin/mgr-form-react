import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import {
  constructStateFromDescription,
  validateField,
  updateStateAfterValidation,
  isFormValid,
  getSubmissionProps,
  cleanFieldProps,
} from './utils';
import { compose } from '../utils';
import { fieldRenderers, submissionRenderers } from '../rendering';
import { transformations as transformationsMap } from '../transformation';
import { validateFormDescription } from '../validation';

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
    this.processInitialProps(props);
  }

  componentWillMount() {
    this.processInitialProps(this.props);
  }

  // componentDidCatch(error) {
  //   console.error(error);
  // }

  processInitialProps = ({ description, validate }) => {
    if (validate) validateFormDescription({ fields: description.fields, submission: description.submission });

    initialState = {
      ...initialState,
      ...constructStateFromDescription(description),
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

  validateField = (field, validatorsSource) => (val) => {
    const value = typeof(val) === 'string' ? val : this.state.values[field];
    const errorsUpdate = validateField(field, validatorsSource)(value);

    this.dispatch('errors', errorsUpdate, this.updateStateAfterValidation);
  }

  updateStateAfterValidation = (state) => {
    const stateUpdates = updateStateAfterValidation(state, this.props.description);
    this.setState(currentState => ({
      values: {
        ...currentState.values,
        ...stateUpdates.values,
      },
      errors: {
        ...currentState.errors,
        ...stateUpdates.errors,
      },
      disabled: {
        ...currentState.disabled,
        ...stateUpdates.disabled,
      },
      hidden: {
        ...currentState.hidden,
        ...stateUpdates.hidden,
      },
    }));
  }

  onValueChange = (field, transform) => value => {
    this.dispatch('values', {
      [field]: transform(value),
    });
  }

  clear = () => {
    this.setState(initialState);
  }

  canSubmit = () => isFormValid(this.state.errors);

  render() {
    const { errors, values, disabled, hidden } = this.state;
    const { fields, submission } = this.props.description;
    const { classNames } = this.props;

    const Submission = submissionRenderers.get(submission.renderer);
    const submissionProps = getSubmissionProps(submission);
    
    return (
      <div className={`${classNames.form} ${classNames.form}-wrapper`}>
        {fields.map(({ name, label, renderer, transformations, validators, ...rawFieldProps}, idx) => {
          const fieldProps = cleanFieldProps(rawFieldProps);
          const rendererFunction = fieldRenderers.get(renderer);

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
              render={rendererFunction}
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
