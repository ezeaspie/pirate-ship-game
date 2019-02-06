let portFactory = (name,shipClassesSold, cannonsSold,warehouse=false) => {
    return{
        name,
        shipClassesSold,
        cannonsSold,
        warehouse,
    }
}

let portData = [
    portFactory("Charlie Coast",[0,0,1,2], [0,1])
]

export default portData;