import React, {Component} from 'react';
import Fragment from 'react';
import '../App.css';

class Todo_form extends Component{

    state = {
       
        todo:'',
       
    };

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        
        this.props.onCreate(this.state);
        this.setState({
            todo:''
            
        })
        
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="App-form">
            <div>
            <input size="100" text-align="center" value={this.state.todo} placeholder="오늘 할 일을 추가하세요" onChange={this.handleChange} name='todo'/>
            <button type="submit" >추가</button>

            <div>{this.state.todo}</div>

            
            </div>
            </form>
        );
    }
}
export default Todo_form