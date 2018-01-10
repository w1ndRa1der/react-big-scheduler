'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AgendaResourceEvents = require('./AgendaResourceEvents');

var _AgendaResourceEvents2 = _interopRequireDefault(_AgendaResourceEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgendaView = (_temp = _class = function (_Component) {
    _inherits(AgendaView, _Component);

    function AgendaView(props) {
        _classCallCheck(this, AgendaView);

        return _possibleConstructorReturn(this, (AgendaView.__proto__ || Object.getPrototypeOf(AgendaView)).call(this, props));
    }

    _createClass(AgendaView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var schedulerData = this.props.schedulerData;
            var renderData = schedulerData.renderData;

            var agendaResourceTableWidth = schedulerData.getResourceTableWidth(),
                tableHeaderHeight = schedulerData.getTableHeaderHeight();
            var resourceEventsList = renderData.map(function (item) {
                return _react2.default.createElement(_AgendaResourceEvents2.default, _extends({}, _this2.props, {
                    resourceEvents: item,
                    key: item.slotId }));
            });
            var resourceName = schedulerData.isEventPerspective ? '任务名称' : '资源名称';

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'table',
                        { className: 'scheduler-table' },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                { style: { height: tableHeaderHeight } },
                                _react2.default.createElement(
                                    'th',
                                    { style: { width: agendaResourceTableWidth }, className: 'header3-text' },
                                    resourceName
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'header3-text' },
                                    '\u5DE5\u4F5C\u4E8B\u9879'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            resourceEventsList
                        )
                    )
                )
            );
        }
    }]);

    return AgendaView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    resourceClickedFunc: _propTypes2.default.func
}, _temp);
exports.default = AgendaView;