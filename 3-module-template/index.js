const Entrypoint = require('@pm2/io').Entrypoint

class KeymetricsIntegration extends Entrypoint {
  onStart(cb) {
    console.log('Started')

    this.initModule({
      // this overrides the application name
      reference: 'hygro-container',
      caracteristics: {
        sensor1: 'text'
      }
    })

    this.baseSpeed = 40

    setInterval(() => {}, 1000)

    return cb()
  }

  onStop(err, cb) {
    console.log('Stopped')
    return cb()
  }

  sensors() {
    this.metric({
      name: 'speed',
      unit: 'km/h',
      alert: {
        mode : 'threshold-avg',
        value : 10,
        cmp : '<'
      },
      value: () => {
        return Math.floor(this.baseSpeed + Math.random() * 20)
      }
    })

    this.metric({
      name: 'tour/min',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'passengers',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'l/100',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'engine t°',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'coolant t°',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'total km',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'nb of travels',
      value: function() {
        return 12
      }
    })

    this.metric({
      name: 'airbags',
      value: function() {
        return 'healthy'
      }
    })

    this.metric({
      name: 'gps lat',
      value: function() {
        return 48.864716;
      }
    })

    this.metric({
      name: 'gps lng',
      value: function() {
        return 2.349014
      }
    })

    console.log('Sensors Initialized')
  }

  actuators() {
    this.action('run diagnostic', reply => {
      reply({ thats: 'a report', type: 'run diagnostic' })
    })

    this.action('increase speed', reply => {
      if (this.baseSpeed == 40)
        this.baseSpeed = 70
      else
        this.baseSpeed = 40
      reply({ msg : `Now base speed is ${this.baseSpeed}` })
    })

    this.action('stop car', reply => {
      // if (car.isRunning == false) {
      reply({ thats: 'a report', type: 'run diagnostic' })
    })

    console.log('Action Initialized')
  }

  events() {
    console.log('Events Initialized')

    setInterval(() => {
      this.emitEvent('door:opened', { ok: true})
    }, 1000)

    // doorOpened(() => {
    //   this.logEvent({ type: 'Door opened' })
    // })
  }
}

new KeymetricsIntegration()
