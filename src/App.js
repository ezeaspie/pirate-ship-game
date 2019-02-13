import React, { Component } from 'react';
import Combat from './components/Combat';
import MainMenu from './components/MainMenu';
import shipFactory from './components/ShipFactory';
import Port from './components/Port';
import './App.css';
import CharacterCreation from './components/CharacterCreation';
import HUD from './components/HUD';
import goods from './components/goodsData';
import Overlay from './components/Overlay';
import portData from './components/portData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: undefined,
      currentPort:0,
      hudProps:{show:false,showOnlyGoldAndCargo:false},
      gameScreen:<MainMenu 
      showCC={this.showCharacterCreation} 
      startCombat={this.startCombat}
      />,
      overlayStatus:0,
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
    //Used to ensure that there is a bit of data to use before starting.
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
    //Since player object is used often, small checks must be run to prevent issues
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
      newPlayerObject.fleet.forEach((ship)=>{
        if(ship.id !== undefined || ship.isPlayer !== undefined || ship.isActive !== undefined){
          throw new Error("Object contains a combat specific property. This means you forgot to remove these properties when the player exited Combat. This can potentially cause issues later on in non combat situations. Check the Combat.js file's rebuildShipObject property to make sure all extra properties are deleted before running this update function.")
        }
      })
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

    let portStatus = [];

    portData.forEach((port,i)=>{
      let status = false;
      if(i === 0){
        status = true;
      }
      let currentPortStatus = {name:port.name, unlocked:status}
      portStatus.push(currentPortStatus);
    })


    let player = {
      name,
      fleet,
      cargo,
      money,
      portStatus,
    }
    this.setState({player},this.saveGame);
  }

  createOpponent = (name,difficulty) => {

    let fleetGenerator = (shipTypeArray)=> {
      let fleet = [];
      shipTypeArray.forEach((ship)=>{
        fleet.push(shipFactory(undefined,ship))
      })
      return fleet;
    }
    //Difficulty determines the types of fleets an opponent will face.
    const difficultyTiers = [
      [
        fleetGenerator([0,0]),
        [shipFactory("Lincoln Loud",0)],
        [shipFactory(undefined,1)],
        fleetGenerator([0,1]),
        fleetGenerator([1,1,0]),
        fleetGenerator([2]),
        fleetGenerator([0,0,0]),
      ],
    ]

    let fleet = difficultyTiers[difficulty][Math.floor(Math.random() * difficultyTiers[difficulty].length)];

    
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

  updateOverlayState = (newOverlayState) => {
    this.setState({overlayStatus:newOverlayState});
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
    //Used when portData object is known and the ID's aren't
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

  updateCurrentPort = (portId) => {
    //Used when ID's of new port is known.
    let port = portData[portId];
    this.setState({currentPort:portId,gameScreen:
      <div>
      <Port
      key={portId}
      port={port} 
      startCombat={this.startCombat}
      updatePlayerState={this.updatePlayerState}
      player={this.state.player}
      updateHudState={this.updateHudState}
    />
    </div>
    });
  }

  updateHudState = (showHud,showOnlyGoldAndCargo=false) => {
    this.setState({hudProps:{show:showHud,showOnlyGoldAndCargo}});
  } 

  startCombat = (opponent=undefined,currentPort,nextPort) => {
    let object = opponent;
    if(opponent===undefined){
      object = this.createOpponent("Fatman",0);
    }

    this.updateHudState(false);
    
    this.setState({gameScreen:<Combat 
      opponent={object} 
      player={this.state.player}
      currentPort={currentPort}
      nextPort={nextPort}
      updatePlayerState={this.updatePlayerState}
      updateCurrentPort={this.updateCurrentPort}
      updateHudState={this.updateHudState}
      />})
  }

  render() {
    let showHud = this.state.hudProps.show;
    let overlayStatus = this.state.overlayStatus;
    return (
      <div className="App">
      {
        this.state.player !== undefined?
          <Overlay
          createOpponent={this.createOpponent} 
          startCombat={this.startCombat}
          status={overlayStatus} 
          player={this.state.player}
          updateCurrentPort={this.updateCurrentPort}
          currentPort={this.state.currentPort}
          updateOverlayState={this.updateOverlayState}/>:
          null
      }
        {this.state.gameScreen}
        {
          showHud?
          <HUD 
            showOnlyGoldAndCargo={this.state.hudProps.showOnlyGoldAndCargo}
            player={this.state.player}
            updatePlayerState={this.updatePlayerState}
            saveGame={this.saveGame}
            updateOverlayState={this.updateOverlayState}
          />
          :
          null
        }
      </div>
    );
  }
}

export default App;
