const cannonFactory = (type) => { //type must be an integer
    let cannonTypes = [
        {damage:10, price: 100, accuracy:90, durability: 90, name:"Light Cannon", image:`./images/cannon0.png`},
        {damage:20, price: 200, accuracy:80, durability:85, name:"Heavy Cannon", image:`./images/cannon0.png`},
        {damage:35, price: 500, accuracy:80, durability:65, name:"Glass Cannon", image:`./images/cannon0.png`},
        {damage:25, price: 1000, accuracy:85, durability:90, name:"Naval Cannon", image:`./images/cannon0.png`},
        {damage:35, price: 2500, accuracy:90, durability:95, name:"Admiral Cannon", image:`./images/cannon0.png`},


    ]

    let cannonData = cannonTypes[type];

    cannonData.uniqueId = Date.now() + Math.random();

    return cannonData;
}

export default cannonFactory;