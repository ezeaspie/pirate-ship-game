import React, {Component} from 'react';
import items from './itemFactory';

class ItemShop extends Component {

    render(){
        return(
            <div className="itemShop">
                <ul>
                    {
                        items.map((item)=>{
                        return(
                        <li>
                            <h3>{item.name}</h3>
                            <button className="buy-button">{item.price}</button>
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