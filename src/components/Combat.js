import React , { Component } from 'react';
import Fleet from './Fleet';

//Remember to 'reset' the shipObject to remove the Combat only ship object properties
//once the battle ends.

class Combat extends Component {
    constructor(props){
        super(props);
        this.state = {
            opponentFleet:this.props.armadaData.enabled?this.props.armadaData.armada[0]:this.props.opponent.fleet,
            playerFleet:this.props.player.fleet,
            attackOrder:undefined,
            currentAttackerId:0,
            isPlayersTurn:false,
            prizeMoney: undefined,
            currentBattle:0,
            items: [],
            selectedItem:undefined,
            showDialougeBox:false,
            dialougeBoxContent:"hi",
        }
        this.handleAttack = this.handleAttack.bind(this);
    }

    componentDidMount(){
        try{
            if(this.props.nextPort === undefined || this.props.currentPort === undefined){
                throw new Error("<Combat /> is missing a 'nextPort' or 'currentPort' property. This will cause issues when either player's fleet is defeated or you try to retreat. Check the 'startCombat' function parameters used to intiate this combat sequence.")
            }
            if(this.props.armadaData.enabled === undefined){
                throw new Error("armadaData prop is missing enabled property. Check the structure of the object and ensure the value is a boolean");
            }
        }
        catch(err){
            console.log(err);
        }

        if(this.props.armadaData.enabled){
            this.setState({opponentFleet:this.props.armadaData.armada[0]});
            console.log("FIGTING AN ARMADA");
        }
        let combinedFleets = this.calculateAttackOrder();
        let prizeMoney = this.state.opponentFleet.reduce((acc,cur)=>{
            return acc + cur.price;
        },0)
        prizeMoney = Math.floor(prizeMoney * .75);
        this.setState({attackOrder:combinedFleets, prizeMoney,items:this.props.player.items},()=>{
            setTimeout(this.handlePreAttack,1500);
        });
    }

    handleItemUse = (item) => {
        let attackOrder = this.state.attackOrder;
        let selectedItem = undefined;
        if(item.healsOrDamages){
            //Means the item is used to heal
            if(item.affectsAll){
                //Item affects entire fleet
                attackOrder.forEach((ship)=>{
                    if(ship.health + item.unit > ship.maxHealth && ship.isPlayer){
                        ship.health = ship.maxHealth;
                    }
                    else
                    {
                        if(ship.isPlayer){
                            ship.health += item.unit;
                        }
                    }
                })
            }
            else{
            attackOrder.forEach((ship,i)=>{
                if(i === this.state.currentAttackerId){
                    if(ship.health + item.unit > ship.maxHealth){
                        ship.health = ship.maxHealth;
                    }
                    else{
                        ship.health += item.unit;
                    }
                }
            })

            }
        } else{
            if(item.affectsAll){
                attackOrder.forEach((ship,i)=>{
                    if(!ship.isPlayer){
                        ship.health -= item.unit;
                    }
                })
            }
            else{
                //there has to be a way to tell the game which ship to target
                //therefore we change a state and button functionality.
                selectedItem = item.id;
            }
        }
        let items = this.state.items;
        items.forEach((stateItem)=>{
            if(item.id === stateItem.id && selectedItem === undefined){
                item.quantity -= 1;
            }
        })

        let opponentShipsAlive = attackOrder.filter((ship)=>{
            return ship.health > 0 && !ship.isPlayer
        })

        this.setState({opponentFleet:opponentShipsAlive,attackOrder:this.calculateAttackOrder(),items,selectedItem},()=>{
            if(this.state.selectedItem === undefined){
                this.handleEndOfTurn(true);
            }
        });
    }

    rebuildShipObject = () =>{
    //Removes extra properties from the player's fleet that are only used in Combat.
        let rebuiltFleet = [];
        this.state.playerFleet.forEach((ship)=>{
            delete ship.isActive;
            delete ship.isPlayer;
            delete ship.id;
            rebuiltFleet.push(ship);
        })

        return rebuiltFleet
    }

