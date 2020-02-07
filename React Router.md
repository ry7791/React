### React Router

- spa에서의 라우팅 문제를 해결하기 위해 사용되는 네비게이션 라이브러리
- 브라우저 내장 객체 사용
  - location
  - history
- React Router
  - web
  - Native
  - react-router-dom 라이브러리 필요



Native  : aos - java 코틀리    ios - objective-c, swift

Mobile-web : HTML5,javascript,css

Hybried-App : native의 대부분 기능 사용가능 + HTML5,javascript,css 사용가능



- Reactjs code snippets   - visual code 에서 설치
  - rsc , rcc 엔터 누르면 기본 구조 자동으로  만들어짐



 C:\Users\HPE\work\react\day4\react-router1> npm install --save react-router-dom



### Router Route 기본 예제

- App.js

```js
import React, { Component } from 'react'; 
import Header from './components/header';
import Page1 from './routes/page1';
import Page2 from './routes/page2';
import Page3 from './routes/page3';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        My Notes
        <Router>
             <Header/>
            <Route path="/my_note1" component={Page1}/>
            <Route path="/my_note2" component={Page2}/>
            <Route path="/my_note3" component={Page3}/>
        </Router>
      </div>
    );
  }
}

export default App;
```



- header.js

```js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <ul>
                <li><Link to ="/my_note1">My Page1</Link></li>
                <li><Link to ="/my_note2">My Page2</Link></li>
                <li><Link to ="/my_note3">My Page3</Link></li>
            </ul>
        </div>
    );
};

export default Header;

```



- page 1, 2, 3.js

```js
import React from 'react';

const Page1 = () => {
    return (
       <h1>Page1 입니다.</h1>
    );
};

export default Page1;



import React from 'react';

const Page2 = () => {
    return (
       <h1>Page2 입니다.</h1>
    );
};

export default Page2;




import React from 'react';

const Page3 = () => {
    return (
       <h1>Page3 입니다.</h1>
    );
};

export default Page3;
```

