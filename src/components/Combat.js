import React , { Component } from 'react';
import Fleet from './Fleet';
import upgradeData from './upgradeData';
import shipFactory from './ShipFactory';


//Remember to 'reset' the shipObject to remove the Combat only ship object properties
//once the battle ends.

class Combat extends Component {
    constructor(props){
        super(props);
        this.state = {
            opponentFleet:this.props.opponent.fleet,
            playerFleet:this.props.player.fleet,
            attackOrder:undefined,
            currentAttackerId:0,
            isPlayersTurn:true,
        }
        this.handleAttack = this.handleAttack.bind(this);
    }

    componentDidMount(){
        let combinedFleets = this.calculateAttackOrder();
        this.setState({attackOrder:combinedFleets},()=>{
            setTimeout(this.handlePreAttack,1500);
        });
    }

    rebuildShipObject = () =>{
        let rebuiltFleet = [];
        this.state.playerFleet.forEach((ship)=>{
            delete ship.isActive;
            delete ship.isPlayer;
            delete ship.id;
            console.log(ship);
        })
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

        console.log(combinedFleets);
        return combinedFleets;
    }

    handlePreAttack = () => {
        //Will check if player's turn and show attack options. 
        //Fire all cannons or fire individually?
        //Check if an opponent ship. If so, delay, then choose attacks and execute.
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
                    console.log("AI's TURN");
                    setTimeout(this.handleAIAttack,1000);
                }
            });
    }

    handleAIAttack = () =>{
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
        let activeFleet = undefined;

        let attackOrder = this.calculateAttackOrder();
        if(isPlayer){
            activeFleet = this.state.playerFleet;
        }
        else{
            activeFleet = this.state.opponentFleet;
        }
        if(activeFleet.length === 0){
            //handle opponent/player death accordingly.
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
        //Run PreTurn.
        //Allow for attacks.
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
            </div>
        )
    }

}

export default Combat;