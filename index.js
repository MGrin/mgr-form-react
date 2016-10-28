'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initStateMap = function initStateMap(state) {
  var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (control) {
    var error = control.validator && !control.validator.test(control.default || '') ? control.formatError || 'Wrong format' : errors[control.id];

    switch (control.element) {
      case 'input':
      case 'textarea':
        {
          state[control.id] = {
            value: control.default || '',
            error: error
          };
          break;
        }

      case 'select':
        {
          state[control.id] = {
            value: control.default || control.options[0],
            error: error
          };
          break;
        }

      default:
        {
          console.warn('Control ' + control.element + ' is unknown.');
        }
    }
  };
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    var errors = props.errors || {};

    _this.state = {};
    props.controls.forEach(initStateMap(_this.state, errors));

    _this.handleInput = _this.handleInput.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = {};
      var errors = nextProps.errors || {};

      nextProps.controls.forEach(initStateMap(state, errors));

      this.setState(state);
    }
  }, {
    key: 'handleInput',
    value: function handleInput(id) {
      var _this2 = this;

      return function (e) {
        var newState = {};
        var value = e.target.value;
        var control = _this2.props.controls.find(function (cntrl) {
          return cntrl.id === id;
        });
        if (!control) return;

        var validator = control.validator;
        var error = void 0;
        if (value && validator && !validator.test(value)) {
          error = control.formatError || 'Wrong format';
        }

        newState[id] = {
          value: value,
          error: error
        };

        _this2.setState(newState);
      };
    }
  }, {
    key: 'handleChange',
    value: function handleChange(id) {
      var _this3 = this;

      return function (e) {
        var newState = {};
        newState[id] = {
          value: e.target.selected
        };

        _this3.setState(newState);
      };
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var _this4 = this;

      var data = {};

      Object.keys(this.state).forEach(function (key) {
        var control = _this4.props.controls.find(function (ctrl) {
          return ctrl.id === key;
        });
        if (control && control.data) {
          data[control.data] = _this4.state[key].value;
        }
      });

      return this.props.submit.cb(data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var props = this.props;

      var editable = props.editable,
          errors = props.errors;
      var controls = props.controls,
          submit = props.submit;


      var submittable = Object.keys(this.state).reduce(function (acc, id) {
        var control = _this5.props.controls.find(function (cntrl) {
          return cntrl.id === id;
        });
        if (!control) return acc;

        var validator = control.validator;
        if (validator && !validator.test(_this5.state[id].value)) {
          return acc + 1;
        }

        return acc;
      }, 0) === 0;

      return _react2.default.createElement(
        'div',
        { className: 'mgrform-form' },
        controls.map(function (control) {
          var controlClassName = '\n              mgrform-form-control\n              ' + (_this5.state[control.id].error ? ' mgrform-has-error ' : ' ') + '\n              ' + (control.class ? control.class : '') + '\n            ';

          switch (control.element) {
            case 'input':
              {
                return _react2.default.createElement(
                  'div',
                  { className: controlClassName, key: control.id },
                  _react2.default.createElement(
                    'label',
                    { htmlFor: control.id },
                    control.label
                  ),
                  _react2.default.createElement('input', {
                    type: control.type || 'text',
                    placeholder: control.placeholder,
                    id: control.id,
                    disabled: !editable,
                    onInput: _this5.handleInput(control.id),
                    value: _this5.state[control.id].value
                  }),
                  _this5.state[control.id].error ? _react2.default.createElement(
                    'label',
                    { htmlFor: control.id },
                    _this5.state[control.id].error
                  ) : _react2.default.createElement('div', null)
                );
              }
            case 'textarea':
              {
                return _react2.default.createElement(
                  'div',
                  { className: controlClassName, key: control.id },
                  _react2.default.createElement(
                    'label',
                    { htmlFor: control.id },
                    control.label
                  ),
                  _react2.default.createElement('input', {
                    type: control.type || 'text',
                    placeholder: control.placeholder,
                    id: control.id,
                    disabled: !editable,
                    onInput: _this5.handleInput(control.id),
                    value: _this5.state[control.id].value
                  })
                );
              }
            case 'select':
              {
                return _react2.default.createElement(
                  'div',
                  { className: controlClassName, key: control.id },
                  _react2.default.createElement(
                    'label',
                    { htmlFor: control.id },
                    control.label
                  ),
                  _react2.default.createElement(
                    'select',
                    {
                      id: control.id,
                      disabled: !editable,
                      onChange: _this5.handleChange(control.id),
                      value: _this5.state[control.id].value
                    },
                    control.options.map(function (option) {
                      return _react2.default.createElement(
                        'option',
                        { key: control.id + '->' + option },
                        option
                      );
                    })
                  )
                );
              }
            default:
              {
                console.warn('Control ' + control.element + ' is unknown.');
                return _react2.default.createElement('div', null);
              }
          }
        }),
        _react2.default.createElement(
          'button',
          {
            className: 'mgrform-submit-btn ' + (submit.class ? submit.class : ''),
            onClick: this.handleSubmit,
            disabled: !submittable },
          submit.text
        ),
        errors && errors.general ? _react2.default.createElement(
          'div',
          { className: 'mgrform-error' },
          errors.general
        ) : _react2.default.createElement('div', null)
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

exports.default = Form;


Form.propTypes = {
  controls: _react.PropTypes.array.isRequired,
  submit: _react.PropTypes.object.isRequired,

  errors: _react.PropTypes.object,
  editable: _react.PropTypes.bool
};

Form.defaultProps = {
  errors: {},
  editable: true
};
