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

var ResourceView = (_temp = _class = function (_Component) {
    _inherits(ResourceView, _Component);

    function ResourceView(props) {
        _classCallCheck(this, ResourceView);

        return _possibleConstructorReturn(this, (ResourceView.__proto__ || Object.getPrototypeOf(ResourceView)).call(this, props));
    }

    _createClass(ResourceView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                schedulerData = _props.schedulerData,
                browserScrollbarHeight = _props.browserScrollbarHeight,
                resourceClickedFunc = _props.resourceClickedFunc;
            var renderData = schedulerData.renderData;


            var width = schedulerData.getResourceTableWidth() - 2;
            var paddingBottom = browserScrollbarHeight;
            var resourceList = renderData.map(function (item) {
                var a = resourceClickedFunc != undefined ? _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                            resourceClickedFunc(schedulerData, item);
                        } },
                    item.slotName
                ) : _react2.default.createElement(
                    'span',
                    null,
                    item.slotName
                );
                return _react2.default.createElement(
                    'tr',
                    { key: item.slotId, style: { height: item.rowHeight } },
                    _react2.default.createElement(
                        'td',
                        { 'data-resource-id': item.slotId, className: 'header2-text' },
                        _react2.default.createElement(
                            'div',
                            { style: { width: width }, title: item.slotName, className: 'overflow-text' },
                            a
                        )
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { style: { paddingBottom: paddingBottom } },
                _react2.default.createElement(
                    'table',
                    { className: 'resource-table' },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        resourceList
                    )
                )
            );
        }
    }]);

    return ResourceView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    browserScrollbarHeight: _propTypes2.default.number.isRequired,
    resourceClickedFunc: _propTypes2.default.func
}, _temp);
exports.default = ResourceView;