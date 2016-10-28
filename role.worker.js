var repositories = {
  creep: require('repository.creep'),
  energy: require('repository.energy')
};

class WorkerRole {

  constructor(room) {
    this.room = room;

    this.workers = repositories.creep.findMyCreepsInRoomByRole(this.room, 'worker');

    this.storage = repositories.energy.findStoredEnergyInRoom(this.room);
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
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'worker', home: spawn})
    }
  }
}

module.exports = WorkerRole;
