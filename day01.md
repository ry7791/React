component : 일반적인 자바스크립트 파일
virtual dom : 내용이 변경되면 돔을 싹 다 바꾸는 것이 아니라 변경된 돔만 바꿈



- 설치 

node.js 설치 후

원하는 경로에 가서

 npx create-react-app my-app









### jsx 작성 규칙

- 하나의 root element를 가짐

- 모든 element는 closer 필요

- 각 태그는 두번  사용 할 수 없지만 태그 안에 태그를 넣을 순 있다.

  

- App.js

```js
import React, {Component} from 'react';
import {Fragment} from 'react';


class App extends Component {
  render() {
    return(
      <Fragment>
        <div>
        hello, React with class
      </div>
      <div>
        hello, React with class
      </div>
      </Fragment>
    );
  }
}

export default App;

```

 return 안에는 <div></div>  나 <p></p>하나로 전체 내용을 감싸줘야함  (하나의 root element를 가짐)

```js
 return(
    
        <div>
        hello, React with class
      </div>
      <div>
        hello, React with class
      </div>
 
    );
```

이런건 안됨 <div><p> 안쓸거면 <Fragment> 써주면 됨 (import 필요)







- App.css

```js
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```



- 클래스 적용

```js
import React, {Component} from 'react';
import {Fragment} from 'react';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className='App-link'>
        <div>
        hello, React with class
      </div>
      <div>
        hello, React with class
      </div>
      </div>
    );
  }
}

export default App;




```



- text

```js
import React, {Component} from 'react';
import {Fragment} from 'react';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className='App-header'>
              <div>
                hello, React with class
              </div>
              <div>
                hello, React with class
              </div>
      <input type="text"/>      //셀프 closer    모든 element는 closer 필요 
      </div>
    );
  }
}

export default App;

```



- 

```js
import React, {Component} from 'react';
import {Fragment} from 'react';
import './App.css';

class App extends Component {
  render() {
    const name = "uk";
    return(
      <div className='App-header'>
              <h1>
                Hello,{name}  //각 태그는 두번  사용 할 수 없지만 태그 안에 태그를 넣을 순 있다.
              </h1>
      <input type="text"></input>
      </div>
    );
  }
}

export default App;

```

- function()

```js
import React, {Component} from 'react';
import {Fragment} from 'react';
import './App.css';

class App extends Component {
  render() {
    const time = 21;
    const name = "uk";
    return(
      <div className='App-header'>
             {
               (function(){
                  if(time<12)return (<div>Good morning</div>);
                  if(time<18)return (<div>Good afternoon</div>);
                  if(time<22)return (<div>Good evening</div>);
               })()
             }
   
      </div>
    );
  }
}

export default App;

```



```js
import React, {Component} from 'react';
import {Fragment} from 'react';
import './App.css';

class App extends Component {
  render() {
    const name = 'React';
    const css = {
      color:'red',
      background:'black',
      padding:'20px',
      fontSize:'25px'
    };

    return(
      <div className='App-header'>
            <div style={css}>Hello, {name}</div>
   
      </div>
    );
  }
}

export default App;

```



### props

- 부모 컴포넌트가 자식 컴포넌트에게 전달하는 값
- 자식 컴포넌트에서는 props의 값을 수정할 수 없음
- props 값은 this. 키워드 이용하여 사용

### state

- 컴포넌트 내부에 선언하여 사용되는 보관용 데이터 값
- 동적인 데이터 처리





- MyIntro.js   => class 이용

```js
import React, {Component} from 'react';

class MyIntro extends Component{
    render(){
     
        return(
            <div>
                <div style={this.props.style}>
                    안녕하세요, 제 이름은 <b>{this.props.card.name}</b> 입니다.<br/>
                </div>
                    이메일은 <b>{this.props.card.email}</b> 입니다.<br/>
                <div style={this.props.style1}>전화번호는 <b>{this.props.card.phone}</b> 입니다.<br/>
                </div>
            </div>
        );
    }
}
export default MyIntro;
```

- MyIntro2.js

```js
import React from 'react';


const MyIntro2 = function({card}){
    return(
        < div >
            안녕하세요, 제 이름은 <b>
            {card.name},<br/>
            이메일은 {card.email},<br/>
            전화번호는 {card.phone}</b> 입니다.
        </div>
    )
}

export default MyIntro2
```



- App.js

