import React, {Component} from 'react';

class Shipyard extends Component {
    render(){
        let generatedShips = this.props.generatedShips;
        return(
            <div className="shipyard">
                <h2>Buy Ships</h2>
                {generatedShips.map((ship)=>{
                    return (<div className="ship-sale" key={ship.uniqueId}>
                        <h3>{ship.name}</h3>
                        <h3>{ship.shipClass.name}</h3>
                        <img src={ship.shipClass.fullHealth} alt={ship.shipClass.name}></img>
                        <h5>{ship.speed} Speed</h5>
                        <h5>{ship.capacity} Cargo Capacity</h5>
                    </div>
                    )
                })}
                <button onClick={()=>{this.props.changeCurrentView(false)}}>Back</button>
            </div>
        )
    }
}

export default Shipyard;