import React, {Component} from 'react';
import Shipyard from './Shipyard';
import shipFactory from './ShipFactory';
import ShipWright from './ShipWright';
import cannonFactory from './CannonFactory';
import goods from './goodsData';
import Marketplace from './Marketplace';

class Port extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentView: 3,
            generatedShipYard: undefined,
            generatedShips:undefined,
            generatedGoods:undefined,
            generatedCannons:undefined,
        }
    }

    componentDidMount(){
        if(!this.props.player.portStatus[this.props.portId].unlocked){
            console.log("NEVER UNLOCKED THIS PORT");
            let player = this.props.player;
            player.portStatus[this.props.portId].unlocked = true;
            this.props.updatePlayerState(player);
        }
        let generatedShips = [];
        let generatedCannons = [];
        let generatedGoods = [];

        this.props.port.shipClassesSold.map((shipType)=>{
            let ship = shipFactory(undefined,shipType);
            generatedShips.push(ship);
            return true;
        })

        this.props.port.cannonsSold.map((cannonType)=>{
            let cannon = cannonFactory(cannonType);
            generatedCannons.push(cannon);
            return true;
        })

        for(let i = 0; i<this.props.port.goodsSold; i++){
            let generateRandomWithRange = (maximum,minimum) => {
                return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            }
            let currentGood = goods[i];
            let floorPrice = goods[i].basePrice - goods[i].volatility;
            let peakPrice = goods[i].basePrice + goods[i].volatility;

            let newPrice = generateRandomWithRange(peakPrice,floorPrice);

            if(newPrice <= 0){
                newPrice = 1;
            }

            currentGood.currentPrice = newPrice;
            
            generatedGoods.push(currentGood);
        }
        this.setState({generatedShips, generatedCannons, generatedGoods,generatedShipYard:
        <Shipyard 
        player={this.props.player}
        changeCurrentView={this.changeCurrentView} 
        shipClassesSold={this.props.port.shipClassesSold} 
        generatedShips={generatedShips}
        updatePlayerState={this.props.updatePlayerState}
        updateGeneratedShips={this.updateGeneratedShips}
        updateHudState={this.props.updateHudState}
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
        this.setState({currentView:whichView});
    }

    render(){

        let getCurrentView = () => {
            //views[3] is the 'main' port view
            let views = [
                this.state.generatedShipYard,
                <ShipWright 
                player={this.props.player}
                updatePlayerState={this.props.updatePlayerState}
                updateHudState={this.props.updateHudState}
                changeCurrentView={this.changeCurrentView}
                generatedCannons={this.state.generatedCannons}
                />,
                <Marketplace 
                generatedGoods={this.state.generatedGoods}
                player={this.props.player}
                updatePlayerState={this.props.updatePlayerState}
                changeCurrentView={this.changeCurrentView}
                updateHudState={this.props.updateHudState}
                />,
                <div className="current-port-view">
                    <div className="port-buttons">
                    <h1>{this.props.port.name}</h1>
                    <button onClick={()=>{
                        this.changeCurrentView(2)
                        this.props.updateHudState(true,true);
                    }
                        }>MarketPlace</button>
                    <button onClick={()=>{
                        this.changeCurrentView(0)
                        this.props.updateHudState(true,true);
                        }}>Shipyard</button>
                    <button onClick={()=>{
                        this.changeCurrentView(1);
                        this.props.updateHudState(true,true);
                        }}>ShipWright</button>
                    <button>Warehouse</button>
                    <button onClick = {()=>{
                        console.log(this.props.port.armada);
                        this.props.startCombat(undefined,this.props.portId,this.props.portId+1,this.props.port.armada);
                        }}>Head to Next Port</button>
                    </div>
                    <div className="port-graphics">
                        <img src={this.props.port.image} alt={this.props.port.name}></img>
                    </div>
                </div>
            ]
    
            let selectedView = views[this.state.currentView];
    
            return selectedView;
        }

        let selectedView = getCurrentView();

        return(
            
            <div className="port">
            {selectedView}      
            </div>
        )
    }
}

export default Port;