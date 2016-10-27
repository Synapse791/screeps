var RoleManager = require('roleManager');

class SpawnManager {
  constructor(room, requirements) {
      this.room = room;
      this.requirements = requirements;

      this.roleManager = new RoleManager(room);

      this.spawns = this.room.find(FIND_STRUCTURES, {
          filter: (s) => {
              return s.structureType == 'spawn';
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
      } else if (counts.workers < this.requirements.workers) {
        console.log('creating new builder')
        this.roleManager.roles.worker.create(this.spawns[0]);
      }
    }
  }
}

module.exports = SpawnManager;
