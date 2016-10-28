var repositories = {
  creep: require('repository.creep'),
  energy: require('repository.energy'),
  structure: require('repository.structure')
};

class MinerRole {

  constructor(room) {
    this.room = room;

    this.miners = repositories.creep.findMyCreepsInRoomByRole(this.room, 'miner');

    this.sources = repositories.energy.findNaturalEnergyInRoom(this.room);

    this.storage = repositories.structure.findAvailableStorageInRoom(this.room);
  }

  assign(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      if (creep.harvest(this.sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(this.sources[0]);
      }
    } else if (creep.transfer(this.storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(this.storage[0]);
    }
  }

  count() {
    return this.miners.length;
  }

  create(spawn) {
    if (spawn.energy > 250) {
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner', home: spawn})
    }
  }
}

module.exports = MinerRole;
