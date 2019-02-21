import difficultyTiers from './difficultyTiers';

let portFactory = (name,shipClassesSold,cannonsSold,goodsSold,armada={enabled:false}) => {
    return{
        name,
        image:`./images/${name}.png`,
        shipClassesSold,
        cannonsSold,
        goodsSold,
        armada,
    }
}

let armadaFactory = (title,armadaDifficultyArray) => {

    let armada = [];

    armadaDifficultyArray.forEach((difficultyId)=>{
        let fleet = difficultyTiers[difficultyId][Math.floor(Math.random() * difficultyTiers[difficultyId].length)];
        armada.push(fleet);
    })
    let numberOfBattles = armada.length;

    return {enabled:true, title, armada,numberOfBattles}
}


let portData = [
    portFactory("Charlie Coast",[0,0,1,2], [0,1],6, armadaFactory("Charlie's Armada",[0,0])),
    portFactory("Whispering Cove",[0,1,2,3],[1,2],8, armadaFactory("Battle of the Channel",[1,1,1,1])),
    portFactory("Brigantine Bay",[1,2,3,4],[1,2,3],10,armadaFactory("Fleet of Fortunes",[2,2,2,2])),
    portFactory("Union Harbor",[2,3,4,5],[1,2,3],11,armadaFactory("Serene Armada",[3,3,3,3,3])),
    portFactory("Sweetwater Ridge",[3,4,5,6],[2,3,4],11,armadaFactory("Battle for the Ridge",[4,4,4,4])),
    portFactory("Silent Reservoir",[4,5,6,7],[2,3,4],11,armadaFactory("Golden Pirates Club",[5,5,5,5,5,5])),
    portFactory("Golden Coast",[0,1,2,3,4,5,6,7],[0,1,2,3,4],11),
]

export default portData;