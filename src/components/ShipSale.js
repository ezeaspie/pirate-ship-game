import React, {Component} from 'react';

class ShipSale extends Component {
    constructor(props){
        super(props);
        this.state = {
            unavaliable:false,
        }
    }

    componentDidMount(){
        if(this.props.ship.unavaliable){
            this.setState({unavaliable:true});
        }
    }

    handlePurchase = (ship) => {
        let result = this.props.buyShip(ship);

        if(result){
            this.setState({unavaliable:true});
        } 
    }

    render(){
        let ship = this.props.ship;
        return(
            <div 
            className={this.state.unavaliable?"ship-sale unavaliable":"ship-sale"}
            key={ship.uniqueId}
            >
                <h3>{ship.name}</h3>
                <h3>{ship.shipClass.name}</h3>
                <img src={ship.shipClass.fullHealth} alt={ship.shipClass.name}></img>
                <h5>{ship.speed} Speed</h5>
                <h5>{ship.capacity} Cargo Capacity</h5>
                <button 
                onClick={this.state.unavaliable?null:()=>{this.handlePurchase(ship)}}
                className="buy-button">{ship.price}<img src="./images/gold.gif" alt="gold-coin"/></button>
            </div>
        )
    }
}

export default ShipSale;