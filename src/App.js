import React, { Component } from 'react';
import Combat from './components/Combat';
import MainMenu from './components/MainMenu';
import shipFactory from './components/ShipFactory';
import Port from './components/Port';
import './App.css';
import CharacterCreation from './components/CharacterCreation';
import HUD from './components/HUD';
import goods from './components/goodsData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: undefined,
      currentPort:0,
      hudProps:{show:false,showOnlyGold:false},
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
        updateHudState={this.updateHudState}
        />
      })
    },50)
  }

  updatePlayerState = (newPlayerObject) => {
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

    this.setState({player:newPlayerObject});

  }

  loadGame = () => {
    let player = JSON.parse(localStorage.getItem("player"));

    this.setState({player});
  }

  saveGame = () => {
    let player = JSON.stringify(this.state.player);
    console.log("saved");
    localStorage.setItem("player",player);
  }

  createPlayerObject = (name,fleet,money=100) => {
    let cargo = [];

    goods.forEach((good)=>{
      let item = {
        name:good.name,
        image:good.image,
        size:good.size,
        volatility:good.volatility,
        contrabandChance:good.contrabandChance,
        quantity:0,
      }
      cargo.push(item);
    })
    let player = {
      name,
      fleet,
      cargo,
      money
    }
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
      updateHudState={this.updateHudState}
      />})
  }

  showCharacterCreation = () => {
    this.setState({
      gameScreen:<CharacterCreation 
      createPlayerObject={this.createPlayerObject } 
      showPort={this.showPort}
      updateHudState={this.updateHudState}
      />});
  }

  showPort = (portData) => {
  this.setState({gameScreen:
    <div>
      <Port
      port={portData} 
      startCombat={this.startCombat}
      updatePlayerState={this.updatePlayerState}
      player={this.state.player}
      updateHudState={this.updateHudState}
    />
    </div>
  })
  }

  updateHudState = (showHud,showOnlyGold=false) => {
    this.setState({hudProps:{show:showHud,showOnlyGold}});
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
    let showHud = this.state.hudProps.show;
    return (
      <div className="App">
        {this.state.gameScreen}
        {
          showHud?
          <HUD 
            showOnlyGold={this.state.hudProps.showOnlyGold}
            player={this.state.player}
            updatePlayerState={this.updatePlayerState}
            saveGame={this.saveGame}
          />
          :
          null
        }
      </div>
    );
  }
}

export default App;
