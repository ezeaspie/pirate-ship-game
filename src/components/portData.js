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
]

export default portData;