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

    handleUpgradePurchase = (whichUpgrade) => {
        let ship = this.props.ship;
        let player = this.props.player;

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
                name:"Sails",
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
            }
        ]

        let selectedUpgrade = upgradeRenderData[this.state.currentData];

        let updateButton = undefined;
        console.log(selectedUpgrade.id, selectedUpgrade.upgradeLength);
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
                onClick={()=>{this.handleUpgradePurchase(this.state.currentData)}}
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
                    <h3>Hull Upgrades</h3>
                    <div>
                        <div className="current">
                            <h4>Current {selectedUpgrade.name} : {selectedUpgrade.current.name}</h4>
                            <h5>{` +${selectedUpgrade.current.bonus} ${selectedUpgrade.stat}`}</h5>
                        </div>
                        {updateButton}
                    </div>
                    <ul className="upgrade-selector">
                        <li><button onClick={()=>{this.handleDataSwitch(0)}}>Hull</button></li>
                        <li><button onClick={()=>{this.handleDataSwitch(1)}}>Sails</button></li>
                        <li><button onClick={()=>{this.handleDataSwitch(2)}}>Cargo</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UpgradeShip;