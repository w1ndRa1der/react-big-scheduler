'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DemoData = exports.AddMorePopover = exports.DnDContext = exports.DnDSource = exports.SummaryPos = exports.ViewTypes = exports.SchedulerData = exports.DATETIME_FORMAT = exports.DATE_FORMAT = undefined;

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

require('antd/lib/row/style/css');

require('antd/lib/col/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/popover/style/css');

require('antd/lib/date-picker/style/css');

require('antd/lib/radio/style/css');

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

var _DnDContext = require('./DnDContext');

var _DnDContext2 = _interopRequireDefault(_DnDContext);

var _ResourceView = require('./ResourceView');

var _ResourceView2 = _interopRequireDefault(_ResourceView);

var _HeaderView = require('./HeaderView');

var _HeaderView2 = _interopRequireDefault(_HeaderView);

var _BodyView = require('./BodyView');

var _BodyView2 = _interopRequireDefault(_BodyView);

var _ResourceEvents = require('./ResourceEvents');

var _ResourceEvents2 = _interopRequireDefault(_ResourceEvents);

var _AgendaView = require('./AgendaView');

var _AgendaView2 = _interopRequireDefault(_AgendaView);

var _AddMorePopover = require('./AddMorePopover');

var _AddMorePopover2 = _interopRequireDefault(_AddMorePopover);

var _ViewTypes = require('./ViewTypes');

var _ViewTypes2 = _interopRequireDefault(_ViewTypes);

var _SummaryPos = require('./SummaryPos');

var _SummaryPos2 = _interopRequireDefault(_SummaryPos);

var _SchedulerData = require('./SchedulerData');

var _SchedulerData2 = _interopRequireDefault(_SchedulerData);

var _DemoData = require('./DemoData');

