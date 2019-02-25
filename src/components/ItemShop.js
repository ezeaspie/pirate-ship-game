import React, {Component} from 'react';
import items from './itemFactory';
import InfoComponent from './InfoComponent';

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
            <div>
            <div className="itemShop">
                    {
                        items.map((item)=>{
                        let content = 
                        <div className="item">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <button 
                            className="buy-button"
                            onClick={()=>{this.handleItemPurchase(item)}}>{item.price}<img src="./images/gold.gif" alt="gold-coin"/></button>
                        </div>
                        return(
                            <InfoComponent key={item.id} 
                                content={content}
                                description={item.description}
                            />
                        )
                        })
                    }
            </div>
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