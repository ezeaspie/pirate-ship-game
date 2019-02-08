import React, { Component } from 'react';
import Ship from './Ship';

class Overlay extends Component {
    render(){

        let overlayClass= this.props.status===0?"":"overlay-shown"
        let views = [
            null,
            <div className = "main-fleet main">
                {
                    this.props.player.fleet.map((ship)=>{
                        return (
                            <Ship 
                            isPlayersTurn={false}
                            data={ship}
                            showExtraInfo={true}

                            />
                        )
                    })
                }
            </div>,
            <ul className="goods-list main">
            {
                this.props.player.cargo.map((good)=>{
                    return(
                        <li className="good">
                            <img src={good.image} alt={good.name}/>
                            <div>
                                <h3>{good.name}</h3>
                                <h4>{good.quantity} Unit{good.quantity===1?"":"s"}</h4>
                                <h4>Size Per Unit : {good.size}</h4>
                                <h4>Total Size : {good.quantity * good.size}</h4>
                                <h5>Contraband Chance : {good.contrabandChance}</h5>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        ]

        let selectedView = views[this.props.status]
        return(
            <div 
            onClick={()=>{this.props.updateOverlayState(0)}}
            className={"overlay " + overlayClass}>
            {selectedView}
            </div>


                
        )
    }
}

export default Overlay;