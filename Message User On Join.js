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
  name: 'Message User on Join',
  author: 'RLNT <RLNT@damn-community.com>',
  description: 'With this script, the bot will automatically message a user when joining a specified channel.',
  version: '1.0.0',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },
    {
      name: 'channelArray',
      title: 'Channels',
      type: 'array',
      vars: [
        {
          name: 'channel',
          title: 'Channel (*)',
          indent: 1,
          type: 'channel'
        },
        {
          name: 'message',
          title: 'Message (*) | [%user% = Client Name]',
          indent: 1,
          type: 'multiline',
          placeholder: 'Hello %user%! How can I help you?'
        },
        {
          name: 'blacklistGroups',
          title: 'Should there be blacklisted groups for this channel? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          name: 'blacklistedGroups',
          title: 'Blacklisted Groups (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'blacklistGroups',
              value: 0
            }
          ]
        },
        {
          name: 'blacklistClients',
          title: 'Should there be blacklisted clients for this channel? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          name: 'blacklistedClients',
          title: 'Blacklisted Client-UIDs (*)',
          indent: 2,
          type: 'strings',
          conditions: [
            {
              field: 'blacklistClients',
              value: 0
            }
          ]
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
      engine.log('[RLNT] MUOJ > OKlib wasn\'t found!')
      engine.log('[RLNT] MUOJ > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] MUOJ > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.8')) {
      engine.log('[RLNT] MUOJ > OKlib is outdated!')
      engine.log('[RLNT] MUOJ > Minimum version of OKlib is 1.0.8!')
      engine.log('[RLNT] MUOJ > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
      /* EXECUTE MAIN FUNCTION */
      RLNT_MUOJ(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_MUOJ (oklib) {

    /* LOADED */
    engine.log('[RLNT] MUOJ > The script loaded successfully!')

    /* FUNCTIONS */
    function makeArray (input) {
      var output = input
      if (!Array.isArray(output)) {
        output = [output]
      }
      return output
    }

    function isBlacklisted (i, user) {
      var blacklistGroups = channels[i].blacklistGroups == 0
      var blacklistClients = channels[i].blacklistClients == 0

      if (blacklistGroups) {
        var groupBlacklist = channels[i].blacklistedGroups
        if (oklib.client.isMemberOfOne(user, groupBlacklist)) {
          return true
        }
      }
      if (blacklistClients) {
        var clientBlacklist = channels[i].blacklistedClients
        if (clientBlacklist.indexOf(user.uid()) > -1) {
          return true
        }
      }
      return false
    }

    function logBlacklisted (user, channel) {
      if (loggingEnabled) {
        engine.log('[RLNT] MUOJ > Client \'' + user.name() + '\' tried to get messaged by joining the channel \'' + backend.getChannelByID(channel).name() + '\' but was ignored because of the blacklist.')
      }
    }

    function logMessaged (user, channel) {
      if (loggingEnabled) {
        engine.log('[RLNT] MUOJ > Client \'' + user.name() + '\' was messaged because of joining the channel \'' + backend.getChannelByID(channel).name() + '\'.')
      }
    }

    /* GLOBAL VARIABLES */
    var channels = config.channelArray
    var loggingEnabled = config.loggingEnabled == 0

    /* CLIENT MOVE EVENT */
    event.on('clientMove', function (RLNT) {
      if (RLNT.client.isSelf()) {return}
      var channelID = RLNT.toChannel.id()

      for (var i in channels) {
        var toCheck = channels[i]
        var channel = toCheck.channel

        if (channelID == channel) {
          var user = RLNT.client
          var message = toCheck.message.replace('%user%', user.name())

          if (isBlacklisted(i, user)) {
            logBlacklisted(user, channelID)
          } else {
            user.chat(message)
            logMessaged(user, channelID)
          }
        }
      }
    })
  }
})
