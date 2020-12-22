import React from 'react';

import './cards.css';

class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state={
            opened:false,
            modalOpened:false
        }
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(){
        this.props.delete(this.props.id);
    }
    render(){
        return(
            <div className='card' >
                <div className="card_type">
                    {this.props.type}
                    <button
                    onClick={this.removeItem}
                    className='delete_card'>X</button>
                </div>
                <div className="card_title">
                    <h2>{this.props.firstName} {this.props.lastName}</h2>
                    <p>{this.props.email}</p>
                </div>
                <div className="card_body">
                    <button onClick={()=>this.setState({opened:!this.state.opened})}>More info</button>
                    {this.state.opened &&
                    <div className='card_comment'>
                        {this.props.comment}
                    </div>
                    }
                </div>
                <div className='card_report'>
                    {this.props.report ? 'Make report':'Dont make report'}
                </div>
                <div className="card_time">
                    <p>Data From <span>{this.props.dataFrom}</span></p>
                    <p>Data To <span>{this.props.dataTo}</span></p>
                </div>

            </div>
        )
    }


}





export default Cards;