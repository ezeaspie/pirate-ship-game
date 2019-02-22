import React , {Component} from 'react';
import Good from './Good';
import upgradeData from './upgradeData';

class Marketplace extends Component {
    render(){

        let cargoCapacity = this.props.player.fleet.reduce((acc,ship) => { 
            return acc + (ship.capacity); 
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
                <button 
                className="back"
                onClick={()=>{
                    this.props.changeCurrentView(3)
                    this.props.updateHudState(true,false);
                    }}>
                    <img src="./images/arrowLeft.png" alt="back-arrow"/>
                    Back</button>

            </div>
        )
    }
}

export default Marketplace;