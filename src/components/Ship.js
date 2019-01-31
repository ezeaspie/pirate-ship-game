import React , { Component } from 'react';

class Ship extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        let allowClick = this.props.isPlayersTurn;

        return(
            <div 
            onClick = {
                !allowClick?null:
                ()=>{this.props.handleAttack(this.props.data,true)}
            } 
            className={this.props.data.isActive?"combat-ship active-ship":"combat-ship"}>
                <h3>{this.props.data.health}</h3>
                <div className="combat-ship-image-container">
                <img src={this.props.data.shipClass.fullHealth} alt={this.props.data.shipClass.name}></img>
                </div>
                <h3>{this.props.data.name}</h3>
                <h4>{this.props.data.shipClass.name}</h4>
                <ul className="combat-cannons">
                    {
                        this.props.data.cannons.map((cannon)=>{
                            return <li><img alt="cannon" src={cannon.image}></img></li>
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default Ship;