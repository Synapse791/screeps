class WorkerRole {

  constructor(room) {
    this.room = room;

    this.workers = this.room.find(FIND_CREEPS, {
      filter: (c) => {
        return c.memory && c.memory.role == 'worker'
      }
    });

    this.storage = this.room.find(FIND_STRUCTURES, {
      filter: (s) => {
        // TODO check if there are any extensions and use spawn if not
        // Some for of lock would be useful
        return s.structureType == STRUCTURE_EXTENSION && s.energy > 0
      }
    });
  }

  assign(creep) {
    if (creep.carry.energy == 0) {
      if (creep.withdraw(this.storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(this.storage[0]);
      }
    } else if (creep.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(this.room.controller)
    }
  }

  count() {
    return this.workers.length;
  }

  create(spawn) {
    if (spawn.energy > 250) {
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'worker'})
    }
  }
}

module.exports = WorkerRole;
