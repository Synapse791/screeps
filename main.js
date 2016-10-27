var config = require('config');
var RoleManager = require('roleManager');
var SpawnManager = require('spawnManager');


module.exports.loop = () => {
  for (var name in Game.rooms) {
    var room = Game.rooms[name]
    var creeps = room.find(FIND_CREEPS)

    var spawnManager = new SpawnManager(room, config.creeps.requirements);
    var roleManager = new RoleManager(room);

    spawnManager.run(room)

    for (var key in creeps) {
      roleManager.process(creeps[key]);
    }

  }
};
