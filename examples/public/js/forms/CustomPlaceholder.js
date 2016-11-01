export default {
  controls: [{
    element: 'input',
    id: 'Custom.Multifield.Placeholders.Input.Example',
    label: 'Input label:',
    type: 'text',
    placeholder: 'Input placeholder',
  }, {
    element: 'textarea',
    id: 'Custom.Multifield.Placeholders.Textarea.Example',
    label: 'Textarea label:',
    type: 'text',
    placeholder: 'Textarea placeholder',
  }],

  submit: {
    text: 'Noop submit (see console)',
    cb: (data) => {
      console.log(data);
    },
    clean: true
  }
}
