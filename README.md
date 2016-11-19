# mgr-form-react
Simple react form component. Generates a form based on json description

## Example: [mgr-form-react](https://mgrin.github.io/mgr-form-react/)

# How to install
```
npm install mgr-form-react --save
```

# How to use
Since it is a React module, I suppose you have the webpack and bable configured.
## Minimal configurations example:
```js
import React from 'react';
import Form from 'mgr-form-react';

const TestComponent = () => {
  const controls = [
    {
      element: 'input',
      id: 'Signup.Client.Form.Control.Name',
      label: 'Client name',
      type: 'text'
    }, {
      element: 'select',
      id: 'Signup.Client.Form.Control.Language',
      label: 'Client language',
      options: ['en', 'fr', 'it', 'de', 'ru', 'es']
    }
  ];

  const submit = {
    text: 'Submit button text',
    cb: (data) => {
      console.log(data);
    }
  };

  const editable = true;

  return <Form controls={controls}
               submit={submit}
               errors={errors}
               editable={editable} />;
}

export default TestComponent;
```

## Full configurations example:
```js
import React from 'react';
import Form from 'mgr-form-react';

const TestComponent = () => {
  const controls = [
    {
      element: 'input',
      id: 'Signup.Client.Form.Control.Name',
      label: 'Client name',
      placeholder: 'Client name',
      default: 'Default name value',
      type: 'text',
      data: 'name',
      validator: /^[A-Za-z0-9\s]{3,30}$/,
      formatError: 'Wrong name format',
      class: 'custom-input-class'
    }, {
      element: 'select',
      id: 'Signup.Client.Form.Control.Language',
      label: 'Client language',
      options: ['en', 'fr', 'it', 'de', 'ru', 'es'],
      default: 'en',
      data: 'language',
      class: 'custom-select-class'
    }
  ];

  const submit = {
    text: 'Submit button text',
    cb: (data) => {
      console.log(data);
    },
    clean: true
  };

  const errors = {
    'Signup.Client.Form.Control.Name': 'Name field error that is generated by someone outside of the form (e.g. server response error)',
    general: 'A general error that will be shown under the form itself'
  };

  const editable = true;

  return <Form controls={controls}
               submit={submit}
               errors={errors}
               editable={editable} />;
}

export default TestComponent;
```

# Documentation
## React component properties
* `controls`: `PropTypes.array.isRequired`:
An ordered array of controls that should be rendered inside the form.
Every array element should be an object containing following fields:
  * element: *String*, **required**.
  Possible values: `'input'`, `'select'`, `'textarea'`.
  Defines the form control element.
  * id: *String*, **required**.
  Sets the id to the form control DOM element.
  * label: *String*, **required**.
  Defines the text shown in the label near the form control.
  * default: *String*.
  Default: `null` for `element = 'input'`, `options[0]` for `element = 'select'`.
  Defines the default value of the form control.
  * data: *String*. Default: `id` field
  Defines the key name which will be used in the data object passed to the submit callback function.
  * class: *String*.
  Defines the CSS class that will be used for this form control.
  * options: _Array[String]_, **required**.
  Defines possible options for the select form control.
  Applicable only when `element = 'select'`.
  * placeholder: *String*. Default: `null`
  Defines the placeholder.
  Applicable only when `element = 'input'` and `element = 'textarea'`.
  * type: *String*.
  Possible values: [Input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type).
  Default: `text`.
  Defines the input type attribute.
  Applicable only when `element = 'input'` and `element = 'textarea'`.
  * validator: _RegExp_.
  Defines the RegExp that validates the content of the form control.
  Applicable only when `element = 'input'` and `element = 'textarea'`.
  * formatError: *String*. Default: `'Wrong format'`.
  Defines the error message that will be shown if the form control value is not validated by the validator RegExp.
  Applicable only when `element = 'input'` and `element = 'textarea'`.
* `submit`: `PropTypes.object.isRequired`
An object defining the look and behavior of the submit button.
Should contain following fields:
  * text: *String*, **required**.
  Defines the text that will be shown on the Submit button.
  * cb: *Function*, **required**.
  Defines the callback function that will be called on form submit.
  The function should take one argument, `data`, which is an object containing form values associated to the control's id or to the data field's value of the control.
  * class: *String*.
  Defines the CSS class that will be used for the submit button.
  * clean: *Boolean*.
  Defines if the form should be cleaned up to default values after submit.
* `errors`: `PropTypes.object`
An object containing errors that should be shown on the form.
You can define one error per one control by putting this error into your errors object under the control's id key.
Also you can defina a global form error under the `general` key which will be rendered near the submit button.
Example:
```js
{
  'Signup.Client.Form.Control.Name': 'Name field error that is generated by someone outside of the form (e.g. server response error)',
  general: 'A general error that will be shown under the form itself'
}
```
* `editable`: `PropTypes.bool`
Defines if the form is editable or not.
* `className`: `PropTypes.string`
CSS class that will be appended to the `mgrform-form` wrapper class

## Styling
The form has the following structure in CSS:
* `.mgrform-form`: wrapper class, can be suffixed by a custom class from component properties.
  * `.mgrform-form-control`: one control wrapper class.
  Can be suffixed by the `.mgrform-has-error` class in case of having erro for this control and by user defined class in the controls array.
    - `label` element that contains label text for the form control.
    - `input` or `select` or `textarea` element.
    - `label` element that is shown only if there is an error for this form control.
  * `.mgrform-submit-btn`: submit button class. Can be suffixed by the user defined class.
  * `.mgrform-error`: general error div class.
