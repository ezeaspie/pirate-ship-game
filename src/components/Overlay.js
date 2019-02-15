import React, { Component } from 'react';
import Ship from './Ship';
import portData from './portData';

class Overlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShipMoving:false,
            isShipAttacked:false,
        }
    }
    handleMapTravel = (portId) => {
        console.log(portData[portId].name);
        let randomNum = Math.floor(Math.random() * 100); 
        let encounteredFight = false;
        //Chance of Combat
        if(75 <= randomNum){
            encounteredFight = true;
            this.setState({isShipAttacked:true});
        }
        else{
            this.setState({isShipMoving:true});
            this.props.updateCurrentPort(portId);
        }
        setTimeout(() => {
            if(encounteredFight){
                let opponent = this.props.createOpponent("Steven Universe",portId);
                this.props.startCombat(opponent,this.props.currentPort,portId);
            }
            this.props.updateOverlayState(0);
            this.setState({isShipMoving:false,isShipAttacked:false});
        }, 2200);
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

                        let isAvaliable = unlocked;

                        if(this.state.isShipAttacked || this.state.isShipMoving){
                            isAvaliable = false;
                        }

                        return (
                            <li
                            key={port.name}
                            className={isAvaliable?"avaliable":"unavaliable"}
                            onClick={isAvaliable?()=>{
                                this.handleMapTravel(i);
                            }:()=>{return false}}
                            >
                                <img className="port-image-map" src={port.image} alt={port.name}></img>
                                <h3>{port.name}</h3>
                            </li>
                        )
                    })
                }
            </ul>
        ]

        let selectedView = views[this.props.status]
        let id = "";
        if(this.state.isShipAttacked){
            id="attacked"
        }
        if(this.state.isShipMoving){
            id="moving-to-port"
        }

        return(
            <div 
            className={"overlay " + overlayClass}>
            {selectedView}
            {this.props.status===3?<div className="ship-map-container">
            <img 
            id={id}
            className="map-ship"
            src={this.props.player.fleet[0].shipClass.fullHealth} alt="ship-map-icon"></img>
            <img  id={this.state.isShipAttacked?"skull-shown":""}className="map-skull" src="./images/skull.png" alt="skull" />
            </div>:null}
            <button
                className="back"
                onClick={()=>{this.props.updateOverlayState(0)}}
                disabled={this.state.isShipMoving}
            >
            <img src="./images/arrowLeft.png" alt="back-arrow"/>Back</button>
            </div>


                
        )
    }
}

export default Overlay;