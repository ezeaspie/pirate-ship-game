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
            console.log(this.state.currentBattle, this.props.armadaData.numberOfBattles-1);
        }
        let combinedFleets = this.calculateAttackOrder();
        let prizeMoney = this.state.opponentFleet.reduce((acc,cur)=>{
            return acc + cur.price;
        },0)
        prizeMoney = Math.floor(prizeMoney * .75);
        this.setState({attackOrder:combinedFleets, prizeMoney},()=>{
            setTimeout(this.handlePreAttack,1500);
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
            console.log(ship);
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
        console.log(attackingShip);
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
                    console.log(index);
                    targetShip.cannons.splice(index,1);
                }
        }

        return targetShip;
    }

    handleAttack = (target,isPlayer) => {
        let targetFleet = undefined;
        let attacker = this.state.attackOrder[this.state.currentAttackerId];
        console.log(attacker);

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
        console.log({isPlayer,length:opponentFleet.length});
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
                console.log({currentBattleplusOne:this.state.currentBattle + 1, max:this.props.armadaData.numberOfBattles});
                if(this.state.currentBattle +1 > this.props.armadaData.numberOfBattles-1){
                    console.log("END BATTLES");
                    this.props.updateCurrentPort(this.props.nextPort);
                    this.props.updateHudState(true);
                }
                else{

                    /*let opponent = {
                        name:"Steven Universe",
                        fleet:this.props.armadaData.armada[this.state.currentAttackerId+1],
                    }
                    this.props.startCombat(opponent,this.props.currentPort,this.props.nextPort,this.props.armadaData);
                    */
                    this.setState({currentBattle:this.state.currentBattle+1},()=>{

                        this.setState({opponentFleet:this.props.armadaData.armada[this.state.currentBattle]},()=>{
                            let combinedFleets = this.calculateAttackOrder();
                            console.log(combinedFleets);
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
                this.props.updateCurrentPort(this.props.nextPort);
                this.props.updateHudState(true);
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

    render(){

        return(
            <div className="combat-main">
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
                    <button 
                    disabled={!this.state.isPlayersTurn}
                    onClick={this.handleFlee}
                    >
                        FLEE
                    </button>
                </div>
            </div>
        )
    }

}

export default Combat;