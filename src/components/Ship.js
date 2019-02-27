import React , { Component } from 'react';
import upgradeData from './upgradeData';
import HealthBar from './HealthBar';

class Ship extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        let allowClick = this.props.isPlayersTurn;
        let imageid = this.props.data.shipClass.fullHealth;

        let showExtraInfo = this.props.showExtraInfo;

        if(this.props.data.health <= this.props.data.maxHealth * .6){
            imageid = this.props.data.shipClass.sixtyHealth;
        }      
        if(imageid !== this.props.data.shipClass.fullHealth && this.props.data.health <= this.props.data.maxHealth * .35){
            imageid = this.props.data.shipClass.thirtyHealth;
        }
          

        return(
            <div 
            onClick = {
                !allowClick?null:
                ()=>{this.props.handleAttack(this.props.data,true)}
            } 
            className={this.props.data.isActive?"combat-ship active-ship":"combat-ship"}>
                <HealthBar health={this.props.data.health} maxHealth={this.props.data.maxHealth}/>
                <h3>{this.props.data.health}/{this.props.data.maxHealth}</h3>
                <div className={allowClick?"combat-ship-image-container clickable":"combat-ship-image-container"}>
                <img className="ship-image" src={imageid} alt={this.props.data.shipClass.name}></img>
                </div>
                <h3>{this.props.data.name}</h3>
                <h4>{this.props.data.shipClass.name}</h4>
                {
                    showExtraInfo?
                    <div>
                        <h5>{this.props.data.speed} Speed</h5>
                        <h5>{this.props.data.capacity} Cargo Capacity</h5>
                        <h5>{upgradeData[0][this.props.data.hull].name}</h5>
                        <h5>{upgradeData[1][this.props.data.sails].name}</h5>
                        <h5>{upgradeData[2][this.props.data.cargoBay].name}</h5>
                    </div>
                    :null
                }
                <ul className="combat-cannons">
                    {
                        this.props.data.cannons.map((cannon, i)=>{
                            return (<li key={"cannon" + i}>
                                <img alt="cannon" src={cannon.image}></img>
                                {showExtraInfo?<h5>{cannon.damage} DMG</h5>:null}
                                </li>)
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default Ship;