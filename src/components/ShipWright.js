import React, {Component} from 'react';
import UpgradeShip from './UpgradeShip';

class ShipWright extends Component {

    handleUpgrade = (object) => {
        this.props.updatePlayerState(object);
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
                                {ship.health !== ship.maxHealth?
                                    <h2>Repair ship for {ship.maxHealth - ship.health} gold<img src="./images/gold.gif" alt="gold-coin"/></h2>:
                                    null
                                }
                                <UpgradeShip 
                                updatePlayerState={this.handleUpgrade}
                                generatedCannons={this.props.generatedCannons}
                                player={this.props.player}
                                ship={ship}
                                />
                            </div>
                           
                        )
                    })
                }
            <button onClick={()=>{
                this.props.changeCurrentView(false);
                this.props.updateHudState(true,false);
                }}>Back</button>
            </div>
        )
    }
}

export default ShipWright;