'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedArea = (_temp = _class = function (_Component) {
    _inherits(SelectedArea, _Component);

    function SelectedArea(props) {
        _classCallCheck(this, SelectedArea);

        return _possibleConstructorReturn(this, (SelectedArea.__proto__ || Object.getPrototypeOf(SelectedArea)).call(this, props));
    }

    _createClass(SelectedArea, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                left = _props.left,
                width = _props.width,
                schedulerData = _props.schedulerData;
            var config = schedulerData.config;


            return _react2.default.createElement('div', { className: 'selected-area', style: { left: left, width: width, top: 0, bottom: 0, backgroundColor: config.selectedAreaColor } });
        }
    }]);

    return SelectedArea;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    left: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired
}, _temp);
exports.default = SelectedArea;