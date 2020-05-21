import React, { Component } from 'react';
import './TodoItem.css'
import { connect } from 'react-redux';
import {removeTodo, toggleTodo} from '../actions';
class TodoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }
    handleRemove = (id) =>{
        this.props.removeTodo(id);
      };

      handleToggle = (todo) => {
          this.props.toggleTodo(todo);
        //   this.setState ({
        //       checked: todo.checked
        //   })
      }
    
    render() {
        const { todoText, checked, id } = this.props;
        return (
            <div className="todo-item" onClick={() =>{
            const todo = {id, text:todoText, checked};
            todo.checked = !todo.checked;
            this.handleToggle(todo)}}>
                <div className="remove" onClick={(e) => {
                    //버블업(event가 부모까지 전파되는것) 방지 되도록
                    e.stopPropagation();
                    this.handleRemove(id);
                }}>
                    &times;
                </div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{todoText}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default connect(null,{removeTodo,toggleTodo})(TodoItem);