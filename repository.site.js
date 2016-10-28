class SiteRepository {
  findMyPendingSitesInRoom(room) {
    return room.find(FIND_MY_CONSTRUCTION_SITES);
  }
}

module.exports = new SiteRepository();
