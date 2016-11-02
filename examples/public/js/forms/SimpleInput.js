export default {
  controls: [{
    element: 'input',
    id: 'Simple.Input.Example',
    label: 'Input label:',
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
        element: 'input',
        id: 'Simple.Input.Example',
        label: 'Input label:',
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
