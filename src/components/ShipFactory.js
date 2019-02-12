import cannonFactory from './CannonFactory';
import nameFactory from './NameFactory';


let generateRandomWithRange = (maximum,minimum) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

const shipFactory = (name,shipClass,config={allowConfig:true}) => {
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

    let statRanges = [
        [
            generateRandomWithRange(30,70),
            generateRandomWithRange(50,100),
            generateRandomWithRange(100,200),
            generateRandomWithRange(150,300),
            generateRandomWithRange(200,320),
            generateRandomWithRange(300,450),
            generateRandomWithRange(400,550),
            generateRandomWithRange(550,650),
        ],
        [
            generateRandomWithRange(50,80),
            generateRandomWithRange(60,100),
            generateRandomWithRange(70,95),
            generateRandomWithRange(50,85),
            generateRandomWithRange(45,80),
            generateRandomWithRange(30,75),
            generateRandomWithRange(20,65),
            generateRandomWithRange(10,55),
        ],
        [
            generateRandomWithRange(10,50),
            generateRandomWithRange(20,70),
            generateRandomWithRange(100,300),
            generateRandomWithRange(150,300),
            generateRandomWithRange(200,450),
            generateRandomWithRange(350,700),
            generateRandomWithRange(500,1500),
            generateRandomWithRange(1000,2000),
        ],
        [
            generateRandomWithRange(1,2),
            generateRandomWithRange(1,2),
            generateRandomWithRange(1,3),
            generateRandomWithRange(1,3),
            generateRandomWithRange(1,4),
            generateRandomWithRange(1,5),
            generateRandomWithRange(1,6),
            generateRandomWithRange(1,8),
        ],
        [2,2,3,3,4,5,6,8],//Cannon Capacity,
        [200,400,1000,2000,5000,10000,25000,50000],//Base Prices
    ]

    let decidedHealth = statRanges[0][shipClass];

    let decidedSpeed = statRanges[1][shipClass];

    let decidedCapacity = Math.round(statRanges[2][shipClass] / 5) * 5;

    let maxCannons = statRanges[4][shipClass];

    let numberOfEquippedCannons = statRanges[3][shipClass];

    let calculatedPrice = statRanges[5][shipClass] + (decidedCapacity + decidedSpeed + (numberOfEquippedCannons * 100));

    let cannons = [];

    for(let i = 0 ; i<numberOfEquippedCannons; i++){
        cannons.push(cannonFactory(0));
    }

    if(config.allowConfig){
        let object = {
            name : name !== undefined?name:nameFactory(),
            shipClass:config.shipClass,
            health:config.health,
            maxHealth:config.maxHealth,
            speed:config.speed,
            maxCannons,
            uniqueId, 
            cannons:config.cannons,
            capacity: config.capacity,
            price:calculatedPrice,
            hull:config.hull,
            sails:config.sails,
            cargoBay:config.cargoBay,
        }
    }

    return {
        name : name !== undefined?name:nameFactory(),
        shipClass: shipClasses[shipClass],
        health:decidedHealth,
        maxHealth:decidedHealth,
        speed:decidedSpeed,
        maxCannons,
        uniqueId, 
        cannons,
        capacity: decidedCapacity,
        price:calculatedPrice,
        hull:0,
        sails:0,
        cargoBay:0,
    }
}

export default shipFactory