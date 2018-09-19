
var Entrypoint = require('@pm2/io').Entrypoint
var gen = require('./gen.js')

new class App extends Entrypoint {
  onStart(cb) {
    this.initModule({
      reference: 'metrics-generator'
    })

    return cb()
  }

  onStop() {
  }

  sensors() {
    // #1 sin curve
    var sin = 0

    setInterval(function() {
      sin = gen.sinus()
    }, 20000)

    this.io.metric({
      name: 'sin',
      value: function() {
        return sin
      }
    })

    // #2 curve
    var c1 = -10

    setInterval(function() {
      c1 == -10 ? c1 = 10 : c1 = -10
    }, 60000)

    this.io.metric({
      name: 'c1',
      value: function() {
        return c1
      }
    })

    // #3 curve
    var c2_deviation = 0

    setInterval(function() {
      c2_deviation == 0 ? c2_deviation = 10 : c2_deviation = 0
    }, 60000 * 3)

    this.io.metric({
      name: 'c2 random',
      value: function() {
        return Math.floor((Math.random() * 10) + 1) + c2_deviation;
      }
    })

    // #4 curve
    var c3_deviation = 0

    setInterval(function() {
      c3_deviation == 0 ? c3_deviation = 20 : c3_deviation = 0
    }, 60000 * 3)

    this.io.metric({
      name: 'c3 deviation',
      value: function() {
        return c3_deviation
      }
    })

    // #5 curve
    var c4_deviation = 0

    setInterval(function() {
      c4_deviation++
    }, 60000)

    this.io.metric({
      name: 'c4 increment',
      value: function() {
        return c4_deviation
      }
    })

    // #5 curve
    var c5_curve = 999999

    setInterval(function() {
      c5_curve--
    }, 60000)

    this.io.metric({
      name: 'c5 curve',
      value: function() {
        return c5_curve
      }
    })

    // #5 curve
    var c6_curve = 0

    setInterval(function() {
      c6_curve += Math.floor((Math.random() * 10) + 1);
    }, 60000)

    this.io.metric({
      name: 'c6 curve',
      value: function() {
        return c6_curve
      }
    })
  }
}
