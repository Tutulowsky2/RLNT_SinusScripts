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
  name: 'Move on Connect',
  author: 'RLNT <RLNT@damn-community.com>',
  description: 'With this script, the bot will automatically move a user when connecting.',
  version: '1.0.0',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },
    {
      name: 'moveArray',
      title: 'Move Pool',
      type: 'array',
      vars: [
        {
          name: 'moveWho',
          title: 'Who should be moved? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Only clients',
            'Only groups',
            "Both"
          ]
        },
        {
          name: 'moveClients',
          title: 'Clients that should be moved (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'moveWho',
              value: 0
            }
          ]
        },
        {
          name: 'moveGroups',
          title: 'Groups that should be moved (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'moveWho',
              value: 1
            }
          ]
        },
        {
          name: 'moveBothClients',
          title: 'Clients that should be moved (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'moveWho',
              value: 2
            }
          ]
        },
        {
          name: 'moveBothGroups',
          title: 'Groups that should be moved (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'moveWho',
              value: 2
            }
          ]
        },
        {
          name: 'channel',
          title: 'Target channel (*)',
          indent: 1,
          type: 'channel'
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
  var backend = require('backend')
  var event = require('event')

  /* LOADING EVENT */
  event.on('load', function () {

    /* DEPENDENCIES */
    var oklib = require('OKlib.js')

    /* ERROR CHECK */
    if (!oklib) {
      engine.log('[RLNT] MOC > OKlib wasn\'t found!')
      engine.log('[RLNT] MOC > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] MOC > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.8')) {
      engine.log('[RLNT] MOC > OKlib is outdated!')
      engine.log('[RLNT] MOC > Minimum version of OKlib is 1.0.8!')
      engine.log('[RLNT] MOC > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
      /* EXECUTE MAIN FUNCTION */
      RLNT_MOC(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_MOC (oklib) {

    /* LOADED */
    engine.log('[RLNT] MOC > The script loaded successfully!')

    /* FUNCTIONS */
    function makeArray (input) {
      var output = input
      if (!Array.isArray(output)) {
        output = [output]
      }
      return output
    }

    function logMove (user, input) {
      if (loggingEnabled) {
        engine.log('[RLNT] MOC > Client \'' + user.name() + '\' connected and was moved to the channel \'' + input.name() + '\'.')
      }
    }

    /* GLOBAL VARIABLES */
    var moveArray = config.moveArray
    var loggingEnabled = config.loggingEnabled == 0

    /* CLIENT MOVE EVENT */
    event.on('clientMove', function (RLNT) {
      var user = RLNT.client
      var channel = RLNT.toChannel

      if (user.isSelf() || RLNT.fromChannel != null) {return}

      if (channel.isDefault()) {
        for (var i in moveArray) {
          var toCheck = moveArray[i]
          var moveType = toCheck.moveWho
          var moveChannel = backend.getChannelByID(toCheck.channel)

          if (moveType == 0) {
            var moveClients = makeArray(toCheck.moveClients)
            if (moveClients.indexOf(user.uid()) > -1) {
              user.moveTo(moveChannel)
              logMove(user, moveChannel)
            }
          } else if (moveType == 1) {
            var moveGroups = makeArray(toCheck.moveGroups)
            if (oklib.client.isMemberOfOne(user, moveGroups)) {
              user.moveTo(moveChannel)
              logMove(user, moveChannel)
            }
          } else if (moveType == 2) {
            var moveBothClients = makeArray(toCheck.moveBothClients)
            var moveBothGroups = makeArray(toCheck.moveBothGroups)
            if (oklib.client.isMemberOfOne(user, moveBothGroups) || moveBothClients.indexOf(user.uid()) > -1) {
              user.moveTo(moveChannel)
              logMove(user, moveChannel)
            }
          }
        }
      }
    })
  }
})
