## React contact-app

npx create-react-app contact-app





- gitignore : git에 무엇을 올릴지 정해줌

```js
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules  //안올림
/.pnp   //안올림
.pnp.js

# testing
/coverage  //안올림

# production
/build   //안올림

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*


//나머지는 다 올림
```

- 각종 잡기술       cmd창에서 node 명령어 쳐서 간단하게 실행 가능

```js
myArray=[1,2,3,4,5]

=> 가운데 3만 없애보자

myArray.slice(0,2).concat(myArray.slice(3,5))
=> [1,2,4,5]

[...myArray.slice(0,2),...myArray.slice(3,5)]
=> [1,2,4,5]

myArray.map(v => console.log('<div>' + v + '</div>'));

//3이 아닌것들만 출력해보자
myArray.filter(n=> n!==3)

```



- 특정 id만 수정하기 (전개연산자 사용)

```js
const myTag = [
... {id:0, text:'Hello', tag:'a'},
... {id:1, text:'World', tag:'b'},
... {id:2, text:'Bye', tag:'c'}
... ];


> myTag
[
  { id: 0, text: 'Hello', tag: 'a' },
  { id: 1, text: 'World', tag: 'b' },
  { id: 2, text: 'Bye', tag: 'c' }
]


> const modifiedArray = myTag.map(v=>v.id===1?({text: 'React'}):v); 
> modifiedArray
[
  { id: 0, text: 'Hello', tag: 'a' },
  { text: 'React' },     // 전개연산자 안씀
  { id: 2, text: 'Bye', tag: 'c' }
]


 const modifiedArray2 = myTag.map(v=>v.id===1?({...v,text: 'React'}):v); //전개연산자
undefined
> modifiedArray2
[
  { id: 0, text: 'Hello', tag: 'a' },
  { id: 1, text: 'React', tag: 'b' },
  { id: 2, text: 'Bye', tag: 'c' }
]
```











- app.js

```js
import React,{Component} from 'react';
import Phone_form from './components/Phone_form';
import PhoneList from './phone_list';


class App extends Component{
  id=1;
  state = {
    contacts:[
      {
        id : 0,
        name : '관리자',
        phone : '010-0000-1111'
      }
    ]
  }

  handleCreate = (data)=>{
 
    const {contacts} = this.state; // 비구조화 할당 => 간단하게 사용가능  더 알고 싶으면 객체구조분해 검색
        this.setState({
     contacts: contacts.concat({id: this.id++, ...data})
    })
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
                  {...item, ...data} // data를 전개연산자 안쓰면 {id: ,name: ,phone, data}이렇게 그대로 옴
                  :item   // 안같으면 기존 데이터 변경 없음      
      )
    });
    
  }

  render(){
    const {contacts} = this.state;
      return (
        <div>
        <Phone_form onCreate={this.handleCreate}/>
        <PhoneList data ={this.state.contacts}
        onRemove={this.handleRemove} onUpdate={this.handleUpdate} onCreate={this.handleCreate}/>

        {/* {JSON.stringify(contacts)} */}
        </div>
      );
  }
}

export default App;

```



- phone_list

```js
import React, {Component} from 'react';
import PhoneItem from './components/Phone_item';

class PhoneList extends Component{
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
            <PhoneItem key={value.id} info={value} onRemove={onRemove} onUpdate={onUpdate} onCreate={this.handleCreate}/>
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
export default PhoneList
```



- phone_item

```js
import React, {Component} from 'react';

class PhoneItem extends Component{
    state = {
        editable: false,
        name: '',
        phone: ''
    }

    componentDidUpdate(preProps, prevState){
        const {info, onUpdate} = this.props;
        // console.log(info.name +"/" + info.phone);
        // console.log(onUpdate);
        // console.log(prevState.editable+ "/" + this.state.editable);
        if(!prevState.editable && this.state.editable){
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }
        //update
        if ( prevState.editable && !this.state.editable){
            onUpdate(info.id,{
                name:this.state.name,
                phone:this.state.phone
            })
        }
    }


    handleChange=(e)=>{
        const { name, value} = e.target;
        this.setState({
            [name]:value
            
        })
    }

    handleRemove=()=>{
            
        const{info,onRemove} =this.props;
        
        onRemove(info.id);
    }

    handleUpdate=()=>{
        const {editable} = this.state;

        this.setState({
            editable: !editable //첫번째는 false -> true
        });
        
       
    }

    render(){

        const css = {
            border: '1px solid black',
            padding: '8px',
            margin:'5px'
        };
        const { editable } = this.state;
        if(editable){
            console.log('수정모드');
            return(
                <div style={css}>
                    <div>수정모드</div>

                        
                            <div>
                                <input value={this.state.name} name="name" 
                                placeholder="이름을 입력하세요"
                                onChange={this.handleChange}/>
                            </div>
                            <div>
                                
                                <input value={this.state.phone} name="phone" 
                                placeholder="연락처를 입력하세요"
                                onChange={this.handleChange}/>
                            </div>
                            <button onClick={this.handleRemove}>삭제</button>
                            <button onClick={this.handleUpdate}>적용</button>
                       
                </div>
            )
        }
        else{
            console.log('일반모드(View)');
        }
        //const info=this.props.info;
        // <div><b>{info.name}</b></div>
        // <div><b>{info.phone}</b></div>

      

         const {id, name, phone}= this.props.info;
        

        return(
            <div style={css}>
                <div><b>{name}</b></div>
                <div><b>{phone}</b></div>
                <button onClick={this.handleRemove}>삭제</button>
                <button onClick={this.handleUpdate}>수정</button>
            </div>
        );
    }
}
export default PhoneItem
```



- phone_form

```js
import React, {Component} from 'react';
import Fragment from 'react';


class Phone_form extends Component{

    state = {
       
        name:'',
        phone:''
       
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
            name:'',
            phone:'',
            
        })
        
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <div>
            <input value={this.state.name} placeholder="이름을 입력하세요" onChange={this.handleChange} name='name'/>
            
            <input value={this.state.phone} placeholder="연락처를 입력하세요" onChange={this.handleChange} name='phone'/>
            <button type="submit" >등록</button>

            <div>{this.state.name}/{this.state.phone}</div>

            
            </div>
            </form>
        );
    }
}
export default Phone_form

```

