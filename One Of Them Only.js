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
  name: 'One of them only',
  author: 'RLNT <RLNT@damn-community.com',
  description: 'With this script, the bot will remove all other groups of a group when another one of the group is given so the user can only have one of them.',
  version: '1.0.0',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },
    {
      name: 'groupArray',
      title: 'Groups',
      type: 'array',
      vars: [
        {
          name: 'groups',
          title: 'Which are the groups the user can have one only from? (*)',
          indent: 1,
          type: 'strings'
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
      engine.log('[RLNT] OOTO > OKlib wasn\'t found!')
      engine.log('[RLNT] OOTO > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] OOTO > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.8')) {
      engine.log('[RLNT] OOTO > OKlib is outdated!')
      engine.log('[RLNT] OOTO > Minimum version of OKlib is 1.0.8!')
      engine.log('[RLNT] OOTO > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
      /* EXECUTE MAIN FUNCTION */
      RLNT_OOTO(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_OOTO (oklib) {

    /* LOADED */
    engine.log('[RLNT] OOTO > The script loaded successfully!')

    /* FUNCTIONS */
    function makeArray (input) {
      var output = input
      if (!Array.isArray(output)) {
        output = [output]
      }
      return output
    }

    function getGroupNames (input) {
      var output = '['
      for (var i in input) {
        output += '\'' + backend.getServerGroupByID(input[i]).name() + '\','
      }
      output = output.slice(0, -1) + ']'
      return output
    }

    function logGroupRemove (user, input) {
      if (loggingEnabled) {
        input = getGroupNames(input)
        engine.log('[RLNT] OOTO > Client \'' + user.name() + '\' was removed from the group(s) \'' + input + '\'.')
      }
    }

    /* GLOBAL VARIABLES */
    var groups = config.groupArray
    var loggingEnabled = config.loggingEnabled == 0

    /* GROUP ADDING EVENT */
    event.on('serverGroupAdded', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()

      for (var i in groups) {
        var toCheck = makeArray(groups[i].groups)

        if (toCheck.indexOf(groupID) > -1) {
          var remaining = oklib.array.removeElements(toCheck, makeArray(groupID))

          if (oklib.client.isMemberOfOne(user, remaining)) {
            oklib.client.removeFromGroups(user, remaining)
            logGroupRemove(user, remaining)
          }
        }
      }
    })
  }
})
