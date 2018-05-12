# Form component
Form is the only React component exported by this package. It is exported by default.

## Example
```js
import Form from 'mgr-form-react';

export default () => (
  <Form
    description={formDescription}
    validate={false}
    classNames={{
      form: 'my-form-css-prefix',
      field: 'my-field-css-prefix',
      submission: 'my-submission-css-prefix',
    }} />
);
```

## PropTypes
* `description`: *required*. Form description object. For the shape of this object (which is quite complicated) please look in [description validation documentation](https://github.com/MGrin/mgr-form-react/tree/master/src/validation/README.md#Description).

  Example:
  ```js
  const customFieldProps = {
    /* props to be passed to your custom renderer */
  };

  const description = {
    fields: [{
      name: 'username',
      renderer: 'input',
      validators: 'required',
      transformations: 'trim',

      placeholder: 'Username',
    }, {
      name: 'email',
      renderer: 'input',
      validators: ['required', 'email'],
      transformations: 'trim',

      placeholder: 'email',
    }, {
      name: 'age',
      label: 'Your age',
      renderer: 'select',
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
    }, {
      name: 'range',
      label: 'Some range',
      renderer: 'my-custom-range-renderer',
      
      validators: 'my-custom-validator',
      
      ...customFieldProps,
    }],
    submission: {
      renderer: 'button',
      label: 'Click on me',
    },
  }
  ```
* `validate`: Boolean indicating if the form description should be validated. Default: true. Used when you validate the description on your side and so you tell to component not to revalidate it before rendering. **NOTE:** if you put false here and pass an invalid form description to the Form, the behavior is not defined (basically the app will crash)

* `classNames`: Object. Here is the shape of that object:
```js
{
  form: PropTypes.string,
  field: PropTypes.string,
  submission: PropTypes.string,
}
```

form value provides a css class name prefix to use in form, field - prefix for every field, submission - prefix for submission.

Here is the abstract dom tree with classes that will be rendered:

```
  "${classNames.form} ${classNames.form}-wrapper"
  |-for every field:
  |--"${classNames.field} ${classNames.field}-wrapper ${classNames.field}-${fieldNameWithoutSpaces}-wrapper"
  |-----"${classNames.field} ${classNames.field}-label ${classNames.field}-${fieldNameWithoutSpaces}-label"
  |-----"${classNames.field}-renderer-wrapper ${classNames.field}-${fieldNameWithoutSpaces}-renderer-wrapper"
  |-----"${classNames.field} ${classNames.field}-error-label ${classNames.field}-${fieldNameWithoutSpaces}-error-label"

  |--"${submission} ${submission}-wrapper"
```