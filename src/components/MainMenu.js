import React, {Component} from 'react';

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
                            this.props.updateCurrentPort(this.props.currentPort);
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