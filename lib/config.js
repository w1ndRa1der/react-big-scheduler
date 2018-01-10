'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ViewTypes = require('./ViewTypes');

var _ViewTypes2 = _interopRequireDefault(_ViewTypes);

var _SummaryPos = require('./SummaryPos');

var _SummaryPos2 = _interopRequireDefault(_SummaryPos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    schedulerWidth: 1000,
    schedulerMaxHeight: 0,
    tableHeaderHeight: 40,

    agendaResourceTableWidth: 160,
    agendaMaxEventWidth: 100,

    dayResourceTableWidth: 160,
    weekResourceTableWidth: 160,
    monthResourceTableWidth: 160,
    quarterResourceTableWidth: 160,
    yearResourceTableWidth: 160,

    dayCellWidth: 30,
    weekCellWidth: 120,
    monthCellWidth: 60,
    quarterCellWidth: 60,
    yearCellWidth: 60,

    dayMaxEvents: 99,
    weekMaxEvents: 99,
    monthMaxEvents: 99,
    quarterMaxEvents: 99,
    yearMaxEvents: 99,

    eventItemHeight: 22,
    eventItemLineHeight: 24,
    dayStartFrom: 0,
    dayStopTo: 23,
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3',
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: _SummaryPos2.default.TopRight,

    startResizable: true,
    endResizable: true,
    movable: true,
    creatable: true,
    crossResourceMove: true,
    checkConflict: false,
    scrollToTodayEnabled: true,

    views: [{ viewName: '天', viewType: _ViewTypes2.default.Day, showAgenda: false, isEventPerspective: false }, { viewName: '周', viewType: _ViewTypes2.default.Week, showAgenda: false, isEventPerspective: false }, { viewName: '月', viewType: _ViewTypes2.default.Month, showAgenda: false, isEventPerspective: false }, { viewName: '年', viewType: _ViewTypes2.default.Year, showAgenda: false, isEventPerspective: false }]
};