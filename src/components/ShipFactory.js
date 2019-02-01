import cannonFactory from './CannonFactory';
import nameFactory from './NameFactory';

const shipFactory = (name,shipClass,health,speed,capacity) => {
    let uniqueId = Date.now() + Math.random()
    let typeFactory = (name, imageIds) => {
        let fullHealth = `./images/ship (${imageIds[0]}).png`;
        let sixtyHealth = `./images/ship (${imageIds[1]}).png`;
        let thirtyHealth = `./images/ship (${imageIds[2]}).png`;
        return {name,fullHealth,sixtyHealth,thirtyHealth}
    }
    let shipClasses = [
        typeFactory("Rowboat",[100,101,102]),
        typeFactory("Dinghy", [103,104,105]),
        typeFactory("Sloop", [1,7,13]),
        typeFactory("Caravel",[5,11,17]),
        typeFactory("Brigantine",[4,10,16]),
        typeFactory("Frigate",[6,12,18]),
        typeFactory("Galleon",[3,9,15]),
        typeFactory("Man of War",[2,8,14]),
    ]
    return {name : nameFactory(),shipClass: shipClasses[shipClass],health,maxHealth:health,speed, uniqueId, cannons:[cannonFactory(0),cannonFactory(0)], capacity}
}

export default shipFactory