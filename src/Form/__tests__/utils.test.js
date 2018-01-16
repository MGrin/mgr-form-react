import * as utils from '../utils';
import { validators as store, registerValidator } from '../../validation';

registerValidator('empty', (val) => val ? 'Should be empty' : null);

describe('Form component utility functions', () => {
  describe('validateField', () => {
    const fieldName = 'field';

    test('should return null as error if no validators are present', () => {
      const res = utils.validateField(fieldName, null, store)('value');
      expect(res).toEqual({ 'field': null});
    });

    test('should return null as error if field is valid', () => {
      const res = utils.validateField(fieldName, 'required', store)('value');
      expect(res).toEqual({ 'field': null });
    });

    test('should return array of errors in case when field is not valid', () => {
      const res1 = utils.validateField(fieldName, 'required', store)('');
      expect(res1).toEqual({ 'field': ['is required'] });

      const res2 = utils.validateField(fieldName, ['empty', 'numbers'], store)('asd');
      expect(res2).toEqual({ 'field': ['Should be empty', 'Should be a number'] });

      const res3 = utils.validateField(fieldName, ['numbers', 'empty'], store)('asd');
      expect(res3).toEqual({ 'field': ['Should be a number', 'Should be empty'] });
    });
  });

  describe('constructStateFromDescription', () => {
    test('should construct state from one field', () => {
      const fields = [{
        name: 'field',
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };
      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with default value', () => {
      const fields = [{
        name: 'field',
        defaultValue: 'default value',
      }];
      const res = {
        values: {
          field: 'default value',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with disable function (false)', () => {
      const fields = [{
        name: 'field',
        disable: () => false,
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with disable function (true)', () => {
      const fields = [{
        name: 'field',
        disable: () => true,
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: true,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with hide function (false)', () => {
      const fields = [{
        name: 'field',
        hide: () => false,
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with hide function (true)', () => {
      const fields = [{
        name: 'field',
        hide: () => true,
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: true,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with validator that is valid', () => {
      const fields = [{
        name: 'field',
        defaultValue: 'value',
        validators: 'required',
      }];
      const res = {
        values: {
          field: 'value',
        },
        errors: {
          field: null,
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct state from field with validator that is not valid', () => {
      const fields = [{
        name: 'field',
        validators: 'required',
      }];
      const res = {
        values: {
          field: '',
        },
        errors: {
          field: ['is required'],
        },
        disabled: {
          field: false,
        },
        hidden: {
          field: false,
        },
      };

      expect(utils.constructStateFromDescription({ fields })).toEqual(res);
    });

    test('should construct valid complex state', () => {
      const description = {
        fields: [{
          name: 'simplestField',
        }, {
          name: 'fieldWithDefaultValue',
          defaultValue: 'default value',
        }, {
          name: 'fieldWithDisableFunctionFalseByDefault',
          disable: () => false,
        }, {
          name: 'fieldWithDisableFunctionTrueByDefault',
          disable: () => true,
        }, {
          name: 'fieldWithHideFunctionFalseByDefault',
          hide: () => false,
        }, {
          name: 'fieldWithHideFunctionTrueByDefault',
          hide: () => true,
        }, {
          name: 'fieldThatIsNotValid',
          validators: 'required',
        }],
      };
      const res = {
        values: {
          simplestField: '',
          fieldWithDefaultValue: 'default value',
          fieldWithDisableFunctionFalseByDefault: '',
          fieldWithDisableFunctionTrueByDefault: '',
          fieldWithHideFunctionFalseByDefault: '',
          fieldWithHideFunctionTrueByDefault: '',
          fieldThatIsNotValid: '',
        },
        errors: {
          simplestField: null,
          fieldWithDefaultValue: null,
          fieldWithDisableFunctionFalseByDefault: null,
          fieldWithDisableFunctionTrueByDefault: null,
          fieldWithHideFunctionFalseByDefault: null,
          fieldWithHideFunctionTrueByDefault: null,
          fieldThatIsNotValid: ['is required'],
        },
        disabled: {
          simplestField: false,
          fieldWithDefaultValue: false,
          fieldWithDisableFunctionFalseByDefault: false,
          fieldWithDisableFunctionTrueByDefault: true,
          fieldWithHideFunctionFalseByDefault: false,
          fieldWithHideFunctionTrueByDefault: false,
          fieldThatIsNotValid: false,
        },
        hidden: {
          simplestField: false,
          fieldWithDefaultValue: false,
          fieldWithDisableFunctionFalseByDefault: false,
          fieldWithDisableFunctionTrueByDefault: false,
          fieldWithHideFunctionFalseByDefault: false,
          fieldWithHideFunctionTrueByDefault: true,
          fieldThatIsNotValid: false,
        },
      };
      expect(utils.constructStateFromDescription(description)).toEqual(res);
    });
  });

  describe('changeStatus', () => {
    test('should return false if no status function is present', () => {
      const successCb = jest.fn(() => {});
      expect(utils.changeStatus('noname', { values: {}, errors: {} }, successCb)({ })).toBeFalsy();
      expect(successCb).not.toHaveBeenCalled();
    });

    test('should call the status function and return its result', () => {
      const statusTrue = jest.fn(() => true);
      const statusFalse = jest.fn(() => false);
      const field = {
        statusTrue,
        statusFalse,
      };
      const trueRes = utils.changeStatus('statusTrue', { values: {}, errors: {} })(field);
      expect(trueRes).toBeTruthy();
      expect(statusTrue).toHaveBeenCalled();
      const falseRes = utils.changeStatus('statusFalse', { values: {}, errors: {} })(field);
      expect(falseRes).toBeFalsy();
      expect(statusFalse).toHaveBeenCalled();
    });

    test('should call the successCb function is result of status change is true', () => {
      const statusTrue = jest.fn(() => true);
      const statusFalse = jest.fn(() => false);

      const state = { values: {}, errors: {} };

      const successCb = jest.fn(() => {});
      
      const field = {
        statusTrue,
        statusFalse,
      };

      const trueRes = utils.changeStatus('statusTrue', state, successCb)(field);
      expect(trueRes).toBeTruthy();
      expect(successCb).toHaveBeenCalledTimes(1);
      expect(successCb).toHaveBeenCalledWith(field);

      const falseRes = utils.changeStatus('statusFalse', state, successCb)(field);
      expect(falseRes).toBeFalsy();
      expect(successCb).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateStateAfterValidation', () => {
    const fields = [{
      name: 'controlField',
      defaultValue: 'control field value',
    }, {
      name: 'willBeDisabled',
      defaultValue: 'will be disabled value',
      validators: ['empty'],
      disable: () => true,
    }, {
      name: 'willBeHidden',
      defaultValue: 'will be hidden value',
      validators: ['empty'],
      hide: () => true,
    }, {
      name: 'willBeDisabledAndHidden',
      defaultValue: 'will be disabled and hidden value',
      validators: ['empty'],
      disable: () => true,
      hide: () => true,
    }];

    const state = utils.constructStateFromDescription({ fields });
    const validState = {
      values: {
        willBeHidden: '',
        willBeDisabledAndHidden: '',
      },
      errors: {
        willBeDisabled: null,
        willBeHidden: null,
        willBeDisabledAndHidden: null, 
      },
      disabled: {
        controlField: false,
        willBeDisabled: true,
        willBeHidden: false,
        willBeDisabledAndHidden: true,
      },
      hidden: {
        controlField: false,
        willBeDisabled: false,
        willBeHidden: true,
        willBeDisabledAndHidden: true,
      },
    };

    test('should clean errors if field is disabled or hidden', () => {
      const newState = utils.updateStateAfterValidation(state, { fields });
      expect(newState).toEqual(validState);
    });
  });

  describe('isFormValid', () => {
    test('should return true if all values in object are null', () => {
      expect(utils.isFormValid({ a: null, b: null, c: null })).toBeTruthy();
    });

    test('should return true if at least one value in object is not null', () => {
      expect(utils.isFormValid({ a: null, b: 'a', c: null })).toBeFalsy();
    });

    test('should return true if all values in object are not null', () => {
      expect(utils.isFormValid({ a: 'a', b: 'a', c: 'a' })).toBeFalsy();
    });
  });
});
