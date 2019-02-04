let portFactory = (name,shipClassesSold,warehouse=false) => {
    return{
        name,
        shipClassesSold,
        warehouse,
    }
}

let portData = [
    portFactory("Charlie Coast",[0,0,1,2])
]

export default portData;