```js
import React, {Component} from 'react';
import './App.css';
import MyIntro from './MyIntro';

class App extends Component{
  render(){
    const card={
      name : 'UK',
      email:'korea7791@naver.com',
      phone: '010-5093-6442'
    }
    const css={
      color:'red',
      background:'white'
    }
    const css1={
      color:'blue',
      background:'white'
    }
    return(
      <MyIntro style={css} style1={css1} card={card} />
    );
  }
}

export default App;
```





### React Counter button



- Counter.js

```js
import React, {Component} from 'react';

class Counter extends Component{
    state = {
        count: 100
    }
    handlePlus = () =>{
        this.setState({
            count: ++this.state.count
        });
    }
   
    handleMinus = () =>{
        this.setState({
            count: --this.state.count
        });
        
    }

    render(){

        return(

            <div>
                <h1>Counter</h1>
                <h2>{this.state.count}</h2>
                <button onClick={this.handlePlus}>+</button>
                <button onClick={this.handleMinus}>-</button>
            </div>

        );
    }
}

export default Counter;
```



- App.js

```js
import React, {Component} from 'react';
import './App.css';
import Counter from './Counter';

class App extends Component{
  render(){
    return(
      <Counter/>
    );
  }
}

export default App;
```





- 전개연산자 => ...

```js
import React, {Component} from 'react';

class Counter extends Component{
    state = {
        count: 100,
        info:{
            name: 'React',
            age : 27
        }
    }
    handlePlus = () =>{
        this.setState({
            count: ++this.state.count
        });
    }
   
    handleMinus = () =>{
        this.setState({
            count: --this.state.count
        });
        
    }

    handleChangeInfo = () =>{
        //this.state.info의 name을 변경
        this.setState({
            info:{
                ...this.state.info, //전개연산자를 안쓰면  info의 age값은 사라짐 나머지 속성을 유지하고 싶으면 전개연산자 쓰자
            name:'Uk'
             
            }
        });
        
        
    }


    render(){

        return(

            <div>
                <h1>Counter</h1>
                <h2>{this.state.count}</h2>
                <button onClick={this.handlePlus}>+</button>
                <button onClick={this.handleMinus}>-</button>
                <button onClick={this.handleChangeInfo}>Change info name</button>


                {this.state.info.name}/{this.state.info.age}
            </div>

        );
    }
}

export default Counter;
```



- 전개연산자

```js
const array = [1,2,3,4,5];
const newArray = [6,7,8,9,10];
newArray.push(array);

newArray
(6) [6, 7, 8, 9, 10, Array(5)]


// 전개 연산자를 사용했을 경우
const newArray2 = [6,7,8,9,10];
newArray2.push(...array);
10
newArray2
(10) [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]
```





### 생명주기 메소드

- Counter.js

```js
import React, {Component} from 'react';


const ErrorObject = () =>{
    
    throw (new Error('에러 발생'));
   
}

class Counter extends Component{
    state = {
        count: 0,
        error: false
    }

    // constructor(props){
    //     super(props);
    //     this.state.count = this.props.init; //
    //     console.log('call constructor');
    // }

    componentDidCatch(error, info){
        this.setState({
            error: true
        });
    }

    componentDidMount(){
        console.log('componentDidMount');
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        if(nextState.number % 5 === 0) return false;
        return true;


    }


    componentWillUpdate(nextProps, nextState){
        console.log("componentWillUpdate");
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate');
    }

    handlePlus = () =>{
        this.setState({
            count: ++this.state.count
        });
    }
   
    handleMinus = () =>{
        this.setState({
            count: --this.state.count
        });
        
    }

    handleChangeInfo = () =>{
        //this.state.info의 name을 변경
        this.setState({
            info:{
                ...this.state.info, //전개연산자를 안쓰면  info의 age값은 사라짐 나머지 속성을 유지하고 싶으면 전개연산자 쓰자
            name:'Uk'
             
            }
        });
        
        
    }


    render(){
        if(this.state.error) return (<h1>에러가 발생되었습니다.</h1>) ;

        return(


            <div>
                <h1>Counter</h1>
                <h2>{this.state.count}</h2>
                {this.state.count == 3 && <ErrorObject/>}
                <button onClick={this.handlePlus}>+</button>
                <button onClick={this.handleMinus}>-</button>
                <button onClick={this.handleChangeInfo}>Change info name</button>


             
            </div>

        );
    }
}

export default Counter;
```



- App.js

```js
import React, {Component} from 'react';
import './App.css';
import Counter from './Counter';

class App extends Component{
  render(){
    

    return(
      <Counter init="10"/> //초기값을 Counter component에 전달
    );
  }
}

export default App;



```

