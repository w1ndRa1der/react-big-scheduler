'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

require('antd/lib/popover/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EventItemPopover = require('./EventItemPopover');

var _EventItemPopover2 = _interopRequireDefault(_EventItemPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgendaEventItem = (_temp = _class = function (_Component) {
    _inherits(AgendaEventItem, _Component);

    function AgendaEventItem(props) {
        _classCallCheck(this, AgendaEventItem);

        return _possibleConstructorReturn(this, (AgendaEventItem.__proto__ || Object.getPrototypeOf(AgendaEventItem)).call(this, props));
    }

    _createClass(AgendaEventItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                eventItem = _props.eventItem,
                isStart = _props.isStart,
                isEnd = _props.isEnd,
                eventItemClick = _props.eventItemClick,
                viewEventClick = _props.viewEventClick,
                viewEventText = _props.viewEventText,
                viewEvent2Click = _props.viewEvent2Click,
                viewEvent2Text = _props.viewEvent2Text,
                schedulerData = _props.schedulerData;
            var config = schedulerData.config;

            var roundCls = isStart ? isEnd ? 'round-all' : 'round-head' : isEnd ? 'round-tail' : 'round-none';
            var bgColor = config.defaultEventBgColor;
            if (eventItem.bgColor !== undefined) bgColor = eventItem.bgColor;

            var titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
            var content = _react2.default.createElement(_EventItemPopover2.default, _extends({}, this.props, {
                title: eventItem.title,
                startTime: eventItem.start,
                endTime: eventItem.end,
                statusColor: bgColor
            }));

            return _react2.default.createElement(
                _popover2.default,
                { placement: 'bottomLeft', content: content, trigger: 'hover' },
                _react2.default.createElement(
                    'a',
                    { className: 'day-event', onClick: function onClick() {
                            if (!!eventItemClick) eventItemClick(schedulerData, eventItem);
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: roundCls + ' event-item', key: eventItem.id,
                            style: { height: config.eventItemHeight, maxWidth: config.agendaMaxEventWidth, backgroundColor: bgColor } },
                        _react2.default.createElement(
                            'span',
                            { style: { marginLeft: '10px', lineHeight: config.eventItemHeight + 'px' } },
                            titleText
                        )
                    )
                )
            );
        }
    }]);

    return AgendaEventItem;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    eventItem: _propTypes2.default.object.isRequired,
    isStart: _propTypes2.default.bool.isRequired,
    isEnd: _propTypes2.default.bool.isRequired,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string
}, _temp);
exports.default = AgendaEventItem;