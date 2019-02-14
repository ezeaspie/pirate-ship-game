import React , {Component} from 'react';
import upgradeData from './upgradeData';

class HUD extends Component {

    updatePlayer =() =>{
        let player = this.props.player;

        player.name = "Julie";

        console.log(player);

        this.props.updatePlayerState(player);
    }

    render(){

        let hideProperty = "";

        let cargoCapacity = this.props.player.fleet.reduce((acc,ship) => { 
            let cargoBayBonus = upgradeData[2][ship.cargoBay].bonus;
            return acc + (ship.capacity + cargoBayBonus); 
        }, 0); // 7

        let currentCargo = this.props.player.cargo.reduce((acc,cargo)=>{
            return acc + (cargo.quantity * cargo.size);
        },0)

        if(this.props.showOnlyGoldAndCargo){
            hideProperty = "hidden-hud"
        }

        return(
            <div className="hud">
                <div className="player-map-info">
                    <button 
                    className="map-icon"
                    onClick={()=>{this.props.updateOverlayState(3)}}
                    ><img src="./images/map.png" alt="treasure-map-icon"></img></button>
                </div>
                <div className="player-hud-info">
                    <h2 className={hideProperty}>Captain {this.props.player.name}</h2>
                    <ul 
                    onClick={()=>{this.props.updateOverlayState(1)}}
                    className={`fleet-status ${hideProperty}`}
                    >
                        {
                            this.props.player.fleet.map((ship)=>{
                                let imageid = ship.shipClass.fullHealth;

                                if(ship.health <= ship.maxHealth * .6){
                                    imageid = ship.shipClass.sixtyHealth;
                                }      
                                if(imageid !== ship.shipClass.fullHealth && ship.health <= ship.maxHealth * .35){
                                    imageid = ship.shipClass.thirtyHealth;
                                }
                                return <li key={"player" + ship.uniqueId}><img src={imageid} alt={ship.shipClass.name}></img></li>
                            })
                        }
                    </ul>
                    <div className="gold-status">
                        <p>{this.props.player.money}</p>
                        <img src="./images/gold.gif" alt="gold-coin"/>
                    </div>
                    <div 
                    onClick={()=>{this.props.updateOverlayState(2)}}
                    className="cargo-status">
                        <img src="./images/crate.png" alt="cargo-icon"/>
                        <p>{currentCargo}/{cargoCapacity}</p>
                    </div>
                    <button 
                    className={`save ${hideProperty}`}
                    onClick={this.props.saveGame}><img src="./images/save.png" alt="save-icon"/></button>
                </div>
                
            </div>
        )
    }
}

export default HUD;