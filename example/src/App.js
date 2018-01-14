import React, { Component } from 'react';
import './App.css';
import Form from './lib';

const formDescription = {
  fields: [{
    name: 'simple',
    label: 'Simple input',
    renderer: 'input',
    placeholder: 'simple placeholder',
    disable: (data, errors) => errors['email'] ? true : false,
  }, {
    name: 'email',
    label: 'Email input',
    renderer: 'input',
    defaultValue: 'mr6r1n@gmail',
    validators: 'email',
  }, {
    name: 'required',
    label: 'Required input',
    renderer: 'input',
    placeholder: 'required',
    validators: 'required',
  }, {
    name: 'simpleSelect',
    label: 'Select value',
    renderer: 'select',
    options: [{
      label: 'Value number 1',
      value: 'value1',
    }, {
      label: 'Value number 2',
      value: 'value2',
    }, {
      label: 'Value number 3',
      value: 'value3',
    }],
    hide: (data, errors) => errors['required'] ? true : false,
  }],
  submission: {
    renderer: 'submissionButton',
    label: 'Lalala',
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form description={formDescription} />
      </div>
    );
  }
}

export default App;
