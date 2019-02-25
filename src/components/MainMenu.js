import React, {Component} from 'react';

class MainMenu extends Component {
    render(){
        return(
            <div className="main-menu">
                <div className="menu-buttonst">
                <h1>PIRATE SEAS</h1>
                    <button onClick={this.props.showCC}>Start New Game</button>
                    <button
                    onClick={()=>{
                        if(this.props.playerData!==undefined){
                            this.props.updateHudState(true);
                            this.props.updateCurrentPort(this.props.currentPort,true);
                            return;
                        }
                        return;
                    }}
                    >Continue Game</button>
                    <button>How to Play</button>
                </div>
            </div>
        )
    }
}

export default MainMenu;