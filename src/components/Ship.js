import React , { Component } from 'react';

class Ship extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div 
            onClick = {()=>{this.props.handleAttack(this.props.data,true)}}
            
            className={this.props.data.isActive?"combat-ship active-ship":"combat-ship"}>
                <h3>{this.props.data.name}</h3>
                <h3>{this.props.data.health}</h3>
            </div>
        )
    }

}

export default Ship;