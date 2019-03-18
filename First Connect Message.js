/*
  Credits
  SinusBot Discord  - filled with a ton of helpful people
  Multivitamin      - helps to compensate my stupidness :D
  irgendwer         - "rude" part of Multivitamin but helps me too :*
  Diesmon           - Author of OKlib and also helpful
  Tuetchen          - Author of OKlib
*/

registerPlugin({
  name: 'First Connect Message',
  author: 'RLNT <RLNT@damn-community.com>',
  description: 'With this script, the bot will automatically message a user when joining for the first time.',
  version: '1.0.1',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },

    /* MAIN OPTIONS */
    {
      name: 'placeholder1',
      title: ''
    },
    {
      name: 'options-main',
      title: '### Main Options ###'
    },
    // default group
    {
      name: 'defaultGroup',
      title: 'Default Group (*)',
      type: 'number'
    },
    // logging
    {
      name: 'loggingEnabled',
      title: 'Should the actions the script is doing be logged?',
      type: 'select',
      options: [
        'Yes',
        'No'
      ]
    },

    /* MESSAGE OPTIONS */
    {
      name: 'placeholder2',
      title: ''
    },
    {
      name: 'options-message',
      title: '### Message Options ###'
    },
    // message
    {
      name: 'messageType',
      title: 'How should the client be notified?',
      indent: 1,
      type: 'select',
      options: [
        'Chat',
        'Poke',
        'Both'
      ]
    },
    {
      name: 'messageChat1',
      title: 'Chat message | [%user% = name of the client]',
      indent: 1,
      type: 'multiline',
      placeholder: 'Hello %user%! Welcome to our TeamSpeak!',
      conditions: [
        {
          field: 'messageType',
          value: 0
        }
      ]
    },
    {
      name: 'messagePoke1',
      title: 'Poke message | [%user% = name of the client]',
      indent: 1,
      type: 'string',
      placeholder: 'Hello %user%! Welcome to our TeamSpeak!',
      conditions: [
        {
          field: 'messageType',
          value: 1
        }
      ]
    },
    {
      name: 'messageChat2',
      title: 'Chat message | [%user% = name of the client]',
      indent: 1,
      type: 'multiline',
      placeholder: 'Hello %user%! Welcome to our TeamSpeak!',
      conditions: [
        {
          field: 'messageType',
          value: 2
        }
      ]
    },
    {
      name: 'messagePoke2',
      title: 'Poke message | [%user% = name of the client]',
      indent: 1,
      type: 'string',
      placeholder: 'Hello %user%! Welcome to our TeamSpeak!',
      conditions: [
        {
          field: 'messageType',
          value: 2
        }
      ]
    }
  ]
},

(SinusBot, config) => {

  /* DEPENDENCY VARIABLES */
  const engine = require('engine')
  const event = require('event')

  /* LOADING EVENT */
  event.on('load', () => {

    /* DEPENDENCIES */
    const oklib = require('OKlib.js')

    /* ERROR CHECK */
    if (!oklib) {
      engine.log('[RLNT] MOR > OKlib wasn\'t found!')
      engine.log('[RLNT] MOR > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] MOR > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.8')) {
      engine.log('[RLNT] MOR > OKlib is outdated!')
      engine.log('[RLNT] MOR > Minimum version of OKlib is 1.0.8!')
      engine.log('[RLNT] MOR > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
      /* EXECUTE MAIN FUNCTION */
      RLNT_FCM(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_FCM(oklib) {

    /* LOADED */
    engine.log('[RLNT] FCM > The script loaded successfully!')

    /* GLOBAL VARIABLES */
    // main
    const defaultGroup = config.defaultGroup || undefined
    if (defaultGroup === undefined) {
      engine.log('[RLNT] FCM > defaultGroup was not set in config, cancelling script')
      return
    }
    const loggingEnabled = config.loggingEnabled === 0 || false
    // message
    const messageType = config.messageType || 0
    let messageText1, messageText2
    if (messageType === 0) {
      messageText1 = config.messageChat1 || 'Hello %user%! Welcome to our TeamSpeak!'
    } else if (messageType === 1) {
      messageText1 = config.messagePoke1 || 'Hello %user%! Welcome to our TeamSpeak!'
    } else {
      messageText1 = config.messageChat2 || 'Hello %user%! Welcome to our TeamSpeak!'
      messageText2 = config.messagePoke2 || 'Hello %user%! Welcome to our TeamSpeak!'
    }

    /* FUNCTIONS */
    function log(client) {
      if (loggingEnabled)
        engine.log('[RLNT] FCM > Client \'' + client + '\' was notified | Reason: first time joining')
    }

    /* CLIENT MOVE EVENT */
    event.on('clientMove', RLNT => {
      const user = RLNT.client
      const channel = RLNT.fromChannel

      if (channel !== null || user === undefined || user === null || user.isSelf()) return

      if (oklib.client.isMemberOfGroup(user, defaultGroup)) {
        messageText1 = messageText1.replace('%user%', user.name())
        messageText2 = messageText2.replace('%user%', user.name())
        if (messageType === 0) {
          user.chat(messageText1)
        } else if (messageType === 1) {
          user.poke(messageText1)
        } else {
          user.chat(messageText1)
          user.poke(messageText2)
        }
        log(user.name())
      }
    })
  }
})
