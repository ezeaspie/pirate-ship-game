import difficultyTiers from './difficultyTiers';

let portFactory = (name,shipClassesSold,cannonsSold,goodsSold,armada={enabled:false}) => {
    return{
        name,
        shipClassesSold,
        cannonsSold,
        goodsSold,
        armada,
    }
}

let armadaFactory = (armadaDifficultyArray) => {

    let armada = [];

    armadaDifficultyArray.forEach((difficultyId)=>{
        let fleet = difficultyTiers[difficultyId][Math.floor(Math.random() * difficultyTiers[difficultyId].length)];
        armada.push(fleet);
    })
    console.log(armada);

    return {enabled:true,armada}
}


let portData = [
    portFactory("Charlie Coast",[0,0,1,2], [0,1],6, armadaFactory([0,0])),
    portFactory("Whispering Cove",[0,1,2,3],[1,2],8),
    portFactory("Brigantine Bay",[1,2,3,4],[1,2,3],10),
    portFactory("Union Harbor",[2,3,4,5],[1,2,3],11),
    portFactory("Sweetwater Ridge",[3,4,5,6],[2,3,4],11),
    portFactory("Silent Reservoir",[4,5,6,7],[2,3,4],11),
    portFactory("Golden Coast",[0,1,2,3,4,5,6,7],[0,1,2,3,4],11),
]

export default portData;