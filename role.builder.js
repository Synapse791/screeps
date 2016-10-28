var repositories = {
  creep: require('repository.creep'),
  energy: require('repository.energy'),
  site: require('repository.site')
};

class BuilderRole {

  constructor(room) {
    this.room = room;

    this.builders = repositories.creep.findMyCreepsInRoomByRole(this.room, 'builder');

    this.storage = repositories.energy.findStoredEnergyInRoom(this.room);

    this.sources = repositories.energy.findNaturalEnergyInRoom(this.room);

    this.sites = repositories.site.findMyPendingSitesInRoom(this.room);
  }

  assign(creep) {
    if (!Game.flags[`Depo${creep.memory.home.name}`]) {
      creep.say('CreateDepo!');
    } else if ( this.sites.length == 0  && Game.flags[`Depo${creep.memory.home.name}`]) {
      creep.moveTo(Game.flags[`Depo${creep.memory.home.name}`]);
      return;
    }

    if (creep.carry.energy == 0) {
      creep.memory.building = false
    } else if (creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true
    }

    if (!creep.memory.building) {
      if (this.storage.length > 0 &&  creep.withdraw(this.storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(this.storage[0]);
      } else if (creep.harvest(this.sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(this.sources[0]);
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
      spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder', home: spawn})
    }
  }
}

module.exports = BuilderRole;
