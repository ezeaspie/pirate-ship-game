import React, {Component} from 'react';
import ShipSale from './ShipSale';

class Shipyard extends Component {

    buyShip = (ship) => {
        let player = this.props.player;
        if(player.money >= ship.price){
            player.money -= ship.price;
            player.fleet.push(ship);
            this.props.updateGeneratedShips(ship);
            this.props.updatePlayerState(player);
            return true;
        }
        else{
            return false;
            //return message that says you dont have enough money.
        }
    }

    render(){
        let generatedShips = this.props.generatedShips;
        return(
            <div className="shipyard">
                <h2>Buy Ships</h2>
                {generatedShips.map((ship)=>{
                    return (
                    <ShipSale 
                    ship={ship} 
                    buyShip={this.buyShip}/>
                    )
                })}
                <button onClick={()=>{this.props.changeCurrentView(false)}}>Back</button>
            </div>
        )
    }
}

export default Shipyard;