

weather 폴더에

npm install --save redux react-redux redux-promise axios react-sparklines lodash



### Provider

>Provider는 어렵게 생각할거 없이 단순한 하나의 컴포넌트이다. react로 작성된 컴포넌트들을 Provider안에 넣으면 하위 컴포넌트들이 Provider를 통해 redux store에 접근이 가능해진다.

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore,  applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';

import App from './App';

import reducers from './reducers';

// make a store 
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore); //리덕스 작업의 시작
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));

```



- App.js

```js
import React, { Component } from 'react';
import './App.css';

import SearchBar from './containers/search_bar';
import CoinList from './containers/coin_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <CoinList/>
      </div>
    );
  }
}

```



- ./action/index.js

```js
import axios from 'axios';

const ROOT_URL1 = `https://poloniex.com/public?command=returnChartData&`
const ROOT_URL2 = `&start=1581033600&end=9999999999&period=86400`

// https://poloniex.com/public?command=returnChartData& currencyPair=USDT_BTC &start=1577843804&end=9999999999&period=86400


export const FETCH_COIN = 'FETCH_COIN';
/* const 상수를 쓰면 메모리 할당이 효율적이여서 속도면에서 좋다*/

/*  ` 마크를 쓰면 ${API_KEY} 같은 변수를 쓸 수 있음 */

// redux action
// type (mandatory)
// payload (optional, data)?

// 리덕스 특징이 변경사항이 들어오면 모든 스토어한테 다 뿌림 따라서 
// 타입을 써놓지 않으면 연결되어 있지 않은 다른 스토어도 다 데이터 뿌려짐
// 그래서 type (mandatory) 이렇게 mandatory타입 스토어에게만 전달하자

export async function fetchCoin(coin) {
    const url = `${ROOT_URL1}&currencyPair=${coin}${ROOT_URL2}`
  
    const request = await axios.get(url);

    return {
        type: FETCH_COIN,
        payload: request,
        name : coin
    }
}
```



### mapDispatchToProps

>mapDispatchToProps는 connect함수의 두번째 인자로 사용된다.
>이것은 기본적으로 store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해
>dispatch를 사용할수 있게 만들어준다.



- ./containers/search_bar.js

```js
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchCoin } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
   
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchCoin(this.state.term);
    this.setState({ term: ''});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input 
          placeholder="암호 화폐 종류를 입력하시오"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}/>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

// mapDispatchToProps function //함수를 연결할때 씀
function mapDispatchToProps(dispatch){
  return bindActionCreators( {fetchCoin}, dispatch);
}


// connect mapping
// 첫번째 매개변수가 mapStateToprops와 연결되어야 하는데 없으니깐 null로 해줌
export default connect(null, mapDispatchToProps)(SearchBar);
```



- reducer_coin.js

```js
// biz logic
// src/reducers/reducer_weather.js
// 이름 안 써주면 파일명 자체가 이름이 됨
// action.type, action.payload(weather.json)
import  { FETCH_COIN} from "../actions";
export default function(state = [], action) {
    switch(action.type){
        case FETCH_COIN:
            // return state.push(action.payload.data); => 자바스크립트 방식
            // return state.concat(action.payload.data); => 리덕스에서는 이렇게 but 아래 거 쓸 거임
            // 전개연산자 쓰면 [SEOUL, TOKYO, NEWYORK]
            // 전개연산자 안쓰면 [SEOUL, [TOKYO, NEWYORK]]
            return [{name:action.name, data: action.payload}, ...state] 
            //
        default:
            return state;
    }
}
```



- ./reducers/index.js

```js
import { combineReducers } from 'redux';
import CoinReducer from './reducer_coin';

const rootReducer = combineReducers({
    coin: CoinReducer
});

export default rootReducer;

```



- ./containers/coin_list.js

```js
//날씨 데이터가 들어오면 풀어서 알기 쉽게 만들어줄거
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';

class CoinList extends Component {
 
  renderCoin(coinData){
    // console.log()
    const weightedAverage = coinData.data.data.map(coin => coin.weightedAverage);
    const name =coinData.name;
    
    return(
      <tr key={coinData.key}>
        <td>{name}</td>
            <td><Chart data={weightedAverage} color="orange"/></td>
      </tr>
    )
  }
  render() {
    console.log(this.props.coin)
    return (
      
      <table className="">
        <thead>
          <tr>
            <td>coin</td>
            <td>weightedAverage</td>
          </tr>
        </thead>
        <tbody>
          {this.props.coin.map(this.renderCoin)}
        </tbody>
      </table>
    );
  }
}

// mapSrtateToProps funciton
function mapStateToProps(state){
  //return { coin: state.coin };
  return {coin:state.coin };
}

// connect mapping
export default connect(mapStateToProps)(CoinList);


```



- components./chart.js

```js
import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { SparklinesReferenceLine } from 'react-sparklines';

export default (props) => {
  return (
    <div>
      <Sparklines width={120} height={180} data={props.data}>
        <SparklinesLine color={props.color}/>
        <SparklinesReferenceLine type="avg"/>
      </Sparklines>
    </div>
  );
};
```



