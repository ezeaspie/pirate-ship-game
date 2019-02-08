import React , {Component} from 'react';

class Good extends Component {

    constructor(props){
        super(props);
        this.state = {
            buyMultiplier:1,
            sellMultiplier:0,
        }
    }

    handlePurchase = (e) =>{
        //Add quantity,
        //Deduct money,
        //run submit time checks to avoid exploits
        e.preventDefault();

        let currentCargo = this.props.player.cargo.reduce((acc,cargo)=>{
            return acc + (cargo.quantity * cargo.size);
        },0)

        let fitsInCargoBay = false;
        if(currentCargo + (this.props.good.size * this.state.buyMultiplier) <= this.props.cargoCapacity){
            fitsInCargoBay = true;
        }
        let canPay = false;
        if(this.props.player.money >= this.state.buyMultiplier * this.props.good.currentPrice){
            canPay = true;
        }
        if(fitsInCargoBay && canPay && this.state.buyMultiplier > 0){
            let player = this.props.player;
            player.money -= (this.state.buyMultiplier * this.props.good.currentPrice);
            let playerQuantity = Number(player.cargo[this.props.index].quantity);
            let boughtQuantity = Number(this.state.buyMultiplier);

            player.cargo[this.props.index].quantity = playerQuantity + boughtQuantity;
            this.props.updatePlayerState(player);
            this.setState({buyMultiplier:0});
        }
    }
    

    handleInputChange = (e,buyOrSell) =>{

        let currentCargo = this.props.player.cargo.reduce((acc,cargo)=>{
            return acc + (cargo.quantity * cargo.size);
        },0)

        let fitsInCargoBay = false;
        if(currentCargo + (this.props.good.size * e.target.value) <= this.props.cargoCapacity){
            fitsInCargoBay = true;
        }
        let canPay = false;
        if(this.props.player.money >= e.target.value * this.props.good.currentPrice){
            canPay = true;
        }

        if(buyOrSell){
            if(fitsInCargoBay && canPay && e.target.value > 0){
                this.setState(buyOrSell?{buyMultiplier:e.target.value}:{sellMultiplier:e.target.value});
            }
        }
        else{
            let ownedAmount = this.props.player.cargo[this.props.index].quantity;

            if(ownedAmount >= e.target.value){
                this.setState(buyOrSell?{buyMultiplier:e.target.value}:{sellMultiplier:e.target.value});
            }
        }
    }

    render(){
        let good = this.props.good;
        let price = good.currentPrice;
        let ownedAmount = this.props.player.cargo[this.props.index].quantity;

        console.log(this.props.currentCargo);

        return(
            <li key={good.name} className="good">
                <h3>{good.name}</h3>
                <div className="good-info">
                    <img src={good.image} alt={good.name}/>
                    <div className="good-options">
                        <h4>Size: {good.size}</h4>
                        <h4>Price: {good.currentPrice}</h4>
                        <form 
                        className="amount buy" 
                        onSubmit={(e)=>{this.handlePurchase(e)}}>
                            <input 
                            type="number" 
                            onChange={(e)=>{this.handleInputChange(e,true)}}
                            value={this.state.buyMultiplier}/>
                            <input type="submit" value={`Purchase for ${this.state.buyMultiplier * price}`}/>
                        </form>
                        <form className="amount sell"  onSubmit={(e)=>this.handlePurchase}>
                            <input 
                            type="number"
                            onChange={(e)=>{this.handleInputChange(e,false)}} 
                            value={this.state.sellMultiplier}/>
                            <input type="submit" value={`Sell for ${this.state.sellMultiplier * price}`}/>
                            <label>You have: {ownedAmount}</label>
                        </form>
                    </div>
                </div>
            </li>

        )
    }
}

export default Good;