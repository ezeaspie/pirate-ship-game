import React, { Component } from 'react';
import Ship from './Ship';
import portData from './portData';

class Overlay extends Component {
    handleMapTravel = (portId) => {
        console.log(portData[portId].name);
        let randomNum = Math.floor(Math.random() * 100); 
        //Chance of Combat
        if(75 <= randomNum){
            console.log("FIGHT");
            this.props.startCombat();
        }
        else{
            this.props.updateCurrentPort(portId);
        }
        this.props.updateOverlayState(0);
    }

    render(){

        let overlayClass= this.props.status===0?"":"overlay-shown"
        let views = [
            null,
            <div className = "main-fleet main">
                {
                    this.props.player.fleet.map((ship)=>{
                        return (
                            <Ship 
                            key={ship.uniqueId}
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
                        <li className="good" key={good.name}>
                            <img src={good.image} alt={good.name}/>
                            <div>
                                <h3>{good.name}</h3>
                                <h4>{good.quantity} Unit{good.quantity===1?"":"s"}</h4>
                                <h4>Unit Size : {good.size}</h4>
                                <h4>Total Size : {good.quantity * good.size}</h4>
                                <h5>Seize Chance : {good.contrabandChance}</h5>
                            </div>
                        </li>
                    )
                })
            }
            </ul>,
            <ul className="map-list main">
                {
                    portData.map((port,i)=>{
                        let unlocked = this.props.player.portStatus[i].unlocked;

                        return (
                            <li
                            key={port.name}
                            className={unlocked?"avaliable":"unavaliable"}
                            onClick={unlocked?()=>{
                                this.handleMapTravel(i);
                            }:()=>{return false}}
                            >
                                <h3>{port.name}</h3>
                            </li>
                        )
                    })
                }
            </ul>
        ]

        let selectedView = views[this.props.status]
        return(
            <div 
            className={"overlay " + overlayClass}>
            {selectedView}
            <button
                className="back"
                onClick={()=>{this.props.updateOverlayState(0)}}
            >
            <img src="./images/arrowLeft.png" alt="back-arrow"/>Back</button>
            </div>


                
        )
    }
}

export default Overlay;