# mgr-form-react
## Work in progress, please do not consider it yet as a working module
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
This package exports a `<Form />` component by default and some usefull functions:

* [Form](https://github.com/MGrin/mgr-form-react/tree/master/src/Form) - component exported by default. It is the only exported react component taking the form description in props. Refer to its documentation for more information.
* [validateFormDescription](https://github.com/MGrin/mgr-form-react/tree/master/src/validation/README.md#Description) - function that validates the form description. You can use it to validate a form description provided by server or vie third party provider. Read more about this validation function and the shape of description in the validation documentation.
* [registerValidator](https://github.com/MGrin/mgr-form-react/tree/master/src/validation/README.md#Register) - function that registers the validation function to be used in a form. Refer to its documentation for more information.
* [registerTransformation](https://github.com/MGrin/mgr-form-react/tree/master/src/transformation/README.md) - function that registers the transformation function to be used in a form. Refer to its documentation for more information.
* [registerFieldRenderer](https://github.com/MGrin/mgr-form-react/tree/master/src/rendering/README.md#Field) - function that registers the rendering function to be used in a form in order to render a field. Refer to its documentation for more information.
* [registerSubmissionRenderer](https://github.com/MGrin/mgr-form-react/tree/master/src/rendering/README.md#Submission) - function that registers the rendering function to be used in a form in order to render the submission part. Refer to its documentation for more information.
* [FIELD_RENDERER_PROPS, SUBMISSION_RENDERER_PROPS](https://github.com/MGrin/mgr-form-react/tree/master/src/rendering/README.md#PropTypes) - Prop. types definitions that describe minimal set of props that should be passed to a rendering functions. Refer to its documentation for more information.
