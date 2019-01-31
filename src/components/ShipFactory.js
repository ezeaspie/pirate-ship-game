import cannonFactory from './CannonFactory';

const shipFactory = (name,shipClass,health,speed,capacity) => {
    let uniqueId = Date.now() + Math.random()
    return {name,shipClass,health,speed, uniqueId, cannons:[cannonFactory(0)], capacity}
}

export default shipFactory