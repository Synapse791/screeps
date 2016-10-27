var RoleManager = require('roleManager');

class SpawnManager {
  constructor(room, config) {
      this.room = room;
      this.requirements = config.requirements;

      this.roleManager = new RoleManager(room);

      this.spawns = this.room.find(FIND_STRUCTURES, {
          filter: (s) => {
              return s.structureType == 'spawn' && s.enery > config.minEnergy;
          }
      });
  }

  run() {
    if (this.spawns) {
      let counts = this.roleManager.getCounts();
      if (counts.miners < this.requirements.miners) {
        console.log('creating new miner')
        this.roleManager.roles.miner.create(this.spawns[0]);
      } else if (counts.workers < this.requirements.workers) {
        console.log('creating new worker')
        this.roleManager.roles.worker.create(this.spawns[0]);
      } else if (counts.builders < this.requirements.builders) {
        console.log('creating new builder')
        this.roleManager.roles.builder.create(this.spawns[0]);
      }
    }
  }
}

module.exports = SpawnManager;
