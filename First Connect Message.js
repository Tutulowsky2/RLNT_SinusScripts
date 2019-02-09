// @ts-check
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
    {
      name: 'defaultGroup',
      title: 'Default Group (*)',
      type: 'string'
    },
    {
      name: 'messageType',
      title: 'Message Type (*)',
      type: 'select',
      options: [
        'Poke',
        'Chat'
      ]
    },
    {
      name: 'pokeText',
      title: 'Poke Text | [%user% = Client Name]',
      indent: 1,
      type: 'string',
      conditions: [
        {
          field: 'messageType',
          value: 0
        }
      ]
    },
    {
      name: 'chatText',
      title: 'Chat Text | [%user% = Client Name]',
      indent: 1,
      type: 'multiline',
      conditions: [
        {
          field: 'messageType',
          value: 1
        }
      ]
    },
    {
      name: 'loggingEnabled',
      title: 'Should the actions the script is doing be logged? (*)',
      type: 'select',
      options: [
        'Yes',
        'No'
      ]
    }
  ]
},

function (SinusBot, config) {

  /* DEPENDENCY VARIABLES */
  var engine = require('engine')
  var event = require('event')

  /* LOADING EVENT */
  event.on('load', function () {

    /* DEPENDENCIES */
    var oklib = require('OKlib.js')

    /* ERROR CHECK */
    if (!oklib) {
      engine.log('[RLNT] FCM > OKlib wasn\'t found!')
      engine.log('[RLNT] FCM > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] FCM > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.8')) {
      engine.log('[RLNT] FCM > OKlib is outdated!')
      engine.log('[RLNT] FCM > Minimum version of OKlib is 1.0.8!')
      engine.log('[RLNT] FCM > Install the required version or the script is disabled!')
      engine.log('[RLNT] FCM > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
      /* EXECUTE MAIN FUNCTION */
      RLNT_FCM(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_FCM (oklib) {

    /* LOADED */
    engine.log('[RLNT] FCM > The script loaded successfully!')

    /* FUNCTIONS */
    function logMessaged (user, type) {
      if (loggingEnabled) {
        if (type == 0) {
          engine.log('[RLNT] FCM > Client \'' + user.name() + '\' was poked because of first joining.')
        } else if (type == 1) {
          engine.log('[RLNT] FCM > Client \'' + user.name() + '\' was messaged because of first joining.')
        }
      }
    }

    /* GLOBAL VARIABLES */
    var defaultGroup = config.defaultGroup
    var messageType = config.messageType
    var loggingEnabled = config.loggingEnabled == 0

    /* CLIENT MOVE EVENT */
    event.on('clientMove', function (RLNT) {
      var user = RLNT.client
      var channel = RLNT.toChannel

      if (user.isSelf() || RLNT.fromChannel != null) { return }

      if (channel.isDefault() && oklib.client.isMemberOfGroup(user, defaultGroup)) {
        if (messageType == 0) {
          var pokeText = config.pokeText.replace('%user%', user.name())
          user.poke(pokeText)
          logMessaged(user, 0)
        } else if (messageType == 1) {
          var chatText = config.chatText.replace('%user%', user.name())
          user.chat(chatText)
          logMessaged(user, 1)
        }
      }
    })
  }
})
