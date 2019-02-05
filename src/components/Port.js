import React, {Component} from 'react';
import Shipyard from './Shipyard';
import shipFactory from './ShipFactory';
import ShipWright from './ShipWright';


class Port extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentView: false,
            generatedShipYard: undefined,
            generatedShips:undefined,
        }
    }

    componentDidMount(){
        let generatedShips = [];

        this.props.port.shipClassesSold.map((shipType)=>{
            let ship = shipFactory(undefined,shipType);
            generatedShips.push(ship);
            return true;
        })

        this.setState({generatedShips, generatedShipYard:
        <Shipyard 
        player={this.props.player}
        changeCurrentView={this.changeCurrentView} 
        shipClassesSold={this.props.port.shipClassesSold} 
        generatedShips={generatedShips}
        updatePlayerState={this.props.updatePlayerState}
        updateGeneratedShips={this.updateGeneratedShips}
        />})
    }

    updateGeneratedShips = (shipData) => {
        let generatedShips = this.state.generatedShips;
        generatedShips.forEach((ship)=>{
            if(ship === shipData){
                try{
                    if(ship.unavaliable !== undefined){
                        throw new Error("This ship already has a defined 'unavaliable' property. This means the player is able to click on a ship that's meant to be disabled.")
                    }
                }
                catch(err){
                    console.log(err);
                }
                ship.unavaliable = true;
            }
        })

        this.setState({generatedShips});
    }

    changeCurrentView = (whichView) => {
        let views = [
            this.state.generatedShipYard,
            <ShipWright 
            player={this.props.player}
            updatePlayerState={this.props.updatePlayerState}
            />
        ]

        let selectedView = whichView === false?whichView:views[whichView];
        console.log(selectedView);

        this.setState({currentView:selectedView});
    }

    render(){
        return(
            
            <div className="port">
            {!this.state.currentView?
            <div className="current-port-view">
                <h1>{this.props.port.name}</h1>
                <button>MarketPlace</button>
                <button onClick={()=>{this.changeCurrentView(0)}}>Shipyard</button>
                <button onClick={()=>{this.changeCurrentView(1)}}>ShipWright</button>
                <button>Warehouse</button>
                <button onClick = {()=>{this.props.startCombat()}}>Head to Next Port</button>
            </div>
                :
            <div className="current-port-view">
                {this.state.currentView}
            </div>
                }
                
            </div>
        )
    }
}

export default Port;