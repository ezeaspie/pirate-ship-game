import React , { Component } from 'react';
import Fleet from './Fleet';
import shipFactory from './ShipFactory';


//Remember to 'reset' the shipObject to remove the Combat only ship object properties
//once the battle ends.

class Combat extends Component {
    constructor(props){
        super(props);
        this.state = {
            opponentFleet:[shipFactory("SS Anne",0,100,28,121),shipFactory("Purity",1,200,10,9000)],
            playerFleet:[shipFactory("Moongazer",2,400,100,2122)],
            attackOrder:undefined,
            currentAttackerId:0,
        }
        this.handleAttack = this.handleAttack.bind(this);
    }

    componentDidMount(){
        this.calculateAttackOrder()
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
        this.setState({attackOrder:combinedFleets}, this.handlePreAttack);
    }

    handlePreAttack = () => {
        //Will check if player's turn and show attack options. 
        //Fire all cannons or fire individually?
        //Check if an opponent ship. If so, delay, then choose attacks and execute.
        let attackOrder = this.state.attackOrder;
        let currentAttackerId = this.state.currentAttackerId;
        
        attackOrder.forEach((ship)=>{
            ship.isActive = false;
        })

        attackOrder[currentAttackerId].isActive = true;

        this.setState({attackOrder});
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

        let cannonsThatHit = [];
        attacker.cannons.forEach((cannon)=>{
            let randomNum = Math.floor(Math.random() * 100); 
            if(cannon.accuracy >= randomNum){
                cannonsThatHit.push(cannon);
                return;
            }
            return;
        })

        let totalCannonDamage = cannonsThatHit.reduce((aggregator,currentVal)=> aggregator + currentVal.damage,0)

        targetShip[0].health -= totalCannonDamage;

        if(targetShip[0].health <= 0){
            console.log("DEAD AS A MUG");
            //write a function to handle ship sinking.
        }

        targetFleet.filter((ship)=>{
            if(targetShip[0].uniqueId === ship.uniqueId){
                ship = targetShip[0];
                //Run next turn after updating everything.
                this.setState(isPlayer?{opponentFleet:targetFleet}:{playerFleet:targetFleet},()=>this.handleEndOfTurn(isPlayer));
                return true;
            }
            return false
        })
    }

    handleEndOfTurn = (isPlayer) => {
        //Check for death?
        let activeFleet = undefined;
        if(isPlayer){
            activeFleet = this.state.playerFleet;
        }
        else{
            activeFleet = this.state.opponentFleet;
        }
        //Check if the ship is last in array. If so, start at 0;
        let length = this.state.attackOrder.length;
        if(this.state.currentAttackerId + 1 >= length){
            this.setState({currentAttackerId:0});
        }
        else{
            this.setState({currentAttackerId:this.state.currentAttackerId+1});
        }
        //If not, add 1.
        //Check if AI or player ship
        //Run PreTurn.
        //Allow for attacks.
    }

    render(){

        return(
            <div className="combat-main">
                <Fleet 
                    fleet={this.state.opponentFleet}
                    handleAttack={this.handleAttack}
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