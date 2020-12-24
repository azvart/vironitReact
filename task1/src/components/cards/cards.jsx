import React from 'react';

import './cards.css';

class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state={
            opened:false,
            modalOpen:false,
            
         
            
        }
        this.upFirst = React.createRef();
        this.upLast = React.createRef();
        this.upEmail = React.createRef();
        this.upType = React.createRef();
        this.dataFrom = React.createRef();
        this.dataTo = React.createRef();
        this.upReport = React.createRef();
        this.upComment = React.createRef();
        this.removeItem = this.removeItem.bind(this);
        this.update = this.update.bind(this);
    }
    update(event){
        event.preventDefault();
        const updateCard={
            firstName:this.upFirst.current.value,
            lastName:this.upLast.current.value,
            email:this.upEmail.current.value,
            type:this.upType.current.value,
            dataFrom:this.dataFrom.current.value,
            dataTo:this.dataTo.current.value,
            report:this.upReport.current.value,
            comment:this.upComment.current.value
        }
        console.log(updateCard);
        this.props.update(this.props.id,updateCard);
    }
    removeItem(){
        this.props.delete(this.props.id);
    }
    render(){
        return(
            <div className='card' onDoubleClick={()=>this.setState({modalOpen:!this.state.modalOpen})} >
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




                    {this.state.modalOpen && 
                    <aside className='side_bar'>
                        <h2>Update</h2>
                        <form onSubmit={this.update}>
                        <input type="text"
                            ref={this.upFirst}
                            placeholder={this.props.firstName}
                           
                        />
                        <input type="text"
                        ref={this.upLast}
                        placeholder={this.props.lastName}
                        />
                        <input type="text"
                        ref={this.upEmail}
                        placeholder={this.props.email}
                        />
                            <select ref={this.upType} >
                            <option value="Work">Work</option>
                            <option value="Home">Home</option>
                            <option value="Another">Another</option>
                        </select>
                        

                        <div className="data_form">
                        <div className="from_data">
                            <label>From</label>
                            <input type="datetime-local"
                            ref={this.dataFrom}
                            />
                        </div>
                        <div className="to_data">
                            <label>To:</label>
                            <input type="datetime-local"
                            ref={this.dataTo}
                            />
                        </div>
                    </div>
                    <div className="report_form">
                        <label>Make report:</label>
                        <input type="checkbox"
                        ref={this.upReport}
                        />
                    </div>

                    
                    <textarea  id="" cols="30" rows="10"
                       ref={this.upComment}
                       placeholder={this.props.comment}
                        ></textarea>



                    <div className="submit_form">
                        <input type="submit" value='UPDATE'/>
                    </div>
                        </form>
                    </aside>
                    }
            </div>
        )
    }


}





export default Cards;