import React, { Component } from 'react';
import Combat from './components/Combat';
import MainMenu from './components/MainMenu';
import shipFactory from './components/ShipFactory';
import Port from './components/Port';
import './App.css';
import CharacterCreation from './components/CharacterCreation';
import portData from './components/portData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: undefined,
      currentPort:0,
      gameScreen:<MainMenu showCC={this.showCharacterCreation} startCombat={this.startCombat}/>,
    }
  }

  createPlayerObject = (name,fleet,money=100) => {
    let player = {name,fleet,money}

    this.setState({player});
  }

  createOpponentObject = (name,fleet) => {
    return {name,fleet}
  }

  showMainMenu = () => {
    this.setState({gameScreen:<MainMenu showCC={this.showCharacterCreation} startCombat={this.startCombat}/>})
  }

  showCharacterCreation = () => {
    this.setState({gameScreen:<CharacterCreation createPlayerObject={this.createPlayerObject } showPort={this.showPort}/>});
  }

  showPort = (portData) => {
  this.setState({gameScreen:<Port port={portData} startCombat={this.startCombat}/>})
  }

  startCombat = (opponent=undefined) => {
    let object = opponent;
    if(opponent===undefined){
      object = this.createOpponentObject("Fatman",[shipFactory("SS Anne",0,100,28,121),shipFactory("Purity",1,200,10,9000)])
    }
    console.log({opponent: object,player:this.state.player});
    
    this.setState({gameScreen:<Combat opponent={object} player={this.state.player}/>})
  }

  render() {
    return (
      <div className="App">
        {this.state.gameScreen}
      </div>
    );
  }
}

export default App;
