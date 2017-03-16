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
      client.addResponse('out_num1/Q1')
     client.done()
    }
  })


  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting',
      getQ1: 'in_num1/Q1'
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
      getQ1: handleQ1,
      main: 'greeting',
      onboarding: [sayHello],
      end: [untrained]
    }
  })
}
