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
    ],
    [
      fleetGenerator([1,2,2]),
      fleetGenerator([0,1,2,3]),
      fleetGenerator([2,2,2]),
      fleetGenerator([1,1,1,1,0]),
      fleetGenerator([2,3,1]),
      fleetGenerator([2,4,1]),
      fleetGenerator([3]),
      fleetGenerator([3,3]),
      fleetGenerator([1,3,0]),
      fleetGenerator([2,3]),
      fleetGenerator([2,0,1,2]),
    ],
    [
      fleetGenerator([2,2,2]),
      fleetGenerator([0,2,2,2]),
      fleetGenerator([2,4,2]),
      fleetGenerator([4,3]),
      fleetGenerator([4]),
      fleetGenerator([3,2,3]),
      fleetGenerator([2,1,2,1,2]),
      fleetGenerator([3,3]),
      fleetGenerator([0,0,4,0,0]),
    ],
    [
      fleetGenerator([4,4,4]),
      fleetGenerator([3,3,3,2]),
      fleetGenerator([5,4]),
      fleetGenerator([6]),
      fleetGenerator([7,6]),
      fleetGenerator([4,4,4,2]),
      fleetGenerator([4,4,2]),
      fleetGenerator([5,5]),
      fleetGenerator([2,3,4,5]),
      fleetGenerator([1,2,3,4,5]),
      fleetGenerator([1,1,1,2,6]),
      fleetGenerator([5,3,2]),
      fleetGenerator([4,3,2]),
      fleetGenerator([4,2,2]),
      fleetGenerator([5,2]),
      fleetGenerator([4,3,3]),
    ],
    [
      fleetGenerator([6,6]),
      fleetGenerator([7,6]),
      fleetGenerator([7,7,6]),
      fleetGenerator([7]),
      fleetGenerator([7,3,5,7]),
      fleetGenerator([5,4,7,2]),
      fleetGenerator([6,6,6]),
      fleetGenerator([7,5,4,3,2]),
      fleetGenerator([2,2,2,2,2]),
      fleetGenerator([7,7,7]),
      fleetGenerator([6,7,5]),
      fleetGenerator([4,4,4,4,4]),
      fleetGenerator([5,4,3,6]),
      fleetGenerator([3,4,3,4,2]),
      fleetGenerator([7,2,2,7]),
    ]
    
  ]

export default difficultyTiers;