export default {
  controls: [{
    element: 'textarea',
    id: 'Simple.Textarea.Example',
    label: 'Textarea label:',
    type: 'text'
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
        element: 'textarea',
        id: 'Simple.Textarea.Example',
        label: 'Textarea label:',
        type: 'text'
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