var _DemoData2 = _interopRequireDefault(_DemoData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;
var Calendar = _datePicker2.default.Calendar;
var Scheduler = (_temp = _class = function (_Component) {
    _inherits(Scheduler, _Component);

    function Scheduler(props) {
        _classCallCheck(this, Scheduler);

        var _this = _possibleConstructorReturn(this, (Scheduler.__proto__ || Object.getPrototypeOf(Scheduler)).call(this, props));

        _this.resolveScrollbarSize = function () {
            var browserScrollbarHeight = 17,
                browserScrollbarWidth = 17;
            if (!!_this.schedulerContent) {
                browserScrollbarHeight = _this.schedulerContent.offsetHeight - _this.schedulerContent.clientHeight;
                browserScrollbarWidth = _this.schedulerContent.offsetWidth - _this.schedulerContent.clientWidth;
            }

            var tmpState = {};
            var needSet = false;
            if (browserScrollbarHeight != _this.state.browserScrollbarHeight) {
                tmpState = _extends({}, tmpState, { browserScrollbarHeight: browserScrollbarHeight });
                needSet = true;
            }
            if (browserScrollbarWidth != _this.state.browserScrollbarWidth) {
                tmpState = _extends({}, tmpState, { browserScrollbarWidth: browserScrollbarWidth });
                needSet = true;
            }
            if (needSet) _this.setState(tmpState);
        };

        _this.schedulerHeadRef = function (element) {
            _this.schedulerHead = element;
        };

        _this.onSchedulerHeadMouseOver = function () {
            _this.currentArea = 2;
        };

        _this.onSchedulerHeadMouseOut = function () {
            _this.currentArea = -1;
        };

        _this.onSchedulerHeadScroll = function (proxy, event) {
            if ((_this.currentArea === 2 || _this.currentArea === -1) && _this.schedulerContent.scrollLeft != _this.schedulerHead.scrollLeft) _this.schedulerContent.scrollLeft = _this.schedulerHead.scrollLeft;
        };

        _this.schedulerResourceRef = function (element) {
            _this.schedulerResource = element;
        };

        _this.onSchedulerResourceMouseOver = function () {
            _this.currentArea = 1;
        };

        _this.onSchedulerResourceMouseOut = function () {
            _this.currentArea = -1;
        };

        _this.onSchedulerResourceScroll = function (proxy, event) {
            if ((_this.currentArea === 1 || _this.currentArea === -1) && _this.schedulerContent.scrollTop != _this.schedulerResource.scrollTop) _this.schedulerContent.scrollTop = _this.schedulerResource.scrollTop;
        };

        _this.schedulerContentRef = function (element) {
            _this.schedulerContent = element;
        };

        _this.onSchedulerContentMouseOver = function () {
            _this.currentArea = 0;
        };

        _this.onSchedulerContentMouseOut = function () {
            _this.currentArea = -1;
        };

        _this.onSchedulerContentScroll = function (proxy, event) {
            if (_this.currentArea === 0 || _this.currentArea === -1) {
                if (_this.schedulerHead.scrollLeft != _this.schedulerContent.scrollLeft) _this.schedulerHead.scrollLeft = _this.schedulerContent.scrollLeft;
                if (_this.schedulerResource.scrollTop != _this.schedulerContent.scrollTop) _this.schedulerResource.scrollTop = _this.schedulerContent.scrollTop;
            }
        };

        _this.onViewChange = function (e) {
            var _this$props = _this.props,
                onViewChange = _this$props.onViewChange,
                schedulerData = _this$props.schedulerData;

            var viewType = parseInt(e.target.value.charAt(0));
            var showAgenda = e.target.value.charAt(1) === '1';
            var isEventPerspective = e.target.value.charAt(2) === '1';
            onViewChange(schedulerData, { viewType: viewType, showAgenda: showAgenda, isEventPerspective: isEventPerspective });
        };

        _this.goNext = function () {
            var _this$props2 = _this.props,
                nextClick = _this$props2.nextClick,
                schedulerData = _this$props2.schedulerData;

            nextClick(schedulerData);
        };

        _this.goBack = function () {
            var _this$props3 = _this.props,
                prevClick = _this$props3.prevClick,
                schedulerData = _this$props3.schedulerData;

            prevClick(schedulerData);
        };

        _this.handleVisibleChange = function (visible) {
            _this.setState({ visible: visible });
        };

        _this.onSelect = function (date) {
            _this.setState({
                visible: false
            });

            var _this$props4 = _this.props,
                onSelectDate = _this$props4.onSelectDate,
                schedulerData = _this$props4.schedulerData;

            onSelectDate(schedulerData, date);
        };

        var dndSources = props.dndSources;

        var sources = [];
        sources.push(new _DnDSource2.default(function (props) {
            return props.eventItem;
        }, _EventItem2.default));
        if (dndSources != undefined && dndSources.length > 0) {
            sources = [].concat(_toConsumableArray(sources), _toConsumableArray(dndSources));
        }
        var dndContext = new _DnDContext2.default(sources, _ResourceEvents2.default);

        _this.currentArea = -1;

        _this.state = {
            visible: false,
            dndContext: dndContext,
            browserScrollbarHeight: 17,
            browserScrollbarWidth: 17
        };
        return _this;
    }

    _createClass(Scheduler, [{
        key: 'componentDidMount',
        value: function componentDidMount(props, state) {
            this.resolveScrollbarSize();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props, state) {
            this.resolveScrollbarSize();

            var schedulerData = this.props.schedulerData;

            if (schedulerData.getScrollToToday()) {
                if (!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth) {
                    var start = (0, _moment2.default)(schedulerData.startDate).startOf('day'),
                        end = (0, _moment2.default)(schedulerData.endDate).endOf('day'),
                        now = (0, _moment2.default)();
                    if (now >= start && now <= end) {
                        var index = 0;
                        schedulerData.headers.forEach(function (item) {
                            var header = (0, _moment2.default)(item.time);
                            if (now >= header) index++;
                        });
                        this.schedulerContent.scrollLeft = (index - 1) * schedulerData.getContentCellWidth();

                        schedulerData.setScrollToToday(false);
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                schedulerData = _props.schedulerData,
                customHeader = _props.customHeader;
            var renderData = schedulerData.renderData,
                viewType = schedulerData.viewType,
                showAgenda = schedulerData.showAgenda,
                isEventPerspective = schedulerData.isEventPerspective,
                config = schedulerData.config;

            var width = config.schedulerWidth;

            var dateLabel = schedulerData.getDateLabel();
            var defaultValue = '' + viewType + (showAgenda ? 1 : 0) + (isEventPerspective ? 1 : 0);
            var radioButtonList = config.views.map(function (item) {
                return _react2.default.createElement(
                    RadioButton,
                    { key: '' + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0),
                        value: '' + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0) },
                    _react2.default.createElement(
                        'span',
                        {
                            style: { margin: "0px 8px" } },
                        item.viewName
                    )
                );
            });

            var tbodyContent = _react2.default.createElement('tr', null);
            if (showAgenda) {
                tbodyContent = _react2.default.createElement(_AgendaView2.default, this.props);
            } else {
                var resourceTableWidth = schedulerData.getResourceTableWidth();
                var schedulerContainerWidth = width - resourceTableWidth + 1;
                var schedulerWidth = schedulerData.getContentTableWidth() - 1;
                var DndResourceEvents = this.state.dndContext.getDropTarget();
                var eventDndSource = this.state.dndContext.getDndSource();

                var resourceEventsList = renderData.map(function (item) {
                    return _react2.default.createElement(DndResourceEvents, _extends({}, _this2.props, {
                        key: item.slotId,
                        resourceEvents: item,
                        dndSource: eventDndSource
                    }));
                });

                var browserScrollbarHeight = this.state.browserScrollbarHeight,
                    browserScrollbarWidth = this.state.browserScrollbarWidth;
                var schedulerContentStyle = { overflow: 'auto', margin: "-1px, 0px, 0px, 0px", position: "relative" };
                var resourceContentStyle = { overflowX: "auto", overflowY: "auto", margin: '0px -' + browserScrollbarWidth + 'px 0px 0px' };
                if (config.schedulerMaxHeight > 0) {
                    schedulerContentStyle = _extends({}, schedulerContentStyle, {
                        maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                    });
                    resourceContentStyle = _extends({}, resourceContentStyle, {
                        maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                    });
                }

                var resourceName = schedulerData.isEventPerspective ? 'Tasks' : 'Courts';
                tbodyContent = _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { style: { width: resourceTableWidth, verticalAlign: 'top' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'resource-view' },
                            _react2.default.createElement(
                                'div',
                                { style: { overflow: "visible", height: config.tableHeaderHeight } },
                                _react2.default.createElement(
                                    'div',
                                    { style: { overflowX: "scroll", overflowY: "hidden", margin: '0px 0px -' + browserScrollbarHeight + 'px' } },
                                    _react2.default.createElement(
                                        'table',
                                        { className: 'resource-table' },
                                        _react2.default.createElement(
                                            'thead',
                                            null,
                                            _react2.default.createElement(
                                                'tr',
                                                { style: { height: config.tableHeaderHeight } },
                                                _react2.default.createElement(
                                                    'th',
                                                    { className: 'header3-text' },
                                                    resourceName
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: resourceContentStyle, ref: this.schedulerResourceRef, onMouseOver: this.onSchedulerResourceMouseOver, onMouseOut: this.onSchedulerResourceMouseOut, onScroll: this.onSchedulerResourceScroll },
                                _react2.default.createElement(_ResourceView2.default, _extends({}, this.props, {
                                    browserScrollbarHeight: browserScrollbarHeight
                                }))
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'scheduler-view', style: { width: schedulerContainerWidth, verticalAlign: 'top' } },
                            _react2.default.createElement(
                                'div',
                                { style: { overflow: "hidden", borderBottom: "1px solid #cccccc", height: config.tableHeaderHeight } },
                                _react2.default.createElement(
                                    'div',
                                    { style: { overflowX: "scroll", overflowY: "hidden", margin: '0px 0px -' + browserScrollbarHeight + 'px' }, ref: this.schedulerHeadRef, onMouseOver: this.onSchedulerHeadMouseOver, onMouseOut: this.onSchedulerHeadMouseOut, onScroll: this.onSchedulerHeadScroll },
                                    _react2.default.createElement(
                                        'div',
                                        { style: { paddingRight: browserScrollbarWidth + 'px', width: schedulerWidth + browserScrollbarWidth } },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-bg-table' },
                                            _react2.default.createElement(_HeaderView2.default, this.props)
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: schedulerContentStyle, ref: this.schedulerContentRef, onMouseOver: this.onSchedulerContentMouseOver, onMouseOut: this.onSchedulerContentMouseOut, onScroll: this.onSchedulerContentScroll },
                                _react2.default.createElement(
                                    'div',
                                    { style: { width: schedulerWidth } },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'scheduler-content' },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-content-table' },
                                            _react2.default.createElement(
                                                'tbody',
                                                null,
                                                resourceEventsList
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'scheduler-bg' },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-bg-table', style: { width: schedulerWidth } },
                                            _react2.default.createElement(_BodyView2.default, this.props)
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            };

            var popover = _react2.default.createElement(
                'div',
                { className: 'popover-calendar' },
                _react2.default.createElement(Calendar, { onSelect: this.onSelect })
            );

            return _react2.default.createElement(
                'table',
                { className: 'scheduler', style: { width: width } },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            { colSpan: '2' },
                            _react2.default.createElement(
                                _row2.default,
                                { type: 'flex', align: 'middle', justify: 'space-between', style: { marginBottom: '24px' } },
                                customHeader,
                                _react2.default.createElement(
                                    _col2.default,
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'header2-text' },
                                        _react2.default.createElement(_icon2.default, { type: 'left', style: { marginRight: "8px" }, className: 'icon-nav',
                                            onClick: this.goBack }),
                                        _react2.default.createElement(
                                            _popover2.default,
                                            { content: popover, placement: 'bottom', trigger: 'click',
                                                visible: this.state.visible,
                                                onVisibleChange: this.handleVisibleChange },
                                            _react2.default.createElement(
                                                'span',
                                                { style: { cursor: 'pointer' } },
                                                dateLabel
                                            )
                                        ),
                                        _react2.default.createElement(_icon2.default, { type: 'right', style: { marginLeft: "8px" }, className: 'icon-nav',
                                            onClick: this.goNext })
                                    )
                                ),
                                _react2.default.createElement(
                                    _col2.default,
                                    null,
                                    _react2.default.createElement(
                                        RadioGroup,
                                        { defaultValue: defaultValue, size: 'default', onChange: this.onViewChange },
                                        radioButtonList
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    tbodyContent
                )
            );
        }
    }]);

    return Scheduler;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired,
    prevClick: _propTypes2.default.func.isRequired,
    nextClick: _propTypes2.default.func.isRequired,
    onViewChange: _propTypes2.default.func.isRequired,
    onSelectDate: _propTypes2.default.func.isRequired,
    onSetAddMoreState: _propTypes2.default.func,
    updateEventStart: _propTypes2.default.func,
    updateEventEnd: _propTypes2.default.func,
    moveEvent: _propTypes2.default.func,
    customHeader: _propTypes2.default.object,
    newEvent: _propTypes2.default.func,
    subtitleGetter: _propTypes2.default.func,
    eventItemClick: _propTypes2.default.func,
    viewEventClick: _propTypes2.default.func,
    viewEventText: _propTypes2.default.string,
    viewEvent2Click: _propTypes2.default.func,
    viewEvent2Text: _propTypes2.default.string,
    conflictOccurred: _propTypes2.default.func,
    eventItemTemplateResolver: _propTypes2.default.func,
    dndSources: _propTypes2.default.array,
    resourceClickedFunc: _propTypes2.default.func
}, _temp);
var DATE_FORMAT = exports.DATE_FORMAT = 'YYYY-MM-DD';
var DATETIME_FORMAT = exports.DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
exports.SchedulerData = _SchedulerData2.default;
exports.ViewTypes = _ViewTypes2.default;
exports.SummaryPos = _SummaryPos2.default;
exports.DnDSource = _DnDSource2.default;
exports.DnDContext = _DnDContext2.default;
exports.AddMorePopover = _AddMorePopover2.default;
exports.DemoData = _DemoData2.default;
exports.default = Scheduler;