import React, {Component} from 'react';

class MainMenu extends Component {
    render(){
        return(
            <div className="main-menu">
                <img className="to-left" src={`./images/ship (10).png`} alt={"ship"}/>
                <div className="main-menu-main">
                    <img src="./images/Sweetwater Ridge.png" alt="sweetWater" />
                    <div className="menu-buttonst">
                    <h1>PIRATE SEAS</h1>
                        <button onClick={this.props.showCC}>Start New Game</button>
                        <button
                        disabled={!this.props.hasSave}
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
                    <img src="./images/Silent Reservoir.png" alt="silentReservoir" />
                </div>
                <img className="to-right" src={`./images/ship (3).png`} alt={"ship"}/>
            </div>
        )
    }
}

export default MainMenu;