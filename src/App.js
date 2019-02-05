import React, { Component } from 'react';
import Combat from './components/Combat';
import MainMenu from './components/MainMenu';
import shipFactory from './components/ShipFactory';
import Port from './components/Port';
import './App.css';
import CharacterCreation from './components/CharacterCreation';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: undefined,
      currentPort:0,
      gameScreen:<MainMenu 
      showCC={this.showCharacterCreation} 
      startCombat={this.startCombat}
      />,
    }
  }

  componentDidMount(){
    if(localStorage.getItem("player") === null){
      console.log("NO SAVE FOUND");
    }
    else{
      console.log("SAVE FOUND");
      this.loadGame();
    }
    setTimeout(()=>{
      this.setState({gameScreen:
        <MainMenu 
        showCC={this.showCharacterCreation} 
        startCombat={this.startCombat}
        playerData={this.state.player}
        showPort={this.showPort}
        currentPort={this.state.currentPort}
        />
      })
    },50)
  }

  updatePlayerState = (newPlayerObject) => {
    let player = this.state.player;
    try {
      if(newPlayerObject.name === undefined){
        throw new Error("Object must contain a name");
      } 
      if(!Array.isArray(newPlayerObject.fleet)) throw new Error("Fleet property must be an array");
      if(newPlayerObject.fleet === undefined){
        throw new Error("Object must contain a fleet property");
      }
      if(newPlayerObject.fleet.length > 5){
        throw new Error("Player cannot have more than 6 ships in her fleet");
      }
    }
    catch(err) {
      console.log(err);
    }

  }

  loadGame = () => {
    let player = JSON.parse(localStorage.getItem("player"));

    this.setState({player});
  }

  saveGame = () => {
    let player = JSON.stringify(this.state.player);
    localStorage.setItem("player",player);
  }

  createPlayerObject = (name,fleet,money=100) => {
    let player = {name,fleet,money}
    this.setState({player},this.saveGame);
  }

  createOpponentObject = (name,fleet) => {
    return {name,fleet}
  }

  showMainMenu = () => {
    this.setState({gameScreen:<MainMenu 
      showCC={this.showCharacterCreation} 
      startCombat={this.startCombat}
      playerData={this.state.player}
      showPort={this.showPort}
      currentPort={this.state.currentPort}
      />})
  }

  showCharacterCreation = () => {
    this.setState({
      gameScreen:<CharacterCreation 
      createPlayerObject={this.createPlayerObject } 
      showPort={this.showPort}
      />});
  }

  showPort = (portData) => {
  this.setState({gameScreen:<Port 
    port={portData} 
    startCombat={this.startCombat}
    updatePlayerState={this.updatePlayerState}
    player={this.state.player}
    />})
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
