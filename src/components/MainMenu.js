import React, {Component} from 'react';
import portData from './portData';

class MainMenu extends Component {
    render(){
        return(
            <div className="main-menu">
                <ul className="menu-list">
                    <li onClick={this.props.showCC}>Start New Game</li>
                    <li 
                    onClick={()=>{
                        if(this.props.playerData!==undefined){
                            this.props.updateHudState(true);
                            this.props.showPort(portData[this.props.currentPort]);
                            return;
                        }
                        return;
                    }}
                    >Continue Game</li>
                    <li>How to Play</li>
                </ul>
            </div>
        )
    }
}

export default MainMenu;