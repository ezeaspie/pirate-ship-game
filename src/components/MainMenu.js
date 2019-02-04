import React, {Component} from 'react';

class MainMenu extends Component {
    render(){
        return(
            <div className="main-menu">
                <ul className="menu-list">
                    <li onClick={this.props.showCC}>Start New Game</li>
                    <li onClick={this.props.startCombat}>Continue Game</li>
                    <li>How to Play</li>
                </ul>
            </div>
        )
    }
}

export default MainMenu;