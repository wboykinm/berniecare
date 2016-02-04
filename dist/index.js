'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _RATES;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STANDARD_DEDUCTION = 12600;
var EXEMPTION = 4050;
var INCOME_TAX_PREMIUM = 0.022;
var AVERAGE_HEALTHCARE_COST = 4955 + 1318;

var CURRENT = (0, _symbol2.default)();
var FUTURE = (0, _symbol2.default)();

var RATES = (_RATES = {}, (0, _defineProperty3.default)(_RATES, CURRENT, [{
  maxIncome: 9275,
  rate: 0.1
}, {
  maxIncome: 37650,
  rate: 0.15
}, {
  maxIncome: 91150,
  rate: 0.25
}, {
  maxIncome: 190150,
  rate: 0.28
}, {
  maxIncome: 413350,
  rate: 0.33
}, {
  maxIncome: 415050,
  rate: 0.35
}, {
  rate: 0.396
}]), (0, _defineProperty3.default)(_RATES, FUTURE, [{
  maxIncome: 9275,
  rate: 0.1 + INCOME_TAX_PREMIUM
}, {
  maxIncome: 37650,
  rate: 0.15 + INCOME_TAX_PREMIUM
}, {
  maxIncome: 91150,
  rate: 0.25 + INCOME_TAX_PREMIUM
}, {
  maxIncome: 190150,
  rate: 0.28 + INCOME_TAX_PREMIUM
}, {
  maxIncome: 250000,
  rate: 0.33 + INCOME_TAX_PREMIUM
}, {
  maxIncome: 500000,
  rate: 0.37
}, {
  maxIncome: 2000000,
  rate: 0.43
}, {
  maxIncome: 10000000,
  rate: 0.48
}, {
  rate: 0.52
}]), _RATES);

function totalTaxes(type, totalIncome, exemptions) {
  var taxableIncome = totalIncome - STANDARD_DEDUCTION - exemptions * EXEMPTION;
  var taxes = 0;
  var taxedIncome = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(RATES[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var maxIncome = _step$value.maxIncome;
      var rate = _step$value.rate;

      if (taxedIncome !== taxableIncome) {
        var incomeInThisBracket = undefined;

        if (maxIncome) {
          incomeInThisBracket = Math.min(maxIncome, taxableIncome) - taxedIncome;
        } else {
          incomeInThisBracket = taxableIncome - taxedIncome;
        }

        taxes += incomeInThisBracket * rate;
        taxedIncome += incomeInThisBracket;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Math.max(taxes, 0);
}

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App() {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this));

    _this.state = { income: 53657, exemptions: 4, healthcare: AVERAGE_HEALTHCARE_COST };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var income = _state.income;
      var exemptions = _state.exemptions;
      var healthcare = _state.healthcare;

      var setIncome = function setIncome(e) {
        return _this2.setState({ income: e.target.value ? Math.max(0, e.target.value) : null });
      };
      var setExemptions = function setExemptions(e) {
        return _this2.setState({ exemptions: e.target.value ? Math.max(0, e.target.value) : null });
      };
      var setHealthcare = function setHealthcare(e) {
        return _this2.setState({ healthcare: e.target.value ? Math.max(0, e.target.value) : null });
      };

      var additionalTax = Math.round((totalTaxes(FUTURE, income || 0, exemptions || 0) - totalTaxes(CURRENT, income || 0, exemptions || 0)) * 100) / 100;
      var costDelta = Math.round((healthcare || 0) - additionalTax);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          { className: 'inputArea' },
          _react2.default.createElement(
            'div',
            { className: 'label' },
            'Household income'
          ),
          _react2.default.createElement('input', { type: 'number', value: income, onChange: setIncome }),
          _react2.default.createElement(
            'span',
            { className: 'dollarSign' },
            '$'
          )
        ),
        _react2.default.createElement(
          'label',
          { className: 'inputArea' },
          _react2.default.createElement(
            'div',
            { className: 'label' },
            'Number of people in your household'
          ),
          _react2.default.createElement('input', { type: 'number', value: exemptions, onChange: setExemptions })
        ),
        _react2.default.createElement(
          'label',
          { className: 'inputArea' },
          _react2.default.createElement(
            'div',
            { className: 'label' },
            'Current annual healthcare costs'
          ),
          _react2.default.createElement('input', { type: 'number', value: healthcare, onChange: setHealthcare }),
          _react2.default.createElement(
            'span',
            { className: 'dollarSign' },
            '$'
          )
        ),
        costDelta > 0 ? _react2.default.createElement(
          'div',
          { className: 'savings' },
          '$',
          costDelta.toLocaleString(),
          ' saved each year'
        ) : _react2.default.createElement(
          'div',
          { className: 'costs' },
          '$',
          (-costDelta).toLocaleString(),
          ' in additional costs each year'
        )
      );
    }
  }]);
  return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
};
window.shareTwitter = function shareTwitter() {
  var twitterUrl;
  if ((0, _jquery2.default)('.savings')[0]) {
    var savings1 = (0, _jquery2.default)('.savings')[0].children[1].innerHTML;
    twitterUrl = 'https://twitter.com/intent/tweet?text=I%27ll%20save%20$' + savings1 + '%20per%20year%20when%20@BernieSanders%27%20healthcare%20plan%20is%20implemented!%20Find%20out%20how%20much%20you%27ll%20save:%20berniecare.org&source=webclient';
  } else {
    twitterUrl = 'https://twitter.com/intent/tweet?text=Find%20out%20how%20much%20you%27ll%20save%20when%20@BernieSanders%27%20healthcare%20plan%20is%20implemented:%20berniecare.org&source=webclient';
  }
  openInNewTab(twitterUrl);
};
window.shareFacebook = function shareFacebook() {
  if ((0, _jquery2.default)('.savings')[0]) {
    var savings1 = (0, _jquery2.default)('.savings')[0].children[1].innerHTML;
    window.FB.ui({
      method: 'share',
      caption: "I'll save $" + savings1 + " per year when Bernie Sanders'​ health care plan is implemented! Find out how much you'll save: ",
      href: 'http://berniecare.org',
      redirect_uri: 'http://berniecare.org'
    }, function () {});
  } else {
    window.FB.ui({
      method: 'share',
      caption: "Find out how much you'll save per year when Bernie Sanders'​ health care plan is implemented!",
      href: 'http://berniecare.org',
      redirect_uri: 'http://berniecare.org'
    }, function () {});
  }
};

function modalActive(e) {
  if ((0, _jquery2.default)(this).hasClass('active')) {
    (0, _jquery2.default)(this).children('.info-content').removeClass('active').delay(350).queue(function () {
      (0, _jquery2.default)(this).parent().removeClass('active');
      (0, _jquery2.default)(this).dequeue();
    });
  } else {
    (0, _jquery2.default)(this).addClass('active').delay(350).queue(function () {
      (0, _jquery2.default)(this).children('.info-content').addClass('active');
      (0, _jquery2.default)(this).dequeue();
    });
  }
}

function modalDismiss(e) {
  if (e.target !== (0, _jquery2.default)('#information') && (0, _jquery2.default)('.info-content').hasClass('active')) {
    (0, _jquery2.default)('#information').children('.info-content').removeClass('active').delay(350).queue(function () {
      (0, _jquery2.default)(this).parent().removeClass('active');
      (0, _jquery2.default)(this).dequeue();
    });
  }
}

(0, _jquery2.default)(window).on('click', modalDismiss);
(0, _jquery2.default)('#information').on('click', modalActive);
//# sourceMappingURL=index.js.map