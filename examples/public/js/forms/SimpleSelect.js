export default {
  controls: [{
    element: 'select',
    id: 'Simple.Select.Example',
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
        element: 'select',
        id: 'Simple.Select.Example',
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
