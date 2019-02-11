let portFactory = (name,shipClassesSold,cannonsSold,goodsSold,warehouse=false) => {
    return{
        name,
        shipClassesSold,
        cannonsSold,
        goodsSold,
        warehouse,
    }
}

let portData = [
    portFactory("Charlie Coast",[0,0,1,2], [0,1],6),
    portFactory("Whispering Cove",[0,1,2,3],[1,2],8),
    portFactory("Brigantine Bay",[1,2,3,4],[1,2,3],10),
    portFactory("Union Harbor",[2,3,4,5],[1,2,3],11),
    portFactory("Sweetwater Ridge",[3,4,5,6],[2,3,4],11),
    portFactory("Silent Reservoir",[4,5,6,7],[2,3,4],11),
    portFactory("Golden Coast",[0,1,2,3,4,5,6,7],[0,1,2,3,4],11),
]

export default portData;