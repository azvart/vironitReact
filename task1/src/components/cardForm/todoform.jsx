import React from 'react';
import './todoform.css';

class TodoForm extends React.Component{
    constructor(props){
        super(props);
 
        this.addHandler = this.addHandler.bind(this);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            dataFrom:'',
            dataTo:'',
            type:'',
            report:false,
            comment:''
        }
    }
  
    addHandler(e){
        e.preventDefault();
      
        this.props.addTask(this.state);
    }

    render(){
        return(
            <div className='form_container'>
                <form onSubmit={this.addHandler}>
                    <div className="name_form">
                        <label>First Name:</label>
                        <input type="text"
                            value={this.state.firstName}
                            onChange={(e)=>this.setState({...this.state,firstName:e.target.value})}
                        />
                    </div>
                    <div className="last_form">
                        <label>Last Name:</label>
                        <input type="text"
                        value={this.state.lastName}
                        onChange={(e)=>this.setState({...this.state,lastName:e.target.value})}
                        />
                    </div>
                    <div className="email_form">
                        <label>Email:</label>
                        <input type="text"
                        value={this.state.email}
                        onChange={(e)=>this.setState({...this.state,email:e.target.value})}
                        />
                    </div>

                    <div className="type_form">
                        <label>Type:</label>
                        <select value={this.state.type} onChange={(e)=>this.setState({...this.state,type:e.target.value})}>
                            <option value="Work">Work</option>
                            <option value="Home">Home</option>
                            <option value="Another">Another</option>
                        </select>
                    </div>
                    <div className="data_form">
                        <div className="from_data">
                            <label>From</label>
                            <input type="datetime-local"
                            value={this.state.dataFrom}
                            onChange={(e)=>this.setState({...this.state,dataFrom:e.target.value})}
                            />
                        </div>
                        <div className="to_data">
                            <label>To:</label>
                            <input type="datetime-local"
                            value={this.state.dataTo}
                            onChange={(e)=>this.setState({...this.state,dataTo:e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="report_form">
                        <label>Make report:</label>
                        <input type="checkbox"
                        checked={this.state.report}
                        onChange={(e)=>this.setState({...this.state,report:!this.state.report})}
                        />
                    </div>
                    <div className='comment_form'>
                        <label>Comment:</label>
                        <textarea  id="" cols="30" rows="10"
                        value={this.state.comment}
                        onChange={(e)=>this.setState({...this.state,comment:e.target.value})}
                        ></textarea>
                    </div>





                    <div className="submit_form">
                        <input type="submit" value='ADD'/>
                    </div>
                </form>
            </div>
        )
    }


}




export default TodoForm;