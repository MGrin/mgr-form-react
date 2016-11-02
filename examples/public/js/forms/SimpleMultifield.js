export default {
  controls: [{
    element: 'input',
    id: 'Simple.Multifield.Input.Example',
    label: 'Input label:',
    type: 'text'
  }, {
    element: 'textarea',
    id: 'Simple.Multifield.Textarea.Example',
    label: 'Textarea label:',
    type: 'text'
  }, {
    element: 'select',
    id: 'Simple.Multifield.Select.Example',
    label: 'Select label:',
    options: ['Option 1', 'Option 2']
  }],

  submit: {
    text: 'Noop submit (see console)',
    cb: (data) => {
      console.log(data);
    }
  },

  sourceCode: `
    {
      controls: [{
        element: 'input',
        id: 'Simple.Multifield.Input.Example',
        label: 'Input label:',
        type: 'text'
      }, {
        element: 'textarea',
        id: 'Simple.Multifield.Textarea.Example',
        label: 'Textarea label:',
        type: 'text'
      }, {
        element: 'select',
        id: 'Simple.Multifield.Select.Example',
        label: 'Select label:',
        options: ['Option 1', 'Option 2']
      }],

      submit: {
        text: 'Noop submit (see console)',
        cb: (data) => {
          console.log(data);
        }
      }
    }
  `
}
