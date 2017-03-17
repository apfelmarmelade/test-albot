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

  const handleq1 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q1')
     client.done()
    }
  })

  const handleq2 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q2')
     client.done()
    }
  })

  const handleq3 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q3')
     client.done()
    }
  })

  const handleq4 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1/q4')
     client.done()
    }
  })

/*  const handle1 = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('out_num1')
     client.done()
    }
  }) */

  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting',
      gq1: 'in_num1/q1',
      gq2: 'in_num1/q2',
      gq3: 'in_num1/q3',
      gq4: 'in_num1/q4'
  //  g1: 'in_num1'
    },
    streams: {
      main: 'gq1'
      onboarding: ['gq1', 'gq2', 'gq3', 'gq4'],
      goodbye: handleGoodbye,
      greeting: handleGreeting,
//    g1: handle1,
      gq1: handleq1,
      gq2: handleq2,
      gq3: handleq3,
      gq4: handleq4,
      end: [untrained]
    }
  })
}
