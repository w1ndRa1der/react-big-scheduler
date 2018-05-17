'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

require('antd/lib/row/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/col/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _EventItem = require('./EventItem');

var _EventItem2 = _interopRequireDefault(_EventItem);

var _DnDSource = require('./DnDSource');

var _DnDSource2 = _interopRequireDefault(_DnDSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddMorePopover = (_temp = _class = function (_Component) {
    _inherits(AddMorePopover, _Component);

    function AddMorePopover(props) {
        _classCallCheck(this, AddMorePopover);

        var _this = _possibleConstructorReturn(this, (AddMorePopover.__proto__ || Object.getPrototypeOf(AddMorePopover)).call(this, props));

        _this.state = {
            dndSource: new _DnDSource2.default(function (props) {
                return props.eventItem;
            }, _EventItem2.default)
        };
        return _this;
    }

    _createClass(AddMorePopover, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                headerItem = _props.headerItem,
                left = _props.left,
                top = _props.top,
                height = _props.height,
                closeAction = _props.closeAction,
                schedulerData = _props.schedulerData;
            var config = schedulerData.config;
            var time = headerItem.time,
                start = headerItem.start,
                end = headerItem.end,
                events = headerItem.events;

            var header = (0, _moment2.default)(time).format('YYYY年M月D日 dddd');
            var durationStart = (0, _moment2.default)(start);
            var durationEnd = (0, _moment2.default)(end);
            var eventList = [];
            var i = 0;
            var DnDEventItem = this.state.dndSource.getDragSource();
            events.forEach(function (evt) {
                if (evt !== undefined) {
                    i++;
                    var eventStart = (0, _moment2.default)(evt.eventItem.start);
                    var eventEnd = (0, _moment2.default)(evt.eventItem.end);
                    var isStart = eventStart >= durationStart;
                    var isEnd = eventEnd < durationEnd;
                    var eventItemLeft = 10;
                    var eventItemWidth = 138;
                    var eventItemTop = 12 + i * config.eventItemLineHeight;
                    var eventItem = _react2.default.createElement(DnDEventItem, _extends({}, _this2.props, {
                        key: evt.eventItem.id,
                        eventItem: evt.eventItem,
                        leftIndex: 0,
                        isInPopover: true,
                        isStart: isStart,
                        isEnd: isEnd,
                        rightIndex: 1,
                        left: eventItemLeft,
                        width: eventItemWidth,
                        top: eventItemTop
                    }));
                    eventList.push(eventItem);
                }
            });

            return _react2.default.createElement(
                'div',
                { className: 'add-more-popover-overlay', style: { left: left, top: top, height: height, width: '170px' } },
                _react2.default.createElement(
                    _row2.default,
                    { type: 'flex', justify: 'space-between', align: 'middle' },
                    _react2.default.createElement(
                        _col2.default,
                        { span: '22' },
                        _react2.default.createElement(
                            'span',
                            { className: 'base-text' },
                            header
                        )
                    ),
                    _react2.default.createElement(
                        _col2.default,
                        { span: '2' },
                        _react2.default.createElement(
                            'span',
                            { onClick: function onClick() {
                                    closeAction(undefined);
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'cross' })
                        )
                    )
                ),
                eventList
            );
        }
    }]);

    return AddMorePopover;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    headerItem: _propTypes2.default.object.isRequired,
    left: _propTypes2.default.number.isRequired,
    top: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    closeAction: _propTypes2.default.func.isRequired,
    subtitleGetter: _propTypes2.default.func,
    moveEvent: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    eventItemTemplateResolver: _propTypes2.default.func
}, _temp);
exports.default = AddMorePopover;