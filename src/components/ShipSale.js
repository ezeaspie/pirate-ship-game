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
            onClick={this.state.unavaliable?null:()=>{this.handlePurchase(ship)}}
            >
                <h2>{ship.price}<img src="./images/gold.gif" alt="gold-coin"/></h2>
                <h3>{ship.name}</h3>
                <h3>{ship.shipClass.name}</h3>
                <img src={ship.shipClass.fullHealth} alt={ship.shipClass.name}></img>
                <h5>{ship.speed} Speed</h5>
                <h5>{ship.capacity} Cargo Capacity</h5>
            </div>
        )
    }
}

export default ShipSale;