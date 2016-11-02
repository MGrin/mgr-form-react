export default {
  controls: [{
    element: 'input',
    id: 'Custom.Multifield.Defaults.Input.Example',
    label: 'Input label:',
    type: 'text',
    default: 'Default input value',
  }, {
    element: 'textarea',
    id: 'Custom.Multifield.Defaults.Textarea.Example',
    label: 'Textarea label:',
    type: 'text',
    default: 'Default textarea value',
  }, {
    element: 'select',
    id: 'Custom.Multifield.Defaults.Select.Example',
    label: 'Select label:',
    options: ['Option 1', 'Option 2'],
    default: 'Option 2',
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
        id: 'Custom.Multifield.Defaults.Input.Example',
        label: 'Input label:',
        type: 'text',
        default: 'Default input value',
      }, {
        element: 'textarea',
        id: 'Custom.Multifield.Defaults.Textarea.Example',
        label: 'Textarea label:',
        type: 'text',
        default: 'Default textarea value',
      }, {
        element: 'select',
        id: 'Custom.Multifield.Defaults.Select.Example',
        label: 'Select label:',
        options: ['Option 1', 'Option 2'],
        default: 'Option 2',
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
