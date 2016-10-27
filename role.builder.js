class BuilderRole {

  constructor(room) {
    this.room = room;

    this.builders = this.room.find(FIND_CREEPS, {
      filter: (c) => {
        return c.memory && c.memory.role == 'builder'
      }
    });

    this.storage = this.room.find(FIND_STRUCTURES, {
      filter: (s) => {
        return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy > 0
      }
    });

    this.sites = this.room.find(FIND_CONSTRUCTION_SITES, {
      filter: (s) => {
        return s.progress < s.progressTotal
      }
    })
  }

  assign(creep) {
    if (creep.carry.energy == 0) {
      if (creep.withdraw(this.storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(this.storage[0]);
      }
    } else if (creep.build(this.sites[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(this.sites[0]);
    }
  }

  count() {
    return this.builders.length;
  }

  create(spawn) {
    if (spawn.energy > 250) {
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'})
    }
  }
}

module.exports = BuilderRole;
