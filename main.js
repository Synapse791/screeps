var config = require('config');
var RoleManager = require('roleManager');
var SpawnManager = require('spawnManager');

module.exports.loop = () => {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  let myRoom = [];
  for (var name in Game.rooms) {
    if (Game.rooms[name].controller.my) {
      myRoom.push(Game.rooms[name])
    }
  }

  for (var name in Game.rooms) {
    var room = Game.rooms[name]
    var creeps = room.find(FIND_CREEPS)

    var spawnManager = new SpawnManager(room, config.spawnManager);
    var roleManager = new RoleManager(room);

    spawnManager.run(room)

    for (var key in creeps) {
      roleManager.process(creeps[key]);
    }
  }
};
