'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderView = (_temp = _class = function (_Component) {
    _inherits(HeaderView, _Component);

    function HeaderView(props) {
        _classCallCheck(this, HeaderView);

        return _possibleConstructorReturn(this, (HeaderView.__proto__ || Object.getPrototypeOf(HeaderView)).call(this, props));
    }

    _createClass(HeaderView, [{
        key: 'render',
        value: function render() {
            var schedulerData = this.props.schedulerData;
            var headers = schedulerData.headers,
                viewType = schedulerData.viewType,
                config = schedulerData.config;

            var headerHeight = schedulerData.getTableHeaderHeight();
            var cellWidth = schedulerData.getContentCellWidth();

            var headerList = [];
            var style = {};
            if (viewType === _index.ViewTypes.Day) {
                headers.forEach(function (item, index) {
                    if (index % 4 === 0) {
                        var datetime = (0, _moment2.default)(item.time);
                        var time = datetime.format('HH:mm');
                        style = !!item.nonWorkingTime ? { width: cellWidth * 4, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: cellWidth * 4 };
                        if (index === headers.length - 2) style = !!item.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};
                        var element = _react2.default.createElement(
                            'th',
                            { key: item.time, className: 'header3-text', style: style },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    time
                                )
                            )
                        );

                        headerList.push(element);
                    }
                });
            } else {
                headerList = headers.map(function (item, index) {
                    var time = (0, _moment2.default)(item.time);
                    var weekDay = time.format('ddd');
                    var date = time.format('M/D');
                    style = !!item.nonWorkingTime ? { width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: cellWidth };
                    if (index === headers.length - 1) style = !!item.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};
                    return _react2.default.createElement(
                        'th',
                        { key: item.time, className: 'header3-text', style: style },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'p',
                                null,
                                weekDay
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                date
                            )
                        )
                    );
                });
            }

            return _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    { style: { height: headerHeight } },
                    headerList
                )
            );
        }
    }]);

    return HeaderView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes2.default.object.isRequired
}, _temp);
exports.default = HeaderView;