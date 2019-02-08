import React , {Component} from 'react';
import Good from './Good';
import upgradeData from './upgradeData';

class Marketplace extends Component {
    render(){

        let cargoCapacity = this.props.player.fleet.reduce((acc,ship) => { 
            let cargoBayBonus = upgradeData[2][ship.cargoBay].bonus;
            return acc + (ship.capacity + cargoBayBonus); 
        }, 0); // 7

        let currentCargo = this.props.player.cargo.reduce((acc,cargo)=>{
            return acc + (cargo.quantity * cargo.size);
        },0)

        console.log(currentCargo);

        return(
            <div className="marketplace">
                <h1>Marketplace</h1>
                <ul className="goods-list">
                    {
                        this.props.generatedGoods.map((good,i)=>{
                            return (
                                <Good 
                                key={"good" + i}
                                index={i}
                                updatePlayerState = {this.props.updatePlayerState}
                                cargoCapacity={cargoCapacity}
                                currentCargo={currentCargo}
                                good={good} 
                                player={this.props.player}/>
                            )
                        })
                    }
                </ul>
                <button onClick={()=>{this.props.changeCurrentView(3)}}>Back</button>

            </div>
        )
    }
}

export default Marketplace;