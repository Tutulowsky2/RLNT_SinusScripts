// @ts-check
/*
  Credits
  SinusBot Discord  - filled with a ton of helpful people
  Multivitamin      - helps to compensate my stupidness :D
  irgendwer         - "rude" part of Multivitamin but helps me too :*
  Diesmon           - Author of OKlib
  Tuetchen          - Author of OKlib
*/

registerPlugin({
  name: 'Automated Header Groups',
  author: 'RLNT <RLNT@damn-community.com>',
  description: 'With this script, the bot will automatically assign or remove header groups if the client has at least one of the corresponding trigger groups.',
  version: '1.0.0',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },
    {
      name: 'groupArray',
      title: 'Add Group Section',
      type: 'array',
      vars: [
        {
          name: 'headerGroup',
          title: 'Header Group (*)',
          indent: 1,
          type: 'string'
        },
        {
          name: 'triggerGroup',
          title: 'Trigger Group(s) (*)',
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

  // Dependency Variables
  var engine = require('engine')
  var backend = require('backend')
  var event = require('event')

  // Loading Event
  event.on('load', function () {

    // Dependencies
    var oklib = require('OKlib.js')

    // Error Check
    if (!oklib) {
      engine.log('[RLNT] AHG > OKlib wasn\'t found!')
      engine.log('[RLNT] AHG > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] AHG > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
      return
    }

    // Execute Main Function
    RLNT_AHG(oklib)
  })

  // Main Function
  function RLNT_AHG (oklib) {

    // Loaded Log
    engine.log('[RLNT] AHG > The script loaded successfully!')

    // Global Variables
    var groups = config.groupArray
    var loggingEnabled = config.loggingEnabled === 1

    // Group Adding Event
    event.on('serverGroupAdded', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()

      for (var i in groups) {
        var toCheck = groups[i]
        var headerGroup = toCheck.headerGroup
        var triggerGroup = toCheck.triggerGroup

        if (!Array.isArray(triggerGroup)) {
          triggerGroup = [triggerGroup];
        }
        if (triggerGroup.indexOf(groupID) != -1) {
          if (!oklib.client.isMemberOfGroup(user, headerGroup)) {
            user.addToServerGroup(headerGroup)
            if (loggingEnabled) {
              engine.log('[RLNT] AHG > Client \'' + user.name() + '\' was added to the header group \'' + backend.getServerGroupByID(headerGroup).name() + '\'.')
            }
          }
        }
      }
    })

    // Group Remove Event
    event.on('serverGroupRemoved', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()

      for (var i in groups) {
        var toCheck = groups[i]
        var headerGroup = toCheck.headerGroup
        var triggerGroup = toCheck.triggerGroup

        if (!Array.isArray(triggerGroup)) {
          triggerGroup = [triggerGroup];
        }
        if (triggerGroup.indexOf(groupID) != -1) {
          if (!oklib.client.isMemberOfOne(user, triggerGroup)) {
            if (oklib.client.isMemberOfGroup(user, headerGroup)) {
              user.removeFromServerGroup(headerGroup)
              if (loggingEnabled) {
                engine.log('[RLNT] AHG > Client \'' + user.name() + '\' was removed from the header group \'' + backend.getServerGroupByID(headerGroup).name() + '\'.')
              }
            }
          }
        }
      }
    })
  }
})
