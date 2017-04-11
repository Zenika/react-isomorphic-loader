'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getTypeOf = function getTypeOf(something) {
  var getType = {};
  return something && getType.toString.call(something);
};

var is = function is(typeString) {
  return function (varToCheck) {
    var type = getTypeOf(varToCheck);
    return type && type === typeString;
  };
};

var isString = is('[object String]');

var isArray = is('[object Array]');

var IsomorphicLoader = function (_Component) {
  _inherits(IsomorphicLoader, _Component);

  function IsomorphicLoader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IsomorphicLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IsomorphicLoader.__proto__ || Object.getPrototypeOf(IsomorphicLoader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      libraries: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IsomorphicLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var libraries = this.props.libraries;


      if (isString(libraries)) {
        // eslint-disable-next-line global-require, react/no-did-mount-set-state
        this.setState({ libraries: [require(libraries)] });
      }

      if (isArray(libraries)) {
        // eslint-disable-next-line global-require, react/no-did-mount-set-state
        this.setState({ libraries: libraries.map(function (l) {
            return require(l);
          }) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$strict = _props.strict,
          strict = _props$strict === undefined ? true : _props$strict;
      var libraries = this.state.libraries;


      if (strict) {
        return libraries && children.apply(undefined, _toConsumableArray(libraries));
      }
      return libraries ? children.apply(undefined, _toConsumableArray(libraries)) : children();
    }
  }]);

  return IsomorphicLoader;
}(_react.Component);

IsomorphicLoader.propTypes = {
  strict: _react.PropTypes.bool,
  libraries: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
  children: _react.PropTypes.func.isRequired
};
exports.default = IsomorphicLoader;