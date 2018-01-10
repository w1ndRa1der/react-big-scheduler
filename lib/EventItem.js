'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

require('antd/lib/popover/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

var _EventItemPopover = require('./EventItemPopover');

var _EventItemPopover2 = _interopRequireDefault(_EventItemPopover);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventItem = (_temp = _class = function (_Component) {
    _inherits(EventItem, _Component);

    function EventItem(props) {
        _classCallCheck(this, EventItem);

        var _this = _possibleConstructorReturn(this, (EventItem.__proto__ || Object.getPrototypeOf(EventItem)).call(this, props));

        _initialiseProps.call(_this);

        var left = props.left,
            top = props.top,
            width = props.width;

        _this.state = {
            left: left,
            top: top,
            width: width
        };
        return _this;
    }

    _createClass(EventItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            var left = np.left,
                top = np.top,
                width = np.width;

            this.setState({
                left: left,
                top: top,
                width: width
            });

            if (this.refs.startResizer != undefined) {
                this.refs.startResizer.removeEventListener('mousedown', this.initStartDrag, false);
                if (this.startResizable(np)) this.refs.startResizer.addEventListener('mousedown', this.initStartDrag, false);
            }
            if (this.refs.endResizer != undefined) {
                this.refs.endResizer.removeEventListener('mousedown', this.initEndDrag, false);
                if (this.endResizable(np)) this.refs.endResizer.addEventListener('mousedown', this.initEndDrag, false);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.startResizable(this.props)) this.refs.startResizer.addEventListener('mousedown', this.initStartDrag, false);
            if (this.endResizable(this.props)) this.refs.endResizer.addEventListener('mousedown', this.initEndDrag, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                eventItem = _props.eventItem,
                isStart = _props.isStart,
                isEnd = _props.isEnd,
                isInPopover = _props.isInPopover,
                eventItemClick = _props.eventItemClick,
                schedulerData = _props.schedulerData,
                isDragging = _props.isDragging,
                connectDragSource = _props.connectDragSource,
                connectDragPreview = _props.connectDragPreview,
                eventItemTemplateResolver = _props.eventItemTemplateResolver;
            var config = schedulerData.config;
            var _state = this.state,
                left = _state.left,
                width = _state.width,
                top = _state.top;

            var roundCls = isStart ? isEnd ? 'round-all' : 'round-head' : isEnd ? 'round-tail' : 'round-none';
            var bgColor = config.defaultEventBgColor;
            if (eventItem.bgColor !== undefined) bgColor = eventItem.bgColor;

            var titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
            var content = _react2.default.createElement(_EventItemPopover2.default, _extends({}, this.props, {
                eventItem: eventItem,
                title: eventItem.title,
                startTime: eventItem.start,
                endTime: eventItem.end,
                statusColor: bgColor }));

            var start = (0, _moment2.default)(eventItem.start);
            var eventTitle = isInPopover ? start.format('HH:mm') + ' ' + titleText : titleText;
            var startResizeDiv = _react2.default.createElement('div', null);
            if (this.startResizable(this.props)) startResizeDiv = _react2.default.createElement('div', { className: 'event-resizer event-start-resizer', ref: 'startResizer' });
            var endResizeDiv = _react2.default.createElement('div', null);
            if (this.endResizable(this.props)) endResizeDiv = _react2.default.createElement('div', { className: 'event-resizer event-end-resizer', ref: 'endResizer' });

            var eventItemTemplate = _react2.default.createElement(
                'div',
                { className: roundCls + ' event-item', key: eventItem.id,
                    style: { height: config.eventItemHeight, backgroundColor: bgColor } },
                _react2.default.createElement(
                    'span',
                    { style: { marginLeft: '10px', lineHeight: config.eventItemHeight + 'px' } },
                    eventTitle
                )
            );
            if (eventItemTemplateResolver != undefined) eventItemTemplate = eventItemTemplateResolver(schedulerData, eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight);

            var a = _react2.default.createElement(
                'a',
                { className: 'timeline-event', style: { left: left, width: width, top: top }, onClick: function onClick() {
                        if (!!eventItemClick) eventItemClick(schedulerData, eventItem);
                    } },
                eventItemTemplate,
                startResizeDiv,
                endResizeDiv
            );

            return isDragging ? null : schedulerData._isResizing() ? _react2.default.createElement(
                'div',
                null,
                connectDragPreview(connectDragSource(a))
            ) : _react2.default.createElement(
                _popover2.default,
                { placement: 'bottomLeft', content: content, trigger: 'hover' },
                connectDragPreview(connectDragSource(a))
            );
        }
    }]);

    return EventItem;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    eventItem: _propTypes2.default.object.isRequired,
    isStart: _propTypes2.default.bool.isRequired,
    isEnd: _propTypes2.default.bool.isRequired,
    left: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    top: _propTypes2.default.number.isRequired,
    isInPopover: _propTypes2.default.bool.isRequired,
    leftIndex: _propTypes2.default.number.isRequired,
    rightIndex: _propTypes2.default.number.isRequired,
    isDragging: _propTypes2.default.bool.isRequired,
    connectDragSource: _propTypes2.default.func.isRequired,
    connectDragPreview: _propTypes2.default.func.isRequired,
    updateEventStart: _propTypes2.default.func,
    updateEventEnd: _propTypes2.default.func,
    moveEvent: _propTypes2.default.func,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    conflictOccurred: _propTypes2.default.func,
    eventItemTemplateResolver: _propTypes2.default.func
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.initStartDrag = function (ev) {
        ev.stopPropagation();
        if (ev.buttons !== undefined && ev.buttons !== 1) return;

        var schedulerData = _this2.props.schedulerData;

        schedulerData._startResizing();
        _this2.setState({
            startX: ev.clientX
        });

        document.documentElement.addEventListener('mousemove', _this2.doStartDrag, false);
        document.documentElement.addEventListener('mouseup', _this2.stopStartDrag, false);
    };

    this.doStartDrag = function (ev) {
        ev.stopPropagation();

        var _props2 = _this2.props,
            left = _props2.left,
            width = _props2.width,
            leftIndex = _props2.leftIndex,
            rightIndex = _props2.rightIndex,
            schedulerData = _props2.schedulerData;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = rightIndex * cellWidth - offset;
        var startX = _this2.state.startX;

        var newLeft = left + ev.clientX - startX;
        var newWidth = width + startX - ev.clientX;
        if (newWidth < minWidth) {
            newWidth = minWidth;
            newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3);
        } else if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newLeft = 3;
        }

        _this2.setState({ left: newLeft, width: newWidth });
    };

    this.stopStartDrag = function (ev) {
        ev.stopPropagation();
        document.documentElement.removeEventListener('mousemove', _this2.doStartDrag, false);
        document.documentElement.removeEventListener('mouseup', _this2.stopStartDrag, false);

        var _props3 = _this2.props,
            width = _props3.width,
            leftIndex = _props3.leftIndex,
            rightIndex = _props3.rightIndex,
            schedulerData = _props3.schedulerData,
            eventItem = _props3.eventItem,
            updateEventStart = _props3.updateEventStart;

        schedulerData._stopResizing();
        var viewType = schedulerData.viewType,
            events = schedulerData.events,
            config = schedulerData.config;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = rightIndex * cellWidth - offset;
        var startX = _this2.state.startX;

        var newWidth = width + startX - ev.clientX;
        var deltaX = ev.clientX - startX;
        var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
        var count = (sign > 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth) count = rightIndex - leftIndex - 1;else if (newWidth > maxWidth) count = -leftIndex;
        var newStart = (0, _moment2.default)(eventItem.start).add(viewType === _index.ViewTypes.Day ? count * 30 : count, viewType === _index.ViewTypes.Day ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);

        var hasConflict = false;
        if (config.checkConflict) {
            var start = (0, _moment2.default)(newStart),
                end = (0, _moment2.default)(eventItem.end),
                slotId = schedulerData._getEventSlotId(eventItem);

            events.forEach(function (e) {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    var eStart = (0, _moment2.default)(e.start),
                        eEnd = (0, _moment2.default)(e.end);
                    if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            var _props4 = _this2.props,
                conflictOccurred = _props4.conflictOccurred,
                left = _props4.left,
                top = _props4.top,
                _width = _props4.width;

            _this2.setState({
                left: left,
                top: top,
                width: _width
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'StartResize', eventItem);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
        } else {
            if (updateEventStart != undefined) updateEventStart(schedulerData, eventItem, newStart);
        }
    };

    this.initEndDrag = function (ev) {
        ev.stopPropagation();
        if (ev.buttons !== undefined && ev.buttons !== 1) return;

        var schedulerData = _this2.props.schedulerData;

        schedulerData._startResizing();
        _this2.setState({
            endX: ev.clientX
        });

        document.documentElement.addEventListener('mousemove', _this2.doEndDrag, false);
        document.documentElement.addEventListener('mouseup', _this2.stopEndDrag, false);
    };

    this.doEndDrag = function (ev) {
        ev.stopPropagation();
        var _props5 = _this2.props,
            width = _props5.width,
            leftIndex = _props5.leftIndex,
            schedulerData = _props5.schedulerData;
        var headers = schedulerData.headers;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        var endX = _this2.state.endX;


        var newWidth = width + ev.clientX - endX;
        if (newWidth < minWidth) newWidth = minWidth;else if (newWidth > maxWidth) newWidth = maxWidth;

        _this2.setState({ width: newWidth });
    };

    this.stopEndDrag = function (ev) {
        ev.stopPropagation();
        document.documentElement.removeEventListener('mousemove', _this2.doEndDrag, false);
        document.documentElement.removeEventListener('mouseup', _this2.stopEndDrag, false);

        var _props6 = _this2.props,
            width = _props6.width,
            leftIndex = _props6.leftIndex,
            rightIndex = _props6.rightIndex,
            schedulerData = _props6.schedulerData,
            eventItem = _props6.eventItem,
            updateEventEnd = _props6.updateEventEnd;

        schedulerData._stopResizing();
        var headers = schedulerData.headers,
            viewType = schedulerData.viewType,
            events = schedulerData.events,
            config = schedulerData.config;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        var endX = _this2.state.endX;


        var newWidth = width + ev.clientX - endX;
        var deltaX = newWidth - width;
        var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
        var count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth) count = leftIndex - rightIndex + 1;else if (newWidth > maxWidth) count = headers.length - rightIndex;
        var newEnd = (0, _moment2.default)(eventItem.end).add(viewType === _index.ViewTypes.Day ? count * 30 : count, viewType === _index.ViewTypes.Day ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);

        var hasConflict = false;
        if (config.checkConflict) {
            var start = (0, _moment2.default)(eventItem.start),
                end = (0, _moment2.default)(newEnd),
                slotId = schedulerData._getEventSlotId(eventItem);

            events.forEach(function (e) {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    var eStart = (0, _moment2.default)(e.start),
                        eEnd = (0, _moment2.default)(e.end);
                    if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            var _props7 = _this2.props,
                conflictOccurred = _props7.conflictOccurred,
                left = _props7.left,
                top = _props7.top,
                _width2 = _props7.width;

            _this2.setState({
                left: left,
                top: top,
                width: _width2
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'EndResize', eventItem);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
        } else {
            if (updateEventEnd != undefined) updateEventEnd(schedulerData, eventItem, newEnd);
        }
    };

    this.startResizable = function (props) {
        var eventItem = props.eventItem,
            isInPopover = props.isInPopover,
            schedulerData = props.schedulerData;
        var config = schedulerData.config;

        return config.startResizable === true && isInPopover === false && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
    };

    this.endResizable = function (props) {
        var eventItem = props.eventItem,
            isInPopover = props.isInPopover,
            schedulerData = props.schedulerData;
        var config = schedulerData.config;

        return config.endResizable === true && isInPopover === false && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
    };
}, _temp);
exports.default = EventItem;