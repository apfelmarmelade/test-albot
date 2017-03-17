'use strict'

exports.handle = function handle(client) {
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
     client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('goodbye')
     client.done()
    }
  })

  const handleQ1 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q1')
     client.done()
    }
  })

  const handleQ2 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q2')
     client.done()
    }
  })

  const handleQ3 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q3')
     client.done()
    }
  })

  const handleQ4 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q4')
     client.done()
    }
  })

  const handle1 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1')
     client.done()
    }
  })

  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting',
      gQ1: 'in_num1/q1',
      gQ2: 'in_num1/q2',
      gQ3: 'in_num1/q3',
      gQ4: 'in_num1/q4',
      g1: 'in_num1'
    },
    streams: {
      main: 'g1'
      goodbye: handleGoodbye,
      greeting: handleGreeting,
      g1: handle1,
      gQ1: handleQ1,
      gQ2: handleQ2,
      gQ3: handleQ3,
      gQ4: handleQ4,
      onboarding: [sayHello],
      end: [untrained]
    }
  })
}
