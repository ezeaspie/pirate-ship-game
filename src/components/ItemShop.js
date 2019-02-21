import React, {Component} from 'react';
import items from './itemFactory';

class ItemShop extends Component {

    handleItemPurchase = (item) => {
        let player = this.props.player;

        if(player.money >= item.price){
            player.money -= item.price;
            player.items.forEach((playerItem)=>{
                if(item.id === playerItem.id){
                    playerItem.quantity += 1;
                }
            })
    
            this.props.updatePlayerState(player);
            this.forceUpdate();
        }
    }

    render(){
        return(
            <div className="itemShop">
                <ul>
                    {
                        items.map((item)=>{
                        return(
                        <li className="item" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <button 
                            className="buy-button"
                            onClick={()=>{this.handleItemPurchase(item)}}>{item.price}<img src="./images/gold.gif" alt="gold-coin"/></button>
                        </li>
                        )
                        })
                    }
                </ul>
                    <button 
                className="back"
                onClick={()=>{
                    this.props.changeCurrentView(3);
                    this.props.updateHudState(true,false);
                    }}>
                    <img src="./images/arrowLeft.png" alt="back-arrow"/>
                    Back</button>
            </div>
        )
    }
}

export default ItemShop;