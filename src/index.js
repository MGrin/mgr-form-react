import React, { PropTypes } from 'react';

const initStateMap = (state, errors = {}) => (control) => {
  const error = control.validator && !control.validator.test(control.default || '')
    ? control.formatError || 'Wrong format'
    : errors[control.id];

  switch (control.element) {
    case 'input': {
      state[control.id] = {
        value: control.default || '',
        error
      };
      break;
    }
    case 'select': {
      state[control.id] = {
        value: control.default || control.options[0],
        error
      };
      break;
    }
    default: {
      console.warning(`Control ${control.element} is unknown.`);
    }
  }
};

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    const errors = props.errors || {};

    this.state = {};
    props.controls.forEach(initStateMap(this.state, errors));

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const state = {};
    const errors = nextProps.errors || {};

    nextProps.controls.forEach(initStateMap(state, errors));

    this.setState(state);
  }

  handleInput(id) {
    return (e) => {
      const newState = {};
      const value = e.target.value;
      const control = this.props.controls.find(cntrl => cntrl.id === id);
      if (!control) return;

      const validator = control.validator;
      let error;
      if (value && validator && !validator.test(value)) {
        error = control.formatError || 'Wrong format';
      }

      newState[id] = {
        value,
        error
      };

      this.setState(newState);
    };
  }

  handleChange(id) {
    return (e) => {
      const newState = {};
      newState[id] = {
        value: e.target.selected
      };

      this.setState(newState);
    };
  }

  handleSubmit() {
    const data = {};

    Object.keys(this.state).forEach((key) => {
      const control = this.props.controls.find(ctrl => ctrl.id === key);
      if (control && control.data) {
        data[control.data] = this.state[key].value;
      }
    });

    return this.props.submit.cb(data);
  }

  render() {
    const props = this.props;

    const { editable, errors } = props;
    const { controls, submit } = props;

    const submittable = Object.keys(this.state).reduce((acc, id) => {
      const control = this.props.controls.find(cntrl => cntrl.id === id);
      if (!control) return acc;

      const validator = control.validator;
      if (validator && !validator.test(this.state[id].value)) {
        return acc + 1;
      }

      return acc;
    }, 0) === 0;

    return (<div className="mgrform-form">
      {controls.map((control) => {
        const controlClassName = `
              mgrform-form-control
              ${this.state[control.id].error ? ' mgrform-has-error ' : ' '}
              ${control.class ? control.class : ''}
            `;

        switch (control.element) {
          case 'input': {
            return (<div className={controlClassName} key={control.id}>
              <label htmlFor={control.id}>{control.label}</label>
              <input
                type={control.type || text}
                placeholder={control.placeholder}
                id={control.id}
                disabled={!editable}
                onInput={this.handleInput(control.id)}
                value={this.state[control.id].value}
                />
              {this.state[control.id].error
                ? <label htmlFor={control.id}>{this.state[control.id].error}</label>
                : <div />}
            </div>);
          }
          case 'select': {
            return (<div className={controlClassName} key={control.id}>
              <label htmlFor={control.id}>{control.label}</label>
              <select
                id={control.id}
                disabled={!editable}
                onChange={this.handleChange(control.id)}
                value={this.state[control.id].value}
                >
                {control.options.map(option => <option key={`${control.id}->${option}`}>{option}</option>)}
              </select>
            </div>);
          }
          default: {
            console.warning(`Control ${control.element} is unknown.`);
            return <div />;
          }
        }
      })}
      <button
        className={`mgrform-submit-btn ${submit.class ? submit.class : ''}`}
        onClick={this.handleSubmit}
        disabled={!submittable}>
        {submit.text}
      </button>
      {errors && errors.general
        ? <div className="mgrform-error">{errors.general}</div>
        : <div />}
    </div>);
  }
}

Form.propTypes = {
  controls: PropTypes.array.isRequired,
  submit: PropTypes.object.isRequired,

  errors: PropTypes.object,
  editable: PropTypes.bool
};

Form.defaultProps = {
  errors: {},
  editable: true
};

