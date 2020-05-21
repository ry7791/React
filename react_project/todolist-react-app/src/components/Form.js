import React, { Component } from 'react';
import './Form.css';
import { connect } from 'react-redux';
import {addTodo} from '../actions';

class Form extends Component {
    state = {
        todo:''
    };

     // Event Handler 함수 정의
  handleChange = (e) =>{
    this.setState({
      todo:e.target.value
    });
  };
  handleCreate = () =>{
      const {todo} = this.state;
      this.props.addTodo({
          text: todo,
          checked: false
      });
    this.setState({
      todo:''
    });
  };
  handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
      this.handleCreate();
    };
  };

    render() {
        const { todo } = this.state;
        const { handleChange, handleKeyPress, handleCreate } = this;
        return (
            <div className="form">
                <input value={todo} onChange={handleChange} onKeyPress={handleKeyPress} />
                <div className="create-button" onClick={handleCreate}>
                    추가
                </div>
            </div>
        );
    }
}

export default connect(null, {addTodo})(Form);