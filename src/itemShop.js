import React, {Component} from 'react';
import items from './components/itemFactory';

class itemShop extends Component {

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
            </div>
        )
    }
}

export default itemShop;