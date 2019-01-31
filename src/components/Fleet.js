import React , { Component } from 'react';
import Ship from './Ship';

class Fleet extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div className="fleet">
                    {this.props.fleet.map((ship)=>{
                        return <Ship 
                        handleAttack={this.props.handleAttack} 
                        data={ship}
                        isPlayersTurn={this.props.isPlayersTurn}/>
                    })}
                </div>
        )
    }

}

export default Fleet;