var roles = require('roles');

module.exports.loop = function() {
    utils.assignRoles();
    utils.countCreeps(utils.spawnCreeps);
}

var utils = {
    
    assignRoles: () => {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if (creep.memory.role == 'harvester')
                roles.harvester.assign(creep)
            else if (creep.memory.role == 'upgrader')
                roles.upgrader.assign(creep)
            else if (creep.memory.role == 'builder')
                roles.builder.assign(creep)
        }
    },
    
    countCreeps: (spawn) => {
        
        var counts = {
            builders: 0,
            harvesters: 0,
            upgraders: 0
        };
        
        for (var name in Game.creeps) {
            var creep = Game.creeps[name]
            if (creep.memory.role == 'harvester')
                counts.harvesters++;
            else if (creep.memory.role == 'builder')
                counts.builders++;
            else if (creep.memory.role == 'upgrader')
                counts.upgraders++;
        }
        
        spawn(counts);
        
    },
    
    spawnCreeps: (counts) => {
        
        if (Game.spawns['HQ'].energy > 200) {
            if (counts.harvesters < 1)
                Game.spawns['HQ'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'})
            
            if (counts.upgraders < 1)
                Game.spawns['HQ'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader'})
                
            if (counts.builders < 3)
                Game.spawns['HQ'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'})
        }
        
    }
};
