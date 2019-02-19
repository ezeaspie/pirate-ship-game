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
    [
      fleetGenerator([0,0,0,0]),
      fleetGenerator([0,1]),
      fleetGenerator([1,2]),
      fleetGenerator([0,2]),
      fleetGenerator([2,1]),
      fleetGenerator([2,2]),
      fleetGenerator([0,1,2]),
      fleetGenerator([1,1,1]),
      fleetGenerator([0,2,0]),
      fleetGenerator([2]),
    ]
  ]

export default difficultyTiers;