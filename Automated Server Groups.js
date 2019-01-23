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
  version: '1.0.0',
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
      engine.log('[RLNT] ASG > OKlib wasn\'t found!')
      engine.log('[RLNT] ASG > Install the OKlib or the script is disabled!')
      engine.log('[RLNT] ASG > OKlib can be downloaded here: https://forum.sinusbot.com/resources/oklib.325/')
      return
    }

    // Execute Main Function
    RLNT_ASG(oklib)
  })

  // Main Function
  function RLNT_ASG (oklib) {

    // Loaded Log
    engine.log('[RLNT] ASG > The script loaded successfully!')

    // Global Variables
    var groupAddArray = config.groupAddArray
    var groupRemoveArray = config.groupRemoveArray
    var loggingEnabled = config.loggingEnabled
    var debugEnabled = config.debugEnabled

    // Group Adding Event
    event.on('serverGroupAdded', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()

      // Add on Add
      for (var i in groupAddArray) {
        var toCheckAdd = groupAddArray[i]
        var mainGroupAdd = toCheckAdd.groupToAdd
        var triggerGroupAdd

        if (toCheckAdd.onWhatAdd == 0) {
          if (toCheckAdd.addOnAddCondition == 0) {
            triggerGroupAdd = toCheckAdd.addOnAddGroupsAll
            if (triggerGroupAdd.indexOf(groupID) != -1) {
              if (oklib.client.isMemberOfAll(user, triggerGroupAdd)) {
                if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                  user.addToServerGroup(mainGroupAdd)
                  if (loggingEnabled) {
                    engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                  }
                }
              }
            }
          } else if (toCheckAdd.addOnAddCondition == 1) {
            triggerGroupAdd = toCheckAdd.addOnAddGroupsOne
            if (triggerGroupAdd.indexOf(groupID) != -1) {
              if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                user.addToServerGroup(mainGroupAdd)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                }
              }
            }
          } else if (toCheckAdd.addOnAddCondition == 2) {
            triggerGroupAdd = toCheckAdd.addOnAddGroupsSingle
            if (groupID === triggerGroupAdd) {
              if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                user.addToServerGroup(mainGroupAdd)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                }
              }
            }
          }
        }
      }

      // Remove on Add
      for (var j in groupRemoveArray) {
        var toCheckRemove = groupRemoveArray[j]
        var mainGroupRemove = toCheckRemove.groupToRemove
        var triggerGroupRemove

        if (toCheckRemove.onWhatRemove == 0) {
          if (toCheckRemove.removeOnAddCondition == 0) {
            triggerGroupRemove = toCheckRemove.removeOnAddGroupsAll
            if (triggerGroupRemove.indexOf(groupID) != -1) {
              if (oklib.client.isMemberOfAll(user, triggerGroupRemove)) {
                if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                  user.removeFromServerGroup(mainGroupRemove)
                  if (loggingEnabled) {
                    engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                  }
                }
              }
            }
          } else if (toCheckRemove.removeOnAddCondition == 1) {
            triggerGroupRemove = toCheckRemove.removeOnAddGroupsOne
            if (triggerGroupRemove.indexOf(groupID) != -1) {
              if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                user.removeFromServerGroup(mainGroupRemove)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                }
              }
            }
          } else if (toCheckRemove.removeOnAddCondition == 2) {
            triggerGroupRemove = toCheckRemove.removeOnAddGroupsSingle
            if (groupID === triggerGroupRemove) {
              if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                user.removeFromServerGroup(mainGroupRemove)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                }
              }
            }
          }
        }
      }
    })

    // Group Removing Event
    event.on('serverGroupRemoved', function (RLNT) {
      var user = RLNT.client
      var groupID = RLNT.serverGroup.id()

      // Add on Remove
      for (var i in groupAddArray) {
        var toCheckAdd = groupAddArray[i]
        var mainGroupAdd = toCheckAdd.groupToAdd
        var triggerGroupAdd

        if (toCheckAdd.onWhatAdd == 1) {
          if (toCheckAdd.addOnRemoveCondition == 0) {
            triggerGroupAdd = toCheckAdd.addOnRemoveGroupsAll
            if (triggerGroupAdd.indexOf(groupID) != -1) {
              if (!oklib.client.isMemberOfOne(user, triggerGroupAdd)) {
                if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                  user.addToServerGroup(mainGroupAdd)
                  if (loggingEnabled) {
                    engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                  }
                }
              }
            }
          } else if (toCheckAdd.addOnRemoveCondition == 1) {
            triggerGroupAdd = toCheckAdd.addOnRemoveGroupsOne
            if (triggerGroupAdd.indexOf(groupID) != -1) {
              if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                user.addToServerGroup(mainGroupAdd)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                }
              }
            }
          } else if (toCheckAdd.addOnRemoveCondition == 2) {
            triggerGroupAdd = toCheckAdd.addOnRemoveGroupsSingle
            if (groupID === triggerGroupAdd) {
              if (!oklib.client.isMemberOfGroup(user, mainGroupAdd)) {
                user.addToServerGroup(mainGroupAdd)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was added to the group \'' + backend.getServerGroupByID(mainGroupAdd).name() + '\'.')
                }
              }
            }
          }
        }
      }

      // Remove on Remove
      for (var j in groupRemoveArray) {
        var toCheckRemove = groupRemoveArray[j]
        var mainGroupRemove = toCheckRemove.groupToRemove
        var triggerGroupRemove

        if (toCheckRemove.onWhatRemove == 1) {
          if (toCheckRemove.removeOnRemoveCondition == 0) {
            triggerGroupRemove = toCheckRemove.removeOnRemoveGroupsAll
            if (triggerGroupRemove.indexOf(groupID) != -1) {
              if (!oklib.client.isMemberOfOne(user, triggerGroupRemove)) {
                if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                  user.removeFromServerGroup(mainGroupRemove)
                  if (loggingEnabled) {
                    engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                  }
                }
              }
            }
          } else if (toCheckRemove.removeOnRemoveCondition == 1) {
            triggerGroupRemove = toCheckRemove.removeOnRemoveGroupsOne
            if (triggerGroupRemove.indexOf(groupID) != -1) {
              if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                user.removeFromServerGroup(mainGroupRemove)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                }
              }
            }
          } else if (toCheckRemove.removeOnRemoveCondition == 2) {
            triggerGroupRemove = toCheckRemove.removeOnRemoveGroupsSingle
            if (groupID === triggerGroupRemove) {
              if (oklib.client.isMemberOfGroup(user, mainGroupRemove)) {
                user.removeFromServerGroup(mainGroupRemove)
                if (loggingEnabled) {
                  engine.log('[RLNT] ASG > Client \'' + user.name() + '\' was removed from the group \'' + backend.getServerGroupByID(mainGroupRemove).name() + '\'.')
                }
              }
            }
          }
        }
      }
    })
  }
})
