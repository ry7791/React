import React, {Component} from 'react';
import TodoItem from './components/Todo_item';

class Todo_List extends Component{
    render(){
        // const data = this.props; //contacts -> data.contacts
        const {data, onRemove, onUpdate} = this.props;
        //  <PhoneList data ={this.state.contacts} onRemove={this.handleRemove}/>
        // 이렇게 두개를 받는 경우는
        //  data -> data.data
        /// onRemove -> data.onRemove



        // for(let i=0 ; i<data.length;i++){
        //     console.log(data[i]);
        // }

        // const list = data.map(value => 
        //     <div key={value.id}>{value.name}/{value.phone}</div>
        // )
        
        const list = data.map(value=>(
            <TodoItem key={value.id} info={value} onRemove={onRemove} onUpdate={onUpdate} />
        ));
        
        //삭제 기능을 넣을때//
        // 1.이벤트 주체를 결정             <삭제> 버튼
        // 2.이벤트 종류를 결정             <클릭이벤트>
        // 3.이벤트 핸들러를 구현           이벤트가 작동되면 어떤 동작을 할지 결정하는 함수 구현
        // 4.이벤트 주레 <-> 핸들러 연결    함수 <-> 버튼

        //수정 기능 넣을 때//
        //1. 수정버튼추가
        //2. 수정클릭시 해당하는 아이템 값 



        return(
             <div>
                    {list}
            </div>
        );
    }

}
export default Todo_List