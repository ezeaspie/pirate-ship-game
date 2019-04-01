import React , { Component } from 'react';
import shipFactory from './ShipFactory';
import nameFactory from './NameFactory';
import Ship from './Ship';

class CharacterCreation extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedShipId:undefined,
            selectedShipData:undefined,
            generatedShips:[shipFactory(nameFactory(),0,100,100),shipFactory(nameFactory(),0,100,100)],
            nameValue:"",
            error:false,
        }
    }

    sendSelectedShip = (e) => {
        e.preventDefault();
        if(this.state.nameValue===""){
            this.setState({error:"Please enter a name"})
            return;
        }
        if(this.state.selectedShipData === undefined){
            this.setState({error:"Please select a ship"})
            return;
        }

        let createPlayerPromise = new Promise((resolve,reject) => {
            resolve(this.props.createPlayerObject(this.state.nameValue,[this.state.selectedShipData]))
        })
        createPlayerPromise.then(()=>{
            this.props.updateCurrentPort(0,true);
            this.props.updateHudState(true);
        })

    }

    handleName = (e) => {
        this.setState({nameValue : e.target.value},()=>{if(this.state.nameValue.length > 0){this.setState({nameError:false})}});
    }

    handleAttack = (shipdata) => {
        let index = this.state.generatedShips.findIndex((ship)=>{
            return ship.uniqueId === shipdata.uniqueId;
        })
        this.setState({selectedShipData:shipdata,selectedShipId:index});
    }

    render(){

        let ships = this.state.generatedShips;
        
        ships.forEach((ship,i)=>{
            if(i === this.state.selectedShipId){
                ship.isActive=true;
                return;
            }
            ship.isActive=false;
            return;
        })

        let styleObject = null;
        if(this.state.nameError){
            styleObject={border:"solid 2px red"}
        }
        return(
            <div className="create-character">
            <form className = "character-form">
                <h1>Create Character and Select a Ship!</h1>
                <div className='create-main'>
                <label>Captain:</label>

                <input type="text" 
                value={this.state.nameValue} 
                style={styleObject}
                onChange={(e) => {this.handleName(e)} } />
                {
                    ships.map((ship,i)=>{
                        return (
                        <Ship 
                        isPlayer={false} 
                        data={ship} 
                        key={i} 
                        isPlayersTurn={true}
                        handleAttack={this.handleAttack}
                        showExtraInfo={true}
                        />
                        )
                    })
                }
                </div>
                {!this.state.error?null:<p className="error">{this.state.error}</p>}
                <button className="main-button" onClick={(e)=>{this.sendSelectedShip(e)}}>Create Character ></button>
            </form>
            </div>
        )
    }
}

export default CharacterCreation;