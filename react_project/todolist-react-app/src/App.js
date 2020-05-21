import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

// const initialTodos = new Array(500).fill(0).map(
//   (item, idx) => ({ id: idx, text: `일정 ${idx}`, checked: true })
//   );

class App extends Component {
 /* id=3;
  상태변수
  state = {
    todo:'',
    todos: initialTodos
    todos:[{id:0,checked:false,text:'todo1'},
           {id:1,checked:true,text:'todo2'},
           {id:2,checked:false,text:'todo3'},
          ]
    
  }
  
  // Event Handler 함수 정의
  handleChange = (e) =>{
    this.setState({
      todo:e.target.value
    })

  }
  handleCreate = () =>{
    const {todo, todos} = this.state;
    this.setState({
      todos:todos.concat({id:this.id++, text:todo,checked:false}),
      todo:''
    });
  };
  handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
      this.handleCreate();
    };
  };

  handleRemove = (id) =>{
    const {todos} = this.state;
    this.setState({
      todos:todos.filter(todo => todo.id !== id)
    });
  };
  handleToggle = (id) =>{
    const { todos } = this.state;
    // 파라미터로 받은 id 를 가지고 몇번째 Item인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체
    const copyTodos = [...todos]; // 배열을 복사
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    copyTodos[index] = {
    ...selected,
    checked: !selected.checked
    };
    this.setState({
    todos: copyTodos
    });
    
  
  };
*/
  render() {

    return (
      <div>
        <TodoListTemplate form={<Form/>}>
          <TodoItemList /*todos={todos} myRemove={handleRemove} myToggle = {handleToggle}*//>
        </TodoListTemplate>
      </div>
    );
  }
}

export default App;