    calculateAttackOrder = () =>{
        //sort ships into a list based on speed.
        let playerFleet = this.state.playerFleet;
        let opponentFleet = this.state.opponentFleet;
        let addIsPlayerProperty = (fleet,isPlayer) => {
            fleet.forEach((ship)=>{
                ship.isPlayer = isPlayer;
            })
        }

        addIsPlayerProperty(playerFleet,true);
        addIsPlayerProperty(opponentFleet,false);

        let combinedFleets = playerFleet.concat(this.state.opponentFleet);

        combinedFleets.forEach((ship,i)=>{
            ship.id = i;
            ship.isActive = false;
        })

        combinedFleets.sort((a, b) => parseFloat(b.speed) - parseFloat(a.speed));

        return combinedFleets;
    }

    handlePreAttack = () => {
        //Will check if player or opponent's turn and act accordingly.
        let attackOrder = this.state.attackOrder;
        let currentAttackerId = this.state.currentAttackerId;
        let isPlayersTurn = this.state.attackOrder[currentAttackerId].isPlayer;
        
        attackOrder.forEach((ship)=>{
            ship.isActive = false;
        })

        if(this.state.attackOrder[currentAttackerId].cannons.length === 0){
            this.handleEndOfTurn(this.state.attackOrder[currentAttackerId].isPlayer);
            return;
        }

        attackOrder[currentAttackerId].isActive = true;

        this.setState({attackOrder,isPlayersTurn},
            ()=>{
                if(!this.state.isPlayersTurn){
                    setTimeout(this.handleAIAttack,1000);
                }
            });
    }

    handleAIAttack = () =>{
        //Logic for AI attack (Check if can kill a ship, if not, target randomly)
        let possibleTargets = this.state.playerFleet;
        let attackingShip = this.state.attackOrder[this.state.currentAttackerId];
        let selectedTarget = undefined;
        let cannonDamage = this.calculateAllCannonDamage(attackingShip,true);

        let possibleKills = possibleTargets.filter((ship)=>{
            return ship.health - cannonDamage <= 0
        })

        if(possibleKills.length !== 0){
            selectedTarget = possibleKills[Math.floor(Math.random() * possibleKills.length)];
        }
        else{
            selectedTarget = possibleTargets[Math.floor(Math.random()*possibleTargets.length)];
        }
        this.handleAttack(selectedTarget,false);
    }

    handleShipSinking = (sunkenShip,isPlayer) =>{
        //isPlayer in this context gives us the attacker, making the target fleets opposite of the IsPlayer value.
        let targetFleet = this.state.opponentFleet;
        if(!isPlayer){
            targetFleet = this.state.playerFleet;
        }

        let index = targetFleet.findIndex((ship)=>{
            return ship.uniqueId === sunkenShip.uniqueId;
        })

        targetFleet.splice(index,1);
        return targetFleet;
    }

    calculateAllCannonDamage = (attacker,perfectAccuracy=false) =>{
        //perfectAccuracy is used to return a number where all cannons will hit
        let cannonsThatHit = [];
        if(perfectAccuracy){
            cannonsThatHit = attacker.cannons.length === 0?[]:attacker.cannons;
        }
        else{
            attacker.cannons.forEach((cannon)=>{
                let randomNum = Math.floor(Math.random() * 100); 
                if(cannon.accuracy >= randomNum){
                    cannonsThatHit.push(cannon);
                    return;
                }
                return;
            })
        } 
        let totalCannonDamage = cannonsThatHit.reduce((aggregator,currentVal)=> aggregator + currentVal.damage,0)
        return totalCannonDamage;
    }

    recieveAttack = (targetShip,damage) => {
        targetShip.health -= damage;
        //Check for cannon destruction
        if(targetShip.cannons.length !== 0){
            let targetedCannon = targetShip.cannons[Math.floor(Math.random() * targetShip.cannons.length)];
            let randomNum = Math.floor(Math.random() * 100); 
                if(targetedCannon.durability <= randomNum){
                    console.log("CANNON BREAK!")
                    let index = targetShip.cannons.findIndex((cannon)=>{
                        return targetedCannon.uniqueId === cannon.uniqueId;
                    })
                    targetShip.cannons.splice(index,1);
                }
        }

        return targetShip;
    }

