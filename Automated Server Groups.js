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
  name: 'Automated Server Groups',
  author: 'RLNT <RLNT@damn-community.com>',
  description: 'With this script, the bot will automatically assign or remove groups if the client gets or is removed from a servergroup.',
  version: '1.1.4',
  backends: ['ts3'],
  vars: [
    {
      name: 'required',
      title: 'All fields that are marked with (*) are required!'
    },
    {
      name: 'groupAddArray',
      title: 'Group Section - Adding',
      type: 'array',
      vars: [
        {
          name: 'multipleGroupsToAdd',
          title: 'Should multiple groups be added or just a single one? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Multiple',
            'Single'
          ]
        },
        {
          name: 'groupsToAdd',
          title: 'Groups to add (*)',
          indent: 1,
          type: 'strings',
          conditions: [
            {
              field: 'multipleGroupsToAdd',
              value: 0
            }
          ]
        },
        {
          name: 'groupToAdd',
          title: 'Group to add (*)',
          indent: 1,
          type: 'string',
          conditions: [
            {
              field: 'multipleGroupsToAdd',
              value: 1
            }
          ]
        },
        {
          name: 'onWhatAdd',
          title: 'Should the group(s) be added on adding or removing other groups? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Add',
            'Remove'
          ]
        },
        {
          name: 'addOnAddCondition',
          title: 'Are they all needed to get the new group or just one of them? (*)',
          indent: 2,
          type: 'select',
          options: [
            'All groups are needed',
            'One of them is needed',
            "It's only a single group"
          ],
          conditions: [
            {
              field: 'onWhatAdd',
              value: 0
            }
          ]
        },
        {
          name: 'addOnAddGroupsAll',
          title: 'What groups have to be added to get the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 0
            },
            {
              field: 'addOnAddCondition',
              value: 0
            }
          ]
        },
        {
          name: 'addOnAddGroupsOne',
          title: 'One out of which groups has to be added to get the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 0
            },
            {
              field: 'addOnAddCondition',
              value: 1
            }
          ]
        },
        {
          name: 'addOnAddGroupsSingle',
          title: 'What group has to be added to get the defined group(s)? (*)',
          indent: 3,
          type: 'string',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 0
            },
            {
              field: 'addOnAddCondition',
              value: 2
            }
          ]
        },
        {
          name: 'addOnRemoveCondition',
          title: 'Are they all needed to get the new group(s) or just one of them? (*)',
          indent: 2,
          type: 'select',
          options: [
            'All groups have to be removed',
            'One of them has to be removed',
            "It's only a single group"
          ],
          conditions: [
            {
              field: 'onWhatAdd',
              value: 1
            }
          ]
        },
        {
          name: 'addOnRemoveGroupsAll',
          title: 'What groups have to be removed to get the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 1
            },
            {
              field: 'addOnRemoveCondition',
              value: 0
            }
          ]
        },
        {
          name: 'addOnRemoveGroupsOne',
          title: 'One out of which groups has to be removed to get the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 1
            },
            {
              field: 'addOnRemoveCondition',
              value: 1
            }
          ]
        },
        {
          name: 'addOnRemoveGroupsSingle',
          title: 'What group has to be removed to get the defined group(s)? (*)',
          indent: 3,
          type: 'string',
          conditions: [
            {
              field: 'onWhatAdd',
              value: 1
            },
            {
              field: 'addOnRemoveCondition',
              value: 2
            }
          ]
        }
      ]
    },
    {
      name: 'groupRemoveArray',
      title: 'Group Section - Removing',
      type: 'array',
      vars: [
        {
          name: 'multipleGroupsToRemove',
          title: 'Should multiple groups be removed or just a single one? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Multiple',
            'Single'
          ]
        },
        {
          name: 'groupsToRemove',
          title: 'Groups to remove (*)',
          indent: 1,
          type: 'strings',
          conditions: [
            {
              field: 'multipleGroupsToRemove',
              value: 0
            }
          ]
        },
        {
          name: 'groupToRemove',
          title: 'Group to remove (*)',
          indent: 1,
          type: 'string',
          conditions: [
            {
              field: 'multipleGroupsToRemove',
              value: 1
            }
          ]
        },
        {
          name: 'onWhatRemove',
          title: 'Should the group(s) be removed on adding or removing other groups? (*)',
          indent: 1,
          type: 'select',
          options: [
            'Add',
            'Remove'
          ]
        },
        {
          name: 'removeOnAddCondition',
          title: 'Do they all have to be added to lose the defined group(s) or just one of them? (*)',
          indent: 2,
          type: 'select',
          options: [
            'All groups are needed',
            'One of them is needed',
            "It's only a single group"
          ],
          conditions: [
            {
              field: 'onWhatRemove',
              value: 0
            }
          ]
        },
        {
          name: 'removeOnAddGroupsAll',
          title: 'What groups have to be added to lose the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 0
            },
            {
              field: 'removeOnAddCondition',
              value: 0
            }
          ]
        },
        {
          name: 'removeOnAddGroupsOne',
          title: 'One out of which groups has to be added to lose the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 0
            },
            {
              field: 'removeOnAddCondition',
              value: 1
            }
          ]
        },
        {
          name: 'removeOnAddGroupsSingle',
          title: 'What group has to be added to lose the defined group(s)? (*)',
          indent: 3,
          type: 'string',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 0
            },
            {
              field: 'removeOnAddCondition',
              value: 2
            }
          ]
        },
        {
          name: 'removeOnRemoveCondition',
          title: 'Are they all needed to remove the defined group(s) or just one of them? (*)',
          indent: 2,
          type: 'select',
          options: [
            'All groups have to be removed',
            'One of them has to be removed',
            "It's only a single group"
          ],
          conditions: [
            {
              field: 'onWhatRemove',
              value: 1
            }
          ]
        },
        {
          name: 'removeOnRemoveGroupsAll',
          title: 'What groups have to be removed to lose the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 1
            },
            {
              field: 'removeOnRemoveCondition',
              value: 0
            }
          ]
        },
        {
          name: 'removeOnRemoveGroupsOne',
          title: 'One out of which groups has to be removed to lose the defined group(s)? (*)',
          indent: 3,
          type: 'strings',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 1
            },
            {
              field: 'removeOnRemoveCondition',
              value: 1
            }
          ]
        },
        {
          name: 'removeOnRemoveGroupsSingle',
          title: 'What group has to be removed to lose the defined group(s)? (*)',
          indent: 3,
          type: 'string',
          conditions: [
            {
              field: 'onWhatRemove',
              value: 1
            },
            {
              field: 'removeOnRemoveCondition',
              value: 2
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
      engine.log('[RLNT] ASG > OKlib wasn\'t found!')
      engine.log('[RLNT] ASG > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] ASG > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else if (!oklib.general.checkVersion('1.0.7')) {
      engine.log('[RLNT] ASG > OKlib is outdated!')
      engine.log('[RLNT] ASG > Minimum version of OKlib is 1.0.7!')
      engine.log('[RLNT] ASG > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
    } else {
    /* EXECUTE MAIN FUNCTION */
    RLNT_ASG(oklib)
    }
  })

  /* MAIN FUNCTION */
  function RLNT_ASG (oklib) {

    /* LOADED */
    engine.log('[RLNT] ASG > The script loaded successfully!')

    /* FUNCTIONS */
    function makeArray (input) {
      var output = input
      if (!Array.isArray(output)) {
        output = [output]
      }
      return output
    }

    function getMainGroupAdd (current) {
      var output
      if (current.multipleGroupsToAdd == 0) {
        output = current.groupsToAdd
      } else if (current.multipleGroupsToAdd == 1) {
        output = current.groupToAdd
      }
      output = makeArray(output)
      return output
    }

    function getMainGroupRemove (current) {
      var output
      if (current.multipleGroupsToRemove == 0) {
        output = current.groupsToRemove
      } else if (current.multipleGroupsToRemove == 1) {
        output = current.groupToRemove
      }
      output = makeArray(output)
      return output
    }

    function getMainGroupName (input) {
      var output = '['
      for (var i in input) {
        output += '\'' + backend.getServerGroupByID(input[i]).name() + '\','
      }
      output = output.slice(0, -1) + ']'
      return output
    }

    function logGroupAdd (user, input) {
      if (loggingEnabled) {
        input = getMainGroupName(input)
        engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group(s) \'' + input + '\'.')
      }
    }

    function logGroupRemove (user, input) {
      if (loggingEnabled) {
        input = getMainGroupName(input)
        engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group(s) \'' + input + '\'.')
      }
    }

    /* GLOBAL VARIABLES */
    var groupAddArray = config.groupAddArray
    var groupRemoveArray = config.groupRemoveArray
    var loggingEnabled = config.loggingEnabled == 0

    /* GROUP ADDING EVENT */
    event.on('serverGroupAdded', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()
      var mainGroup, triggerGroup, toCheck

      // Add on Add
      for (var i in groupAddArray) {
        toCheck = groupAddArray[i]
        mainGroup = getMainGroupAdd(toCheck)

        if (toCheck.onWhatAdd == 0) {
          if (toCheck.addOnAddCondition == 0) {
            triggerGroup = makeArray(toCheck.addOnAddGroupsAll)
            if ((triggerGroup.indexOf(groupID) > -1) && (oklib.client.isMemberOfAll(user, triggerGroup))) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          } else if (toCheck.addOnAddCondition == 1) {
            triggerGroup = makeArray(toCheck.addOnAddGroupsOne)
            if (triggerGroup.indexOf(groupID) > -1) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          } else if (toCheck.addOnAddCondition == 2) {
            triggerGroup = toCheck.addOnAddGroupsSingle
            if (groupID === triggerGroup) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          }
        }
      }

      // Remove on Add
      for (var j in groupRemoveArray) {
        toCheck = groupRemoveArray[j]
        mainGroup = getMainGroupRemove(toCheck)

        if (toCheck.onWhatRemove == 0) {
          if (toCheck.removeOnAddCondition == 0) {
            triggerGroup = makeArray(toCheck.removeOnAddGroupsAll)
            if ((triggerGroup.indexOf(groupID) > -1) && (oklib.client.isMemberOfAll(user, triggerGroup))) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          } else if (toCheck.removeOnAddCondition == 1) {
            triggerGroup = makeArray(toCheck.removeOnAddGroupsOne)
            if (triggerGroup.indexOf(groupID) > -1) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          } else if (toCheck.removeOnAddCondition == 2) {
            triggerGroup = toCheck.removeOnAddGroupsSingle
            if (groupID === triggerGroup) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          }
        }
      }
    })

    /* GROUP REMOVING EVENT */
    event.on('serverGroupRemoved', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()
      var mainGroup, triggerGroup, toCheck

      // Add on Remove
      for (var i in groupAddArray) {
        toCheck = groupAddArray[i]
        mainGroup = getMainGroupAdd(toCheck)

        if (toCheck.onWhatAdd == 1) {
          if (toCheck.addOnRemoveCondition == 0) {
            triggerGroup = makeArray(toCheck.addOnRemoveGroupsAll)
            if ((triggerGroup.indexOf(groupID) > -1) && (!oklib.client.isMemberOfOne(user, triggerGroup))) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          } else if (toCheck.addOnRemoveCondition == 1) {
            triggerGroup = makeArray(toCheck.addOnRemoveGroupsOne)
            if (triggerGroup.indexOf(groupID) > -1) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          } else if (toCheck.addOnRemoveCondition == 2) {
            triggerGroup = toCheck.addOnRemoveGroupsSingle
            if (groupID === triggerGroup) {
              if (!oklib.client.isMemberOfAll(user, mainGroup)) {
                oklib.client.addToGroups(user, mainGroup)
                logGroupAdd(user, mainGroup)
              }
            }
          }
        }
      }

      // Remove on Remove
      for (var j in groupRemoveArray) {
        toCheck = groupRemoveArray[j]
        mainGroup = getMainGroupRemove(toCheck)

        if (toCheck.onWhatRemove == 1) {
          if (toCheck.removeOnRemoveCondition == 0) {
            triggerGroup = makeArray(toCheck.removeOnRemoveGroupsAll)
            if ((triggerGroup.indexOf(groupID) > -1) && (!oklib.client.isMemberOfOne(user, triggerGroup))) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          } else if (toCheck.removeOnRemoveCondition == 1) {
            triggerGroup = makeArray(toCheck.removeOnRemoveGroupsOne)
            if (triggerGroup.indexOf(groupID) > -1) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          } else if (toCheck.removeOnRemoveCondition == 2) {
            triggerGroup = toCheck.removeOnRemoveGroupsSingle
            if (groupID === triggerGroup) {
              if (oklib.client.isMemberOfOne(user, mainGroup)) {
                oklib.client.removeFromGroups(user, mainGroup)
                logGroupRemove(user, mainGroup)
              }
            }
          }
        }
      }
    })
  }
})
