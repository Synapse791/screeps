var RoleManager = require('roleManager');

class SpawnManager {
  constructor(room, config) {
      this.room = room;
      this.requirements = config.requirements;

      this.roleManager = new RoleManager(room);

      this.spawns = this.room.find(FIND_STRUCTURES, {
          filter: (s) => {
              return s.structureType == STRUCTURE_SPAWN && s.energy > config.minEnergy;
          }
      });
  }

  run() {
    if (this.spawns.length > 0) {
      let counts = this.roleManager.getCounts();
      if (counts.miners < this.requirements.miners) {
        console.log(`creating miner ${counts.miners + 1} of ${this.requirements.miners}`)
        this.roleManager.roles.miner.create(this.spawns[0]);
      } else if (counts.workers < this.requirements.workers) {
        console.log(`creating worker ${counts.workers + 1} of ${this.requirements.workers}`)
        this.roleManager.roles.worker.create(this.spawns[0]);
      } else if (counts.builders < this.requirements.builders) {
        console.log(`creating builder ${counts.builders + 1} of ${this.requirements.builders}`)
        this.roleManager.roles.builder.create(this.spawns[0]);
      }
    }
  }
}

module.exports = SpawnManager;
