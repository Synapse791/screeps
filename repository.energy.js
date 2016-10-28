class EnergyRepository {
  findNaturalEnergyInRoom(room) {
    return room.find(FIND_SOURCES, {
      filter: (s) => {
        return s.energy > 0
      }
    });
  }

  findStoredEnergyInRoom(room) {
    return room.find(FIND_STRUCTURES, {
      filter: (s) => {
        if (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) {
          return s.store.energy > 0;
        } else if (s.structureType == STRUCTURE_SPAWN) {
          return s.energy == s.energyCapacity
        }
      }
    });
  }
}

module.exports = new EnergyRepository();
