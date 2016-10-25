module.exports = {
    assign: (creep) => {
        if (!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
            var fullExtensions = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_EXTENSION && s.energy == s.energyCapacity)
                }
            })
            if (creep.carry.energy == 0 && fullExtensions.length > 0) {
                if (creep.withdraw(fullExtensions[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE)
                    creep.moveTo(fullExtensions[0])
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                    creep.moveTo(sources[0])
            }
        } else if (creep.memory.building || creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = creep.carry.energy != 0
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return structure.progress < structure.progressTotal
                }
            })
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(targets[0])
        } 
    }
};
