class CreepRepository {
  findMyCreepsInRoomByRole(room, role) {
    return room.find(FIND_MY_CREEPS, {
      filter: (c) => {
        return c.memory.role == role
      }
    });
  }
}

module.exports = new CreepRepository();
