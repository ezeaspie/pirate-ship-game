import React, {Component} from 'react';

class HealthBar extends Component {
    render(){
        let percentage = (this.props.health/this.props.maxHealth) * 100;
        console.log(percentage);
        let style={
            width: `${percentage}%`,
        }
        return(
            <div className="health-bar">
                <div className="current-health" style={style}></div>
            </div>
        )
    }
}

export default HealthBar;