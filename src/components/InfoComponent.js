import React , {Component} from 'react';

class InfoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            showInfo: false,
        }
    }
    render(){
        let content = this.props.content;
        let description = this.props.description;
        return(
            <div className="info-main">
                {content}
                <button 
                onMouseOver={()=>{this.setState({showInfo:true})}}
                onMouseOut={()=>{this.setState({showInfo:false})}}
                className="info">?</button>
                <div className={this.state.showInfo?"info-description":"info-description  info-hide"}>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

export default InfoComponent;