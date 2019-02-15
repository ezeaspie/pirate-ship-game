import React, {Component} from 'react';
import UpgradeShip from './UpgradeShip';

class ShipWright extends Component {

    handleUpgrade = (object) => {
        this.props.updatePlayerState(object);
    }

    handleShipRepair = (shipData) =>{
        let player= this.props.player;
        player.fleet.forEach((ship)=>{
            if(shipData.uniqueId === ship.uniqueId){
                player.money -= (ship.maxHealth - ship.health);
                ship.health = ship.maxHealth;
                console.log(player.money);
            }
        })
        this.props.updatePlayerState(player);
    }

    render(){
        let player = this.props.player;
        return(
            <div 
            className={"shipwright"}
            >
                {
                    player.fleet.map((ship)=>{
                        return(
                            <div className="ship" key={ship.uniqueId}>
                                <UpgradeShip 
                                key={ship.uniqueId}
                                updatePlayerState={this.handleUpgrade}
                                generatedCannons={this.props.generatedCannons}
                                player={this.props.player}
                                ship={ship}
                                handleShipRepair={this.handleShipRepair}
                                />
                            </div>
                           
                        )
                    })
                }
            <button 
            className="back"
            onClick={()=>{
                this.props.changeCurrentView(3);
                this.props.updateHudState(true,false);
                }}>
                <img src="./images/arrowLeft.png" alt="back-arrow"/>
                Back</button>
            </div>
        )
    }
}

export default ShipWright;