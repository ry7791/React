### Flux

- MVC(Model, View, Controller)
- Model에서 Rendering을 위해 View로 데이터 전달
  - view에서 Model 데이터의 업데이트 발생
  - 의존성 문제로 인해 다른 Model 데이터 업데이트

- 문제점
  - 비동기적인 변경 요청에 대응하기 어려움
  - 하나의 변경이 다수의 변경을 발생할 수 있음
  - 데이터 흐름에 대한 Debug 어려움

- action creator
  - 모든 변경사항과 사용자와의 상호작용이 거쳐가야 하는 액션의 생성을 담당
  - 애플리케이션의 상태를 변경하거나 뷰를 업데이트하고 싶다면 액션을 생성해야만 한다.

- Dispatcher
  - action을 전달해야 하는 모든 store의 정보를 가지고 있음
  - action creator로부터 action이 전달되면 여러 store에게 action을 전달
  - 모든 store에게 전달
  - 동기적으로  실행
- Store
  - 애플리케이션 내의 모든 상태와 관련 로직을 가짐
  - 모든 변경사항은 스토어에 의해 결정
  - 스토어에 직접 변경 요청을 보낼 수 없으면 action creator -> distpatcher 과정으로만 전달
  - 모든 액션을 전달 받으며 
- contoller view
  - controller view는 store로부터 알림을 받고, 자신 아래의 view로 전달
  - view는 상태를 가져오고 사용자에게 보여주며, 입력 받을 화면을 렌더링 하는 역할

## Redux

-   리덕스 사용 기본 원칙 3가지

    - 전체 상탯값을 하나의 객체에 저장
    - 상탯값은 불변 객체다
    - 상탯값은 순수 함수에 의해서만 변경되어야 한다
-    [리덕스 관련 설명](https://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/) 에 자세한 설명 







### 예제

```
1. Reducer
- Biz logic (데이터 처리, 상태 처리)
- Root reducer에 Reducer를 추가
- src/reducers/reducer-books.js
- src/reducers/reducer-active-book.js
2. src/index.js
- reducer를 가지고 store 생성
- App.js 실행 시 store 지정
3. 사용자의 요청 작업 (이벤트 등)
- src/actions/index.js 등록 -> selectBook
- Action -> type(BOOK_SELECTED), payload (상태 값)
4. 사용자 View (or Container) component
- src/containers/book-list.js
- src/containers/book-detail.js
5. Component하고 Reducer(Store) 하고 연결
- mapStatetoProps(state)
- mapDispatchToProps(dispatch)
- connect() 함수 사용
  - ex1) connect(mapStateToProps, mapDispatchToProps)(BookList)
  - ex2) connect(mapStateToProps)(BookList)
```



- App.js

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './container/book-list';
import BookDetail from './container/book-detail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BookList/>
        <BookDetail/>   
      </header>
    </div>
  );
}

export default App;

```

- reducer-books.js

```js
export default function(){
    return [
        {title: 'Javascript', page:'101'},
        {title: 'Docker and Kubernetes', page:'202'},
        {title: 'Java programming',page:'303'},
        {title: 'Microservice Architecture',page:'1002'}
        //목록 반환 로직
    ]
}
```

- index.js

```js
// src/reducers/index.js -> Root reducer
import { combineReducers } from 'redux';
import BookReducer from './reducer-books';
import ActiveBook from './reducer-active-book';

const rootReducer = combineReducers({
    books: BookReducer,
    activeBook: ActiveBook,
});

export default rootReducer;
```

- reducer-active-book.js

```js
// src/reducers/reducer-active-book.js
export default function(state = null, action){ //es6
 switch(action.type){
    case 'BOOK_SELECTED':
         return action.payload;
    default:
        return state;
 }   
}

```

- book-list.js

```js
// src/containers/book-list.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from '../actions/index';

class BookList extends Component {
    renderList(){
        return this.props.books.map( book =>{
            return(
                <li key={book.title} onClick={()=>this.props.selectBook(book)}>{book.title}</li> // Booklist 배열 -> 반복처리
            )
        });
    }

    render() {
        return (
            <ul>
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return{
        books: state.books
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selectBook: selectBook}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BookList);


```

- book-detail.js

```js
// src/containers/book-detail.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
    render() {
        if(!this.props.book){
            return <div>Select a book to get started.</div>;
        }
        return (
            <div>
                <h3>DFdetails for:</h3>
                <div>Title: {this.props.book.title}</div>
                <div>Pages: {this.props.book.page}</div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        book: state.activeBook
    }
}
export default connect(mapStateToProps)(BookDetail);
```

- index.js

```js
// src/actions/index.js
export function selectBook(book){
    return{
        type: 'BOOK_SELECTED',
        payload: book
    }
}
```

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import { createStore} from 'redux';

import reducer from './reducers';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

