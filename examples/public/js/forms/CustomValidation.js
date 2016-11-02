export default {
  controls: [{
    element: 'input',
    id: 'Custom.Multifield.Validation.Input.Example',
    label: 'Input label:',
    type: 'text',
    validator: /^[0-9A-C]{1,10}$/,
    formatError: 'Value is not valid! Validation regexp: /^[0-9A-C]{1,10}$/'
  }, {
    element: 'textarea',
    id: 'Custom.Multifield.Validation.Textarea.Example',
    label: 'Textarea label:',
    validator: /^[0-9A-C]{1,10}$/,
    formatError: 'Value is not valid! Validation regexp: /^[0-9A-C]{1,10}$/'
  }],

  submit: {
    text: 'Noop submit (see console)',
    cb: (data) => {
      console.log(data);
    },
    clean: true
  },

  sourceCode: `
    {
      controls: [{
        element: 'input',
        id: 'Custom.Multifield.Validation.Input.Example',
        label: 'Input label:',
        type: 'text',
        validator: /^[0-9A-C]{1,10}$/,
        formatError: 'Value is not valid! Validation regexp: /^[0-9A-C]{1,10}$/'
      }, {
        element: 'textarea',
        id: 'Custom.Multifield.Validation.Textarea.Example',
        label: 'Textarea label:',
        validator: /^[0-9A-C]{1,10}$/,
        formatError: 'Value is not valid! Validation regexp: /^[0-9A-C]{1,10}$/'
      }],

      submit: {
        text: 'Noop submit (see console)',
        cb: (data) => {
          console.log(data);
        },
        clean: true
      }
    }
  `
}
