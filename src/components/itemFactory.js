let itemFactory = (id,name,description,price,unit,affectsAll,healsOrDamages) => {
    return {id,name,description,price,unit,affectsAll,healsOrDamages}
}

let items = 
[
    itemFactory(0,"Waterproof Tape",
    "Patch up holes quickly and cheaply! Not recommended for major damage like cannonballs. +30 Health",
    100,30,false,true),
    itemFactory(1,"Ship Repair Kit",
    "The recommended way to keep a damaged ship afloat! +100 HP",
    500,100,false,true),
    itemFactory(2,"Fleet Repair", 
    "A magical potion that slighty repairs all the ships in your fleet. +20 HP ALL",
    500,20,true,true),
    itemFactory(3,"Fleet Repair MAX",
    "Need to fix a fleet fast? Use this potion and watch the holes patch themselves! +50 HP ALL",
    2000,50,true,true),
    itemFactory(4,"Homing CannonBall",
    "An enchanted cannonball that always finds it's target. 50 DAM",
    50,50,false,false),
    itemFactory(5,"Torpedo",
    "High tech explosive that locks onto a ship for catastrophic damage! 200 DAM",
    750,200,false,false),
    itemFactory(6,"Wicked Storm",
    "A storm in a bottle, guaranteed to damage all of your opponent's ships. 30 DAM ALL", 
    500,30,true,false),
    itemFactory(7,"Kraken's Curse",
    "From beneath the waves, send a wave of evil from the mythical creature itself! None of your opponent's ships can withstand it! 100 DAM ALL", 
    5000,100,true,false),
]

export default items;
