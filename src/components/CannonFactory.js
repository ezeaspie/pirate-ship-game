const cannonFactory = (type) => { //type must be an integer
    let cannonTypes = [
        {damage:10, accuracy:90, durability: 90, name:"Light Cannon"}
    ]

    let cannonData = cannonTypes[type];
    return cannonData;
}

export default cannonFactory;