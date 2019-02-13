import shipFactory from './ShipFactory';

let fleetGenerator = (shipTypeArray)=> {
    let fleet = [];
    shipTypeArray.forEach((ship)=>{
      fleet.push(shipFactory(undefined,ship))
    })
    return fleet;
  }

const difficultyTiers = [
    [
      fleetGenerator([0,0]),
      [shipFactory("Lincoln Loud",0)],
      [shipFactory(undefined,1)],
      fleetGenerator([0,1]),
      fleetGenerator([1,1,0]),
      fleetGenerator([2]),
      fleetGenerator([0,0,0]),
    ],
  ]

export default difficultyTiers;