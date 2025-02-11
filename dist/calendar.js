// Generated by CoffeeScript 1.10.0
var Calendar, Cell, Levels, Moment, Navigation, React, Units, cn, createStyledComponent, getStyle, ref;

React = require('react');

Moment = require('moment-range');

cn = require('classnames');

ref = require('./constants'), Levels = ref.Levels, Units = ref.Units;

Navigation = require('./nav');

Cell = require('./cell');

createStyledComponent = require('./styled-component');

getStyle = require('./styles');

Calendar = React.createClass({
  displayName: 'Calendar',
  propTypes: {
    datetime: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    level: React.PropTypes.string.isRequired,
    setLevel: React.PropTypes.func.isRequired,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func
  },
  componentDidMount: function() {
    return this.scrollToHour();
  },
  componentDidUpdate: function(prevProps) {
    return this.scrollToHour();
  },
  scrollToHour: function() {
    var selected;
    if (this.props.level === 'hours' && this.refs.selected) {
      selected = React.findDOMNode(this.refs.selected);
      return selected.parentNode.scrollTop = selected.offsetTop - 6;
    }
  },
  onNavigateCell: function(datetime) {
    var lvl;
    lvl = Levels[this.props.level];
    if (lvl.down) {
      this.props.setLevel(lvl.down);
    }
    return this.props.onSelect(datetime, !lvl.down);
  },
  onNavigateUp: function() {
    var lvl;
    lvl = Levels[this.props.level];
    if (lvl.up) {
      return this.props.setLevel(lvl.up);
    }
  },
  onNavigateLeft: function() {
    var lvl;
    lvl = Levels[this.props.level].nav;
    return this.props.onSelect(this.props.datetime.subtract(lvl.span, lvl.unit));
  },
  onNavigateRight: function() {
    var lvl;
    lvl = Levels[this.props.level].nav;
    return this.props.onSelect(this.props.datetime.add(lvl.span, lvl.unit));
  },
  onToday: function() {
    var lvl;
    lvl = Levels[this.props.level];
    if (Moment(this.props.datetime).isSame(Moment(), 'day')) {
      return this.props.onSelect(Moment(), !lvl.down);
    } else {
      return this.props.onSelect(Moment());
    }
  },
  getTitle: {
    years: function(datetime) {
      var end, start, years;
      datetime || (datetime = Moment());
      start = datetime.clone().subtract(4, 'years');
      end = datetime.clone().add(7, 'years');
      years = [];
      Moment().range(start, end).by(Units.YEAR, function(year) {
        return years.push({
          label: year.format('YYYY'),
          selected: year.isSame(datetime, 'year')
        });
      });
      return [years[0].label, years[years.length - 1].label].join('-');
    },
    months: function(datetime) {
      datetime || (datetime = Moment());
      return datetime.format('YYYY');
    },
    days: function(datetime) {
      datetime || (datetime = Moment());
      return datetime.format('MMMM');
    },
    hours: function(datetime) {
      return null;
    }
  },
  getCells: {
    years: function(datetime) {
      var end, start, years;
      datetime || (datetime = Moment());
      start = datetime.clone().subtract(4, 'years');
      end = datetime.clone().add(7, 'years');
      years = [];
      Moment().range(start, end).by(Units.YEAR, function(year) {
        return years.push({
          moment: year,
          label: year.format('YYYY'),
          selected: year.isSame(datetime, 'year')
        });
      });
      return years;
    },
    months: function(datetime) {
      var end, months, start;
      datetime || (datetime = Moment());
      start = datetime.clone().startOf('year');
      end = datetime.clone().endOf('year');
      months = [];
      Moment().range(start, end).by(Units.MONTH, function(month) {
        return months.push({
          moment: month,
          label: month.format('MMM'),
          selected: month.isSame(datetime, 'month')
        });
      });
      return months;
    },
    days: function(datetime) {
      var days, end, start;
      datetime || (datetime = Moment());
      start = datetime.clone().startOf('month').weekday(0);
      end = datetime.clone().endOf('month').weekday(6);
      days = [];
      Moment.weekdaysMin().forEach(function(day) {
        return days.push({
          label: day,
          header: true
        });
      });
      Moment().range(start, end).by(Units.DAY, function(day) {
        return days.push({
          moment: day,
          label: day.format('D'),
          past: day.isBefore(datetime, 'month'),
          future: day.isAfter(datetime, 'month'),
          selected: day.isSame(datetime, 'day'),
          today: day.isSame(Moment(), 'day')
        });
      });
      return days;
    },
    hours: function(datetime) {
      var closeAfter, closeBefore, end, hours, start;
      datetime || (datetime = Moment());
      start = datetime.clone().startOf('day');
      end = datetime.clone().endOf('day');
      hours = [];
      closeBefore = datetime.clone().subtract(31, 'minutes');
      closeAfter = datetime.clone().add(31, 'minutes');
      Moment().range(start, end).by(Units.HOUR, function(hour) {
        var halfHour;
        hours.push({
          moment: hour,
          label: hour.format('h:mm a'),
          selected: hour.isSame(datetime, 'minute'),
          nearestBefore: hour.isBetween(closeBefore, datetime),
          nearestAfter: hour.isBetween(datetime, closeAfter)
        });
        halfHour = hour.clone().add(30, 'minutes');
        return hours.push({
          moment: halfHour,
          label: halfHour.format('h:mm a'),
          selected: halfHour.isSame(datetime, 'minute'),
          nearestBefore: halfHour.isBetween(closeBefore, datetime),
          nearestAfter: halfHour.isBetween(datetime, closeAfter)
        });
      });
      return hours;
    }
  },
  render: function() {
    var dates;
    dates = this.props.level !== 'hours';
    return React.createElement("div", {
      "className": this.props.classes.calendar,
      "onMouseDown": ((function(_this) {
        return function(e) {
          _this.props.above(true);
          return e;
        };
      })(this)),
      "onMouseUp": ((function(_this) {
        return function(e) {
          _this.props.above(false);
          return e;
        };
      })(this))
    }, dates && React.createElement(Navigation, {
      "id": this.props.id,
      "onPrev": this.onNavigateLeft,
      "onNext": this.onNavigateRight,
      "onTitle": this.onNavigateUp,
      "title": this.getTitle[this.props.level](this.props.datetime)
    }), React.createElement("div", {
      "ref": 'grid',
      "className": cn(this.props.classes.grid, this.props.level)
    }, this.getCells[this.props.level](this.props.datetime).map((function(_this) {
      return function(cell, i) {
        var type;
        type = (function() {
          switch (false) {
            case !cell.header:
              return 'header';
            case !cell.past:
              return 'past';
            case !cell.future:
              return 'future';
            default:
              return 'base';
          }
        })();
        return React.createElement(Cell, {
          "key": i,
          "ref": (cell.selected || cell.nearestBefore ? 'selected' : void 0),
          "label": cell.label,
          "level": _this.props.level,
          "type": type,
          "selected": cell.selected,
          "today": cell.today,
          "moment": cell.moment,
          "onClick": _this.onNavigateCell,
          "classes": _this.props.classes,
          "invalid": _this.props.validate(cell.moment, _this.props.level)
        });
      };
    })(this)), dates && React.createElement("div", {
      "className": this.props.classes.today,
      "onClick": this.onToday
    }, "Today")));
  }
});

module.exports = createStyledComponent(Calendar, function(props, id) {
  return getStyle('calendar', props, id);
});
