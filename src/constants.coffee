React = require 'react'
keyMirror = require 'fbjs/lib/keyMirror'


module.exports =

  Keys:
    ENTER: 13
    ESC: 27
    LEFT: 37
    UP: 38
    RIGHT: 39
    DOWN: 40

  Units:
    YEAR: 'years'
    MONTH: 'months'
    DAY: 'days'
    HOUR: 'hours'

  Types: keyMirror
    JS_DATE: null
    MOMENT: null
    ISO: null
    STRING: null

  Levels:
    years:
      up: null
      down: 'months'
      nav:
        unit: 'years'
        span: 10
      key:
        unit: 'year'
        span: 1
    months:
      up: 'years'
      down: 'days'
      nav:
        unit: 'year'
        span: 1
      key:
        unit: 'month'
        span: 1
    days:
      up: 'months'
      down: null
      nav:
        unit: 'month'
        span: 1
      key:
        unit: 'day'
        span: 1
    hours:
      up: null
      down: null
      key:
        unit: 'minutes'
        span: 30
