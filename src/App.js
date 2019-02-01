import React, { Component } from 'react';
import Combat from './components/Combat';
import MainMenu from './components/MainMenu';
import './App.css';
import CharacterCreation from './components/CharacterCreation';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: {
        fleet:[]
      },
      gameScreen:<MainMenu showCC={this.showCharacterCreation}/>,
    }
  }

  showMainMenu = () => {
    this.setState({gameScreen:<MainMenu showCC={this.showCharacterCreation}/>})
  }

  showCharacterCreation = () => {
    this.setState({gameScreen:<CharacterCreation />});
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
