'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _reactDnd = require('react-dnd');

var _index = require('./index');

var _DnDTypes = require('./DnDTypes');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DnDSource = function DnDSource(resolveDragObjFunc, DecoratedComponent) {
    var _this = this;

    var dndType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _DnDTypes.DnDTypes.EVENT;

    _classCallCheck(this, DnDSource);

    this.getDragSpec = function () {
        return {
            beginDrag: function beginDrag(props, monitor, component) {
                return _this.resolveDragObjFunc(props);
            },
            endDrag: function endDrag(props, monitor, component) {
                if (!monitor.didDrop()) return;

                var moveEvent = props.moveEvent,
                    newEvent = props.newEvent,
                    schedulerData = props.schedulerData;
                var events = schedulerData.events,
                    config = schedulerData.config,
                    viewType = schedulerData.viewType;

                var item = monitor.getItem();
                var type = monitor.getItemType();
                var dropResult = monitor.getDropResult();
                var slotId = dropResult.slotId,
                    slotName = dropResult.slotName;
                var newStart = dropResult.start,
                    newEnd = dropResult.end;
                var isEvent = type === _DnDTypes.DnDTypes.EVENT;

                if (isEvent) {
                    var _event = item;
                    if (viewType !== _index.ViewTypes.Day) {
                        var tmpMoment = (0, _moment2.default)(newStart);
                        newStart = (0, _moment2.default)(_event.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date()).format(_index.DATETIME_FORMAT);
                    }
                    newEnd = (0, _moment2.default)(newStart).add((0, _moment2.default)(_event.end).diff((0, _moment2.default)(_event.start)), 'ms').format(_index.DATETIME_FORMAT);
                }

                var hasConflict = false;
                if (config.checkConflict) {
                    var start = (0, _moment2.default)(newStart),
                        end = (0, _moment2.default)(newEnd);

                    events.forEach(function (e) {
                        if (schedulerData._getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
                            var eStart = (0, _moment2.default)(e.start),
                                eEnd = (0, _moment2.default)(e.end);
                            if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                        }
                    });
                }

                if (hasConflict) {
                    var conflictOccurred = props.conflictOccurred;

                    if (conflictOccurred != undefined) {
                        conflictOccurred(schedulerData, 'Move', event);
                    } else {
                        console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                    }
                } else {
                    if (isEvent) {
                        if (moveEvent !== undefined) {
                            //if crossResourceMove disabled, slot returns old value
                            if (config.crossResourceMove === false) {
                                slotId = schedulerData._getEventSlotId(item);
                                slotName = undefined;
                                var slot = schedulerData.getSlotById(slotId);
                                if (!!slot) slotName = slot.name;
                            }
                            moveEvent(schedulerData, item, slotId, slotName, newStart, newEnd);
                        }
                    } else {
                        if (newEvent !== undefined) newEvent(schedulerData, slotId, slotName, newStart, newEnd, type, item);
                    }
                }
            },

            canDrag: function canDrag(props) {
                var schedulerData = props.schedulerData;

                var item = _this.resolveDragObjFunc(props);
                if (schedulerData._isResizing()) return false;
                var config = schedulerData.config;

                return config.movable && (item.movable == undefined || item.movable !== false);
            }
        };
    };

    this.getDragCollect = function (connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
            connectDragPreview: connect.dragPreview()
        };
    };

    this.getDragSource = function () {
        return _this.dragSource;
    };

    this.resolveDragObjFunc = resolveDragObjFunc;
    this.DecoratedComponent = DecoratedComponent;
    this.dndType = dndType;
    this.dragSource = (0, _reactDnd.DragSource)(this.dndType, this.getDragSpec(), this.getDragCollect)(this.DecoratedComponent);
};

exports.default = DnDSource;