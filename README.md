# mgr-form-react
[![Coverage Status](https://coveralls.io/repos/github/MGrin/mgr-form-react/badge.svg)](https://coveralls.io/github/MGrin/mgr-form-react)

## Version until 0.0.5 are DEPRICATED!!! No support will follow.
Current package is under development and has the same name. It has breaking changes (basically it is rewritten from scratch, so nothing left from old version).

# Introduction
`mgr-form-react` allows you to create complicated forms based on JSON description.
The form description can be provided via network and so be stored on a server, be loaded from client side and even be shared between clients.

Rendering of form's inputs is done by "renderes". `mgr-form-react` provides you some default renderers such as `input`, `select`, `checkbox` etc. but you can define and register your own renderers during the application runtime. In the same way you can add validations and transformations to your fields by registering them and using in the field description. Also, you can define `disable` and `hide` functions on a field level that will define when the field should be disabled or hidden.

The submission part of the form is rendered in the same way that form's fields. You can use the default renderer for the submission (showing just a button) or create your custom submission renderer.

To know more about capabilities of `mgr-form-react` please refer to the documentation.

# Example

```js
import Form from 'mgr-form-react';

const description = {
  fields: [{
    name: 'username',
    renderer: 'input',
    validators: 'required',
    transformations: 'trim',

    placeholder: 'Username'
  }, {
    name: 'email',
    renderer: 'input',
    validators: ['required', 'email'],
    transformations: 'trim',

    placeholder: 'email',
  }, {
    name: 'age',
    label: 'Your age',
    renderer: 'selector',
    defaultValue: 1,

    options: [{
      label: '0-18',
      value: 0,
    }, {
      label: '19-45',
      value: 1,
    }, {
      label: '46-100',
      value: 2,
    }],
  }],
  submission: {
    renderer: 'button',
    label: 'Submit your data',
  },
};

export default () => (
  <Form description={description} />
);
```

To see more examples, please refer to the documentation.

# Documentation
Coming soon