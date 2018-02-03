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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _AgendaEventItem = require('./AgendaEventItem');

var _AgendaEventItem2 = _interopRequireDefault(_AgendaEventItem);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgendaResourceEvents = (_temp = _class = function (_Component) {
    _inherits(AgendaResourceEvents, _Component);

    function AgendaResourceEvents(props) {
        _classCallCheck(this, AgendaResourceEvents);

        return _possibleConstructorReturn(this, (AgendaResourceEvents.__proto__ || Object.getPrototypeOf(AgendaResourceEvents)).call(this, props));
    }

    _createClass(AgendaResourceEvents, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                schedulerData = _props.schedulerData,
                resourceEvents = _props.resourceEvents,
                resourceClickedFunc = _props.resourceClickedFunc;
            var startDate = schedulerData.startDate,
                endDate = schedulerData.endDate,
                config = schedulerData.config;

            var agendaResourceTableWidth = schedulerData.getResourceTableWidth();

            var events = [];
            resourceEvents.headerItems.forEach(function (item) {
                var start = (0, _moment2.default)(startDate).format(_index.DATE_FORMAT),
                    end = (0, _moment2.default)(endDate).add(1, 'days').format(_index.DATE_FORMAT),
                    headerStart = (0, _moment2.default)(item.start).format(_index.DATE_FORMAT),
                    headerEnd = (0, _moment2.default)(item.end).format(_index.DATE_FORMAT);

                if (start === headerStart && end === headerEnd) {
                    item.events.forEach(function (evt) {
                        var durationStart = (0, _moment2.default)(startDate);
                        var durationEnd = (0, _moment2.default)(endDate).add(1, 'days');
                        var eventStart = (0, _moment2.default)(evt.eventItem.start);
                        var eventEnd = (0, _moment2.default)(evt.eventItem.end);
                        var isStart = eventStart >= durationStart;
                        var isEnd = eventEnd < durationEnd;
                        var eventItem = _react2.default.createElement(_AgendaEventItem2.default, _extends({}, _this2.props, {
                            key: evt.eventItem.id,
                            eventItem: evt.eventItem,
                            isStart: isStart,
                            isEnd: isEnd
                        }));
                        events.push(eventItem);
                    });
                }
            });

            var a = resourceClickedFunc != undefined ? _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                        resourceClickedFunc(schedulerData, resourceEvents);
                    } },
                resourceEvents.slotName
            ) : _react2.default.createElement(
                'span',
                null,
                resourceEvents.slotName
            );

            return _react2.default.createElement(
                'tr',
                { style: { minHeight: config.eventItemLineHeight + 2 } },
                _react2.default.createElement(
                    'td',
                    { 'data-resource-id': resourceEvents.slotId, className: 'header2-text' },
                    _react2.default.createElement(
                        'div',
                        { style: { width: agendaResourceTableWidth - 2 }, title: resourceEvents.slotName, className: 'overflow-text' },
                        a
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'day-event-container' },
                        events
                    )
                )
            );
        }
    }]);

    return AgendaResourceEvents;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    resourceEvents: _propTypes2.default.object.isRequired,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    resourceClickedFunc: _propTypes2.default.func
}, _temp);
exports.default = AgendaResourceEvents;