import React , {Component} from 'react';
import upgradeData from './upgradeData';

class UpgradeShip extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentData: 0,
        }
    }

    handleDataSwitch = (dataId) => {
        this.setState({currentData:dataId});
    }

    handleUpgradePurchase = (whichUpgrade,upgradeData) => {
        let ship = this.props.ship;
        let player = this.props.player;

        if(player.money >= upgradeData.price){
            player.money -= upgradeData.price;
        }
        player.fleet.forEach((playerShip)=>{
            if(playerShip.uniqueId === ship.uniqueId){
                if(whichUpgrade === 0){
                    playerShip.hull += 1;
                }
                if(whichUpgrade === 1){
                    playerShip.sails += 1;
                }
                if(whichUpgrade === 2){
                    playerShip.cargoBay += 1;
                }
            }
        })

        this.props.updatePlayerState(player);
        this.forceUpdate();
    }

    handleCannonRemoval = (cannon) => {
        let ship = this.props.ship;
        let player = this.props.player;

        player.fleet.forEach((playerShip)=>{
            if(playerShip.uniqueId === ship.uniqueId){
                let index = playerShip.cannons.findIndex((shipCannon)=>{
                    return shipCannon.uniqueId === cannon.uniqueId;
                })
                console.log(index);
                playerShip.cannons.splice(index,1);
            }
        })

        this.props.updatePlayerState(player);
        this.forceUpdate();
    }

    handleCannonPurchase = (cannon) => {
        let ship = this.props.ship;
        let player = this.props.player;
        
        player.fleet.forEach((playerShip)=>{
            if(playerShip.uniqueId === ship.uniqueId){
                playerShip.cannons.push(cannon);
            }
        })

        this.props.updatePlayerState(player);
        this.forceUpdate();
    }

    render(){
        let ship = this.props.ship;

        let currentHull     = upgradeData[0][ship.hull];
        let nextHull        = upgradeData[0][ship.hull + 1];
        let currentSails    = upgradeData[1][ship.sails];
        let nextSails       = upgradeData[1][ship.sails + 1];
        let currentCargo    = upgradeData[2][ship.cargoBay];
        let nextCargo       = upgradeData[2][ship.cargoBay + 1];

        let upgradeRenderData = [
            {
                name:"Hull",
                stat:"Health",
                current: currentHull,
                next: nextHull,
                id:ship.hull,
                upgradeLength: upgradeData[0].length,
            },
            {
                name:"Sail",
                stat:"Speed",
                current: currentSails,
                next: nextSails,
                id:ship.sails,
                upgradeLength: upgradeData[1].length,
            },
            {
                name:"Cargo",
                stat:"Capacity",
                current: currentCargo,
                next: nextCargo,
                id:ship.cargo,
                upgradeLength: upgradeData[2].length,
            },
            {
                name:"Cannon",
                stat:"Damage",
                current: true,
                id:100,
                next:false,
                upgradeLength: 100,
            }
        ]

        let selectedUpgrade = upgradeRenderData[this.state.currentData];

        let updateButton = undefined;
        if(selectedUpgrade.id >= selectedUpgrade.upgradeLength-1){
            updateButton = <div className="next-upgrade"><h4>No Upgrades Avaliable</h4></div>;
        }
        else{
            updateButton = 
            <div className="next-upgrade">
                <h4>Next Upgrade: {selectedUpgrade.next.name}</h4>
                <h5>{` +${selectedUpgrade.next.bonus} ${selectedUpgrade.stat}`}</h5>
                <h5 
                className="purchase-button"
                onClick={()=>{this.handleUpgradePurchase(this.state.currentData,selectedUpgrade)}}
                >{` ${selectedUpgrade.next.price}`}<img src="./images/gold.gif" alt="gold-coin"/></h5>
            </div>
        }

        return(
            <div>
                    <div className="ship-data">
                        <h3>{ship.name}</h3>
                        <h3>{ship.shipClass.name}</h3>
                        <img src={ship.shipClass.fullHealth} alt={ship.shipClass.name}></img>
                        <h5>{ship.speed} Speed</h5>
                        <h5>{ship.capacity} Cargo Capacity</h5>
                    </div>
                    <div className="ship-upgrade">
                        <h3>{selectedUpgrade.name} Upgrades</h3>
                        {
                            this.state.currentData !== 3?
                            <div>
                                <div className="current">
                                    <h4>Current {selectedUpgrade.name} : {selectedUpgrade.current.name}</h4>
                                    <h5>{` +${selectedUpgrade.current.bonus} ${selectedUpgrade.stat}`}</h5>
                                </div>
                                {updateButton}
                            </div>
                            :
                            <div>
                                {
                                    ship.cannons.map((cannon)=>{
                                        return (
                                            <li>
                                                <img src={cannon.image} alt={cannon.name}/>
                                                <h5>{cannon.name}</h5>
                                                <h5>{cannon.damage}</h5>
                                                <h5>{cannon.durability}</h5>
                                                <button onClick={()=>{this.handleCannonRemoval(cannon)}}>Remove</button>
                                            </li>
                                        )
                                    })
                                }
                                {
                                    this.props.generatedCannons.map((cannonForSale)=>{
                                        return(
                                            <button onClick={()=>{this.handleCannonPurchase(cannonForSale)}}>
                                                <img src={cannonForSale.image} alt={cannonForSale.name}/>
                                                <h5>{cannonForSale.name}</h5>
                                                <h5>{cannonForSale.damage} DMG</h5>
                                                <h5>{cannonForSale.durability} DUR</h5>
                                                <h5 
                                                    className="purchase-button"
                                                >{` ${cannonForSale.price}`}<img src="./images/gold.gif" alt="gold-coin"/></h5>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        }
                        <ul className="upgrade-selector">
                            <li><button onClick={()=>{this.handleDataSwitch(0)}}>Hull</button></li>
                            <li><button onClick={()=>{this.handleDataSwitch(1)}}>Sails</button></li>
                            <li><button onClick={()=>{this.handleDataSwitch(2)}}>Cargo</button></li>
                            <li><button onClick={()=>{this.handleDataSwitch(3)}}>Cannons</button></li>

                        </ul>
                    </div>
            </div>
            
        )
    }
}

export default UpgradeShip;