    handleAttack = (target,isPlayer,itemUse=this.state.selectedItem) => {
        let targetFleet = undefined;
        let attacker = this.state.attackOrder[this.state.currentAttackerId];

        if(isPlayer){
            targetFleet = this.state.opponentFleet;
        }
        else{
            targetFleet = this.state.playerFleet;
        }
        let targetShip = targetFleet.filter((ship)=>{
            return target.uniqueId === ship.uniqueId;
        })

        let totalCannonDamage = this.calculateAllCannonDamage(attacker);
        if(itemUse !== undefined){
            let items = this.state.items;
            totalCannonDamage = items[itemUse].unit;
            items[itemUse].quantity -= 1;
            this.setState({selectedItem : undefined});
        }

        let damagedShipObject = this.recieveAttack(targetShip[0],totalCannonDamage);

        let isShipDead = false;

        if(damagedShipObject.health <= 0){
            targetFleet = this.handleShipSinking(damagedShipObject,isPlayer);
            isShipDead = true;
        }

        if(!isShipDead){
            //Update the ship's data in it's respective fleet.
            targetFleet.filter((ship)=>{
                if(damagedShipObject.uniqueId === ship.uniqueId){
                    ship = damagedShipObject;
                    return true;
                }
                return false
            })  
        }

        this.setState(
            isPlayer?{opponentFleet:targetFleet}:{playerFleet:targetFleet},
            ()=>this.handleEndOfTurn(isPlayer)
        );

        
    }

    handleEndOfTurn = (isPlayer) => {
        //Used to manage events after someone attacks.
        let opponentFleet = undefined;

        let attackOrder = this.calculateAttackOrder();
        if(isPlayer){
            opponentFleet = this.state.opponentFleet;
        }
        else{
            opponentFleet = this.state.playerFleet;
        }
        //Check for death
        if(opponentFleet.length === 0){
            this.handleDeath(!isPlayer);
        }
        else{
            let length = attackOrder.length;
            if(this.state.currentAttackerId + 1 >= length){
                this.setState({currentAttackerId:0,attackOrder},this.handlePreAttack);
            }
            else{
                this.setState({currentAttackerId:this.state.currentAttackerId+1},this.handlePreAttack);
            }
        }
    }

    handleDeath = (isPlayer) => {
        if(isPlayer){
            console.log("Player died.");
        }
        else{
            console.log("Opponent died.");
            let playerFleet = this.rebuildShipObject();
            let player = this.props.player;
            player.money += Number(this.state.prizeMoney);
            player.fleet = playerFleet;

            this.props.updatePlayerState(player);
            if(this.props.armadaData.enabled){
                if(this.state.currentBattle +1 > this.props.armadaData.numberOfBattles-1){
                    //IF ARMADA BATTLE REACHES AN END
                    let dialougeBox = <div className="dialouge-box shown">
                        <p>You sank the opponent's fleet!</p>
                        <p>You find <b>{this.state.prizeMoney} gold</b> in the wreckage</p>
                        <button onClick={()=>{
                            this.props.updateCurrentPort(this.props.nextPort);
                            this.props.updateHudState(true);
                        }}>Ok</button>
                    </div>
                    this.setState({dialougeBoxContent:dialougeBox,showDialougeBox:true});
                }
                else{
                    this.setState({currentBattle:this.state.currentBattle+1},()=>{

                        this.setState({opponentFleet:this.props.armadaData.armada[this.state.currentBattle]},()=>{
                            let combinedFleets = this.calculateAttackOrder();
                            let prizeMoney = this.state.opponentFleet.reduce((acc,cur)=>{
                                return acc + cur.price;
                            },0)
                            prizeMoney = Math.floor(prizeMoney * .75);
                            this.setState({attackOrder:combinedFleets, prizeMoney},()=>{
                                setTimeout(this.handlePreAttack,1500);
                            });    
                        });
                    }    
                    )
                }
                //check for next armada fight.
                //send to next port if final battle
                //else, show next fleet.
            }
            else{
                let dialougeBox = <div className="dialouge-box shown">
                        <p>You sank the opponent's fleet!</p>
                        <p>You find <b>{this.state.prizeMoney} gold</b> in the wreckage</p>
                        <button onClick={()=>{
                            this.props.updateCurrentPort(this.props.nextPort);
                            this.props.updateHudState(true);
                        }}>Ok</button>
                    </div>
                this.setState({dialougeBoxContent:dialougeBox,showDialougeBox:true});
            }
        }
    }

