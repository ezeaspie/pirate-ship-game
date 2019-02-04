import React, {Component} from 'react';
import Shipyard from './Shipyard';
import shipFactory from './ShipFactory';


class Port extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentView: false,
            generatedShipYard: undefined,
            generatedShips:undefined
        }
    }

    componentDidMount(){
        let generatedShips = [];

        this.props.port.shipClassesSold.map((shipType)=>{
            let ship = shipFactory(undefined,shipType);
            generatedShips.push(ship);
            return true;
        })

        this.setState({generatedShips, generatedShipYard:<Shipyard changeCurrentView={this.changeCurrentView} shipClassesSold={this.props.port.shipClassesSold} generatedShips={generatedShips}/>})
    }

    changeCurrentView = (whichView) => {
        let views = [
            this.state.generatedShipYard,
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