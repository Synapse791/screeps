class StructureRepository {
  findAvailableStorageInRoom(room) {
    return room.find(FIND_STRUCTURES, {
      filter: (s) => {
        if (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) {
          let total = 0;
          for (let resource in s.store) {
            total = total + s.store[resource]
          }
          return total < s.storeCapacity;
        } else if (s.structureType == STRUCTURE_SPAWN) {
          return s.energy < s.energyCapacity
        }
      }
    });
  }

  findMySpawnsInRoom(room) {
    return room.find(FIND_MY_STRUCTURES, {
      filter: (s) => {
        return s.structureType == STRUCTURE_SPAWN
      }
    });
  }
}

module.exports = new StructureRepository();
