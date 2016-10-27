var MinerRole = require('role.miner');
var WorkerRole = require('role.worker');
var BuilderRole = require('role.builder');

class RoleManager {
  constructor(room) {
    this.room = room;

    this.roles = {
      miner: new MinerRole(this.room),
      worker: new WorkerRole(this.room),
      builder: new BuilderRole(this.room)
    };
  }

  process(creep) {
    if (creep.memory && creep.memory.role == 'miner')
      this.roles.miner.assign(creep)
    if (creep.memory && creep.memory.role == 'worker')
      this.roles.worker.assign(creep)
    if (creep.memory && creep.memory.role == 'builder')
      this.roles.builder.assign(creep)
  }

  getCounts() {
    return {
      miners: this.roles.miner.count(),
      workers: this.roles.worker.count(),
      builders: this.roles.builder.count()
    }
  }
}

module.exports = RoleManager;
