export default {
  controls: [{
    element: 'input',
    id: 'Custom.Multifield.DataField.Input.Example',
    label: 'Input label:',
    type: 'text',
    data: 'input_value',
  }, {
    element: 'textarea',
    id: 'Custom.Multifield.DataField.Textarea.Example',
    label: 'Textarea label:',
    type: 'text',
    data: 'textarea_value',
  }, {
    element: 'select',
    id: 'Custom.Multifield.DataField.Select.Example',
    label: 'Select label:',
    options: ['Option 1', 'Option 2'],
    data: 'select_value',
  }],

  submit: {
    text: 'Noop submit (see console)',
    cb: (data) => {
      console.log('Pay attention to the received object keys! They are now defined in the form description.');
      console.log(data);
    },
    clean: true
  }
}
