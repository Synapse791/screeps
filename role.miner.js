class MinerRole {

  constructor(room) {
    this.room = room;

    this.miners = this.room.find(FIND_CREEPS, {
      filter: (c) => {
        return c.memory && c.memory.role == 'miner'
      }
    });

    this.sources = this.room.find(FIND_SOURCES, {
      filter: (s) => {
        return s.energy > 0
      }
    });

    this.storage = this.room.find(FIND_STRUCTURES, {
      filter: (s) => {
        return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity
      }
    });
  }

  assign(creep) {
    if (creep.carry.energy < creep.carryCapacity)
      if (creep.harvest(this.sources[0]) == ERR_NOT_IN_RANGE)
        creep.moveTo(this.sources[0]);
    else if (creep.transfer(this.storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(this.storage[0])
  }

  count() {
    return this.miners.length;
  }

  create(spawn) {
    if (spawn.energy > 250) {
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner'})
    }
  }
}

module.exports = MinerRole;
