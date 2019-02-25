const goodsFactory = (name,basePrice,size,volatility,contrabandChance,image=undefined) => {
    return{
        name,
        basePrice,
        size, //Cargo space taken up per unit
        volatility, //Price variablity, up and down
        contrabandChance, //Chance of being seized upon arrival at a port
        image: `./images/${image}.png`,
        currentPrice:undefined,
    }
}

const goods = [
    goodsFactory("Salt",5,5,4,0,'salt'),
    goodsFactory("Fruits",5,5,8,0,'fruits'),
    goodsFactory("Lumber",10,10,9,0,'wood'),
    goodsFactory("Tea",15,5,5,0,'tea'),
    goodsFactory("Cloth",20,5,15,0,'cloth'),
    goodsFactory("Wine",50,10,10,5,'wine'),
    goodsFactory("Iron",100,20,5,0,'iron'),
    goodsFactory("Medicine",200,10,100,15,'medicine'),
    goodsFactory("Oil",500,20,400,20,'oil'),
    goodsFactory("Gold",800,10,400,25,'gold'),
    goodsFactory("Weapons",1000,25,300,45,'weapons'),
    goodsFactory("Exotic Pets",2500,15,2000,75,'snake'),
]

export default goods;