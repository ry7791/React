import React,{Component} from 'react';
import Todo_form from './components/Todo_form';
import Todo_List from './Todo_list';
import './App.css';

class App extends Component{
  id=1;
  state = {
    contacts:[
      {
        id : 0,
        todo : 'JSX 사용해보기',
      }
    ]
  }

  handleCreate = (data)=>{
 
    const {contacts} = this.state; // 비구조화 할당 => 간단하게 사용가능  더 알고 싶으면 객체구조분해 검색
        this.setState({
     contacts: contacts.concat({id: this.id++, ...data})
    })
    console.log(contacts);
  }

  handleRemove = (selected_id)=>{
    console.log('App handleRemove=' + selected_id);
    const { contacts } = this.state;
    this.setState({
      contacts:contacts.filter(
        info => info.id !==selected_id
      )
      });
  }

  handleUpdate = (selected_id, data)=>{
    console.log('App handleUpdate=' + selected_id);
    const { contacts } = this.state;
    this.setState({
      contacts:contacts.map(
        item => item.id === selected_id
                  ? 
                  {...item, ...data} // 중복된 데이터는 덮어 씀 // data를 전개연산자 안쓰면 {id: ,name: ,phone, data}이렇게 그대로 옴
                  :item   // 안같으면 기존 데이터 변경 없음      
      )
    });
    
  }

  render(){
    const {contacts} = this.state;
      return ( 
        <div>
        <div className="App-title"> 오늘 할 일 </div>
        <div>
        <Todo_form onCreate={this.handleCreate}/>
 
        <Todo_List data ={this.state.contacts}
        onRemove={this.handleRemove} onUpdate={this.handleUpdate} />

    
        </div>
        </div>
      );
  }
}

export default App;



