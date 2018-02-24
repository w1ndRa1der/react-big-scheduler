'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNonWorkingTime = exports.getEventText = exports.getSummary = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//getSummaryFuncExample
var getSummary = exports.getSummary = function getSummary(schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) {
    return { text: 'Summary', color: 'red', fontSize: '1.2rem' };
};

var getEventText = exports.getEventText = function getEventText(schedulerData, event) {
    if (!schedulerData.isEventPerspective) return event.title;

    var eventText = event.title;
    schedulerData.resources.forEach(function (item) {
        if (item.id === event.resourceId) {
            eventText = item.name;
        }
    });

    return eventText;
};

var isNonWorkingTime = exports.isNonWorkingTime = function isNonWorkingTime(schedulerData, time) {
    if (schedulerData.viewType === _index.ViewTypes.Day) {
        var hour = (0, _moment2.default)(time).hour();
        var date = (0, _moment2.default)(time).format("YYYYMMDD");
        var currentHour = (0, _moment2.default)().hour();
        var currentDate = (0, _moment2.default)().format("YYYYMMDD");
        if (hour == currentHour && date == currentDate) return true;
    } else {
        var dayOfWeek = (0, _moment2.default)(time).weekday();
        if (dayOfWeek === 5 || dayOfWeek === 6) return true;
    }

    return false;
};

exports.default = {
    //getSummaryFunc: getSummary,
    getSummaryFunc: undefined,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime
};