    handleFlee = () => {
            let playerFleet = this.rebuildShipObject();
            let player = this.props.player;
            player.fleet = playerFleet;

            this.props.updatePlayerState(player);
            this.props.updateCurrentPort(this.props.currentPort);
            this.props.updateHudState(true);
    }

    handleScuttle = (cargoCapacity) => {
        //Runs a loop that grabs cargo indexes that have > 0 capacity and removes
        //until CargoCapacity > CurrentCargo
        let player = this.props.player;

        const calculateCurrentCargo = () => {
            let currentCargo = player.cargo.reduce((acc,cargo)=>{
                return acc + cargo.quantity * cargo.size;
            },0);
            return currentCargo;
        }

        const evaluateCargoCapacity = () => {
            let currentCargo = calculateCurrentCargo();
            return currentCargo > cargoCapacity;
        }

        while (evaluateCargoCapacity()){
            
            let removableCargoIndexes = [];
            player.cargo.forEach((good,i)=>{
                if(good.quantity > 0){
                    removableCargoIndexes.push(i);
                }
            })
            let randomIndex = Math.floor(Math.random() * removableCargoIndexes.length + 1);
            player.cargo[randomIndex].quantity -= 1;
        }
        this.forceUpdate();
    }


    render(){

        let currentCargo = this.props.player.cargo.reduce((acc,cargo)=>{
            return acc + (cargo.quantity * cargo.size);
        },0)

        let cargoCapacity = 0;
        let isOverburdened = false;

        if(this.state.attackOrder !== undefined){
            this.state.attackOrder.forEach((ship)=>{
                if(ship.isPlayer){
                    cargoCapacity += ship.capacity;
                }
            });
            console.log(cargoCapacity);
        }

        if(currentCargo > cargoCapacity){
            isOverburdened = true;
        }

        return(
            <div className="combat-main">
            {
                this.state.showDialougeBox?
                this.state.dialougeBoxContent
                :<div className="dialouge-box"></div>
            }
            {this.props.armadaData.enabled?
                <div>
                    <h1>{this.props.armadaData.title}</h1>
                    <h2>Battle {this.state.currentBattle+1}/{this.props.armadaData.numberOfBattles}</h2>
                </div>
                :null}
                <Fleet 
                    fleet={this.state.opponentFleet}
                    handleAttack={this.handleAttack}
                    isPlayersTurn={this.state.isPlayersTurn}
                    isPlayer={false}
                />
                <Fleet
                    fleet={this.state.playerFleet}
                    handleAttack={this.handleAttack}
                    isPlayer={true}
                />
                <div className="hud">
                    <ul className="item-list">
                        {
                            this.state.items.map((item)=>{
                                    return (
                                        <li key ={item.id} className={this.state.selectedItem === item.id?"item selected":"item"} onClick={()=>{this.handleItemUse(item)}}>
                                            <button disabled={item.quantity === 0 || !this.state.isPlayersTurn}>
                                            <img src={item.image} alt={item.name} />
                                            <p>{item.name}</p>
                                            <p>x{item.quantity}</p>
                                            </button>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                    <button 
                    disabled={!this.state.isPlayersTurn || isOverburdened}
                    onClick={this.handleFlee}
                    >
                        FLEE
                    </button>
                    <button
                    onClick={()=>{this.handleScuttle(cargoCapacity)}}
                    disabled={!this.state.isPlayersTurn || !isOverburdened}
                    >
                        Scuttle Cargo
                    </button>
                </div>
            </div>
        )
    }

}

export default Combat;