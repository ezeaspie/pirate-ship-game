let itemFactory = (id,name,description,price,unit,affectsAll,healsOrDamages,image) => {
    return {id,name,description,price,unit,affectsAll,healsOrDamages,image:`./images/${image}.png`}
}

let items = 
[
    itemFactory(0,"Repair Potion",
    "Patch up holes quickly and cheaply! Not recommended for major damage like cannonballs. +30 Health",
    100,30,false,true,"pt1"),
    itemFactory(1,"BIG Repair Potion",
    "The recommended way to keep a damaged ship afloat! +100 HP",
    500,100,false,true,"pt2"),
    itemFactory(2,"Fleet Repair Spell", 
    "A magical potion that slighty repairs all the ships in your fleet. +20 HP ALL",
    500,20,true,true,"pt5"),
    itemFactory(3,"Fleet Repair X-TREME",
    "Need to fix a fleet fast? Use this potion and watch the holes patch themselves! +50 HP ALL",
    2000,50,true,true,"pt6"),
    itemFactory(4,"Homing CannonBall",
    "An enchanted cannonball that always finds it's target. 50 DAM",
    50,50,false,false,'pt8'),
    itemFactory(5,"Lightning Spell",
    "Drop a bolt of lightining on any opponent of your choice! 200 DAM",
    750,200,false,false,"pt4"),
    itemFactory(6,"Wicked Storm Spell",
    "A storm in a bottle, guaranteed to damage all of your opponent's ships. 30 DAM ALL", 
    500,30,true,false,"pt3"),
    itemFactory(7,"Kraken's Curse",
    "From beneath the waves, send a wave of evil from the mythical creature itself! None of your opponent's ships can withstand it! 100 DAM ALL", 
    5000,100,true,false,"pt7"),
]

export default items;
