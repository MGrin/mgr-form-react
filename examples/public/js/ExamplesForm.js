import React, { PropTypes } from 'react';

import Form from '../../../index.js';
import * as forms from './forms';

class ExamplesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      form: forms[Object.keys(forms)[0]]
    };

    this.handleExampleFormUpdate = this.handleExampleFormUpdate.bind(this);
  }

  handleExampleFormUpdate(data) {
    this.setState({
      form: forms[data.title]
    });
  }

  render() {
    const { form } = this.state;

    const controls = [{
      element: 'select',
      id: 'Examples.Select',
      label: 'An example form:',
      options: Object.keys(forms).filter(form => form ? true : false),
      data: 'title'
    }];

    const submit = {
      text: 'Update',
      cb: this.handleExampleFormUpdate
    };

    return (<div>
      <Form controls={controls} submit={submit} />
      <Form
        controls={form.controls}
        errors={form.errors}
        submit={form.submit}
        editable={form.editable} />
    </div>);
  }
}

export default ExamplesForm;
