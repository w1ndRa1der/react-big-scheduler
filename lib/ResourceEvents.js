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

var _AddMore = require('./AddMore');

var _AddMore2 = _interopRequireDefault(_AddMore);

var _Summary = require('./Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _SelectedArea = require('./SelectedArea');

var _SelectedArea2 = _interopRequireDefault(_SelectedArea);

var _index = require('./index');

var _Util = require('./Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceEvents = (_temp = _class = function (_Component) {
    _inherits(ResourceEvents, _Component);

    function ResourceEvents(props) {
        _classCallCheck(this, ResourceEvents);

        var _this = _possibleConstructorReturn(this, (ResourceEvents.__proto__ || Object.getPrototypeOf(ResourceEvents)).call(this, props));

        _this.initDrag = function (ev) {
            ev.stopPropagation();
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            if ((ev.srcElement || ev.target) !== _this.eventContainer) return;

            var schedulerData = _this.props.schedulerData;

            var cellWidth = schedulerData.getContentCellWidth();
            var pos = (0, _Util.getPos)(_this.eventContainer);
            var startX = ev.clientX - pos.x;
            var leftIndex = Math.floor(startX / cellWidth);
            var left = leftIndex * cellWidth;
            var rightIndex = Math.ceil(startX / cellWidth);
            var width = (rightIndex - leftIndex) * cellWidth;

            _this.setState({
                startX: startX,
                left: left,
                leftIndex: leftIndex,
                width: width,
                rightIndex: rightIndex,
                isSelecting: true
            });

            document.documentElement.addEventListener('mousemove', _this.doDrag, false);
            document.documentElement.addEventListener('mouseup', _this.stopDrag, false);
        };

        _this.doDrag = function (ev) {
            ev.stopPropagation();

            var startX = _this.state.startX;
            var schedulerData = _this.props.schedulerData;
            var headers = schedulerData.headers;

            var cellWidth = schedulerData.getContentCellWidth();
            var pos = (0, _Util.getPos)(_this.eventContainer);
            var currentX = ev.clientX - pos.x;
            var leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth);
            leftIndex = leftIndex < 0 ? 0 : leftIndex;
            var left = leftIndex * cellWidth;
            var rightIndex = Math.ceil(Math.max(startX, currentX) / cellWidth);
            rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
            var width = (rightIndex - leftIndex) * cellWidth;

            _this.setState({
                leftIndex: leftIndex,
                left: left,
                rightIndex: rightIndex,
                width: width,
                isSelecting: true
            });
        };

        _this.stopDrag = function (ev) {
            ev.stopPropagation();
            var _this$props = _this.props,
                schedulerData = _this$props.schedulerData,
                newEvent = _this$props.newEvent,
                resourceEvents = _this$props.resourceEvents;
            var headers = schedulerData.headers,
                events = schedulerData.events,
                config = schedulerData.config,
                viewType = schedulerData.viewType;
            var _this$state = _this.state,
                leftIndex = _this$state.leftIndex,
                rightIndex = _this$state.rightIndex;

            document.documentElement.removeEventListener('mousemove', _this.doDrag, false);
            document.documentElement.removeEventListener('mouseup', _this.stopDrag, false);

            var startTime = headers[leftIndex].time;
            var endTime = resourceEvents.headerItems[rightIndex - 1].end;
            if (viewType !== _index.ViewTypes.Day) endTime = (0, _moment2.default)(resourceEvents.headerItems[rightIndex - 1].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
            var slotId = resourceEvents.slotId;
            var slotName = resourceEvents.slotName;

            _this.setState({
                startX: 0,
                leftIndex: 0,
                left: 0,
                rightIndex: 0,
                width: 0,
                isSelecting: false
            });

            var hasConflict = false;
            if (config.checkConflict) {
                var start = (0, _moment2.default)(startTime),
                    end = (0, _moment2.default)(endTime);

                events.forEach(function (e) {
                    if (schedulerData._getEventSlotId(e) === slotId) {
                        var eStart = (0, _moment2.default)(e.start),
                            eEnd = (0, _moment2.default)(e.end);
                        if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                    }
                });
            }

            if (hasConflict) {
                var conflictOccurred = _this.props.conflictOccurred;

                if (conflictOccurred != undefined) {
                    conflictOccurred(schedulerData, 'New', {
                        id: undefined,
                        start: startTime,
                        end: endTime,
                        slotId: slotId,
                        slotName: slotName,
                        title: undefined
                    });
                } else {
                    console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                }
            } else {
                if (newEvent != undefined) newEvent(schedulerData, slotId, slotName, startTime, endTime);
            }
        };

        _this.onAddMoreClick = function (headerItem) {
            var _this$props2 = _this.props,
                onSetAddMoreState = _this$props2.onSetAddMoreState,
                resourceEvents = _this$props2.resourceEvents,
                schedulerData = _this$props2.schedulerData;

            if (!!onSetAddMoreState) {
                var config = schedulerData.config;

                var cellWidth = schedulerData.getContentCellWidth();
                var index = resourceEvents.headerItems.indexOf(headerItem);
                if (index !== -1) {
                    var left = index * (cellWidth - 1);
                    var pos = (0, _Util.getPos)(_this.eventContainer);
                    left = left + pos.x;
                    var top = pos.y;
                    var height = (headerItem.count + 1) * config.eventItemLineHeight + 20;

                    onSetAddMoreState({
                        headerItem: headerItem,
                        left: left,
                        top: top,
                        height: height
                    });
                }
            }
        };

        _this.eventContainerRef = function (element) {
            _this.eventContainer = element;
        };

        _this.state = {
            isSelecting: false,
            left: 0,
            width: 0
        };
        return _this;
    }

    _createClass(ResourceEvents, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var schedulerData = this.props.schedulerData;
            var config = schedulerData.config;

            if (config.creatable === true) {
                this.eventContainer.addEventListener('mousedown', this.initDrag, false);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
            if (np.schedulerData.config.creatable) this.eventContainer.addEventListener('mousedown', this.initDrag, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                resourceEvents = _props.resourceEvents,
                schedulerData = _props.schedulerData,
                connectDropTarget = _props.connectDropTarget,
                dndSource = _props.dndSource;
            var viewType = schedulerData.viewType,
                startDate = schedulerData.startDate,
                endDate = schedulerData.endDate,
                config = schedulerData.config;
            var _state = this.state,
                isSelecting = _state.isSelecting,
                left = _state.left,
                width = _state.width;

            var cellWidth = schedulerData.getContentCellWidth();
            var cellMaxEvents = schedulerData.getCellMaxEvents();
            var rowWidth = schedulerData.getContentTableWidth();
            var DnDEventItem = dndSource.getDragSource();

            var selectedArea = isSelecting ? _react2.default.createElement(_SelectedArea2.default, _extends({}, this.props, { left: left, width: width })) : _react2.default.createElement('div', null);

            var eventList = [];
            resourceEvents.headerItems.forEach(function (headerItem, index) {

                if (headerItem.count > 0 || headerItem.summary != undefined) {

                    var isTop = config.summaryPos === _index.SummaryPos.TopRight || config.summaryPos === _index.SummaryPos.Top || config.summaryPos === _index.SummaryPos.TopLeft;
                    var marginTop = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
                    var renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;

                    headerItem.events.forEach(function (evt, idx) {
                        if (idx < renderEventsMaxIndex && evt !== undefined && evt.render) {
                            var durationStart = (0, _moment2.default)(startDate);
                            var durationEnd = (0, _moment2.default)(endDate).add(1, 'days');
                            if (viewType === _index.ViewTypes.Day) {
                                durationStart = (0, _moment2.default)(startDate).add(config.dayStartFrom, 'hours');
                                durationEnd = (0, _moment2.default)(endDate).add(config.dayStopTo + 1, 'hours');
                            }
                            var eventStart = (0, _moment2.default)(evt.eventItem.start);
                            var eventEnd = (0, _moment2.default)(evt.eventItem.end);
                            var isStart = eventStart >= durationStart;
                            var isEnd = eventEnd <= durationEnd;
                            var _left = index * cellWidth + (index > 0 ? 2 : 3);
                            var _width = evt.span * cellWidth - (index > 0 ? 5 : 6) > 0 ? evt.span * cellWidth - (index > 0 ? 5 : 6) : 0;
                            var top = marginTop + idx * config.eventItemLineHeight;
                            var eventItem = _react2.default.createElement(DnDEventItem, _extends({}, _this2.props, {
                                key: evt.eventItem.id,
                                eventItem: evt.eventItem,
                                isStart: isStart,
                                isEnd: isEnd,
                                isInPopover: false,
                                left: _left,
                                width: _width,
                                top: top,
                                leftIndex: index,
                                rightIndex: index + evt.span
                            }));
                            eventList.push(eventItem);
                        }
                    });

                    if (headerItem.addMore > 0) {
                        var _left2 = index * cellWidth + (index > 0 ? 2 : 3);
                        var _width2 = cellWidth - (index > 0 ? 5 : 6);
                        var top = marginTop + headerItem.addMoreIndex * config.eventItemLineHeight;
                        var addMoreItem = _react2.default.createElement(_AddMore2.default, _extends({}, _this2.props, {
                            key: headerItem.time,
                            headerItem: headerItem,
                            number: headerItem.addMore,
                            left: _left2,
                            width: _width2,
                            top: top,
                            clickAction: _this2.onAddMoreClick
                        }));
                        eventList.push(addMoreItem);
                    }

                    if (headerItem.summary != undefined) {
                        var _top = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;
                        var _left3 = index * cellWidth + (index > 0 ? 2 : 3);
                        var _width3 = cellWidth - (index > 0 ? 5 : 6);
                        var key = resourceEvents.slotId + '_' + headerItem.time;
                        var summary = _react2.default.createElement(_Summary2.default, { key: key, schedulerData: schedulerData, summary: headerItem.summary, left: _left3, width: _width3, top: _top });
                        eventList.push(summary);
                    }
                }
            });

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { style: { width: rowWidth } },
                    connectDropTarget(_react2.default.createElement(
                        'div',
                        { ref: this.eventContainerRef, className: 'event-container', style: { height: resourceEvents.rowHeight } },
                        selectedArea,
                        eventList
                    ))
                )
            );
        }
    }]);

    return ResourceEvents;
}(_react.Component), _class.propTypes = {
    resourceEvents: _propTypes2.default.object.isRequired,
    schedulerData: _propTypes2.default.object.isRequired,
    dndSource: _propTypes2.default.object.isRequired,
    onSetAddMoreState: _propTypes2.default.func,
    updateEventStart: _propTypes2.default.func,
    updateEventEnd: _propTypes2.default.func,
    moveEvent: _propTypes2.default.func,
    conflictOccurred: _propTypes2.default.func,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    newEvent: _propTypes2.default.func,
    eventItemTemplateResolver: _propTypes2.default.func
}, _temp);
exports.default = ResourceEvents;