## 2월의 시험

### 차트 만들기

```javascript
<!DOCTYPE html>
<html>
<head> 
  <meta charset="UTF-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
  <!-- 차트 링크 --> 
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script> 
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> 
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

  <script>
    $(document).ready(function() {

        //시작날짜 옵션 지정
        //let start_year= document.getElementById("start_year");
        let start_date= document.getElementById("start_date");
        
        
        start_date.innerHTML='';
        for(let i=1;i<31;i++){
            start_date.innerHTML+= "<option value="+i+">"+i+"일</option>";

        }

        //종료날짜 옵션 지정
        let end_date= document.getElementById("end_date");
        
        end_date.innerHTML='';
        for(let i=1;i<32;i++){
            end_date.innerHTML+= "<option value="+i+">"+i+"일</option>";

        }





        $('#btnSubmit').on('click',function(){
            let start_month1 = $('#start_month > option:selected').val();
            let start_date1 = $('#start_date > option:selected').val();

            let end_month1 = $('#end_month > option:selected').val();
            let end_date1 = $('#end_date > option:selected').val();
            //console.log(start_month1+"/"+start_date1+"   "+end_month1+"/"+end_date1+"////////////////////////////");

        $.ajax({
                                url: "https://poloniex.com/public",
                                type: "GET",
                                data: {
                                    'command':"returnChartData",
                                    'currencyPair':"USDT_BTC",
                                    'start':"1577843804",
                                    'end':"9999999999",
                                    'period':"86400"
                                },
                                

                                success: function(data){  
                                    let dateArray = [];       
                                    let highArray = [];
                                    let lowArray = [];
                                    let searchArray=[];
                                    let data11=[];
                                    for(let i=0;i<data.length;i++){
                                        let timestamp = data[i].date*1000;
                                        var date = new Date(timestamp);
                                        
                                        dateArray.push(date.getMonth()+1+"/"+date.getDate());
                                        //console.log(dateArray[i]);
                                    }
                                    $('#contents').empty();
                                    //console.log(date.getMonth()+"///////////////////");
                                    for(let i=0;i<data.length;i++){
                                        let timestamp = data[i].date*1000;
                                        var date = new Date(timestamp);

                                        // if((date.getMonth()+1>=start_month1 && date.getMonth()+1<=end_month1)&&(date.getDate()>=start_date1 && date.getDate() <=end_date1)){
                                        // searchArray.push(date.getMonth()+1+"/"+date.getDate());
                                        // }
                                        let result =1 ;
                                        //시작날짜 조정
                                        if(date.getMonth()+1>=start_month1){
                                            if(date.getMonth()+1==start_month1&&date.getDate()<start_date1){
                                                result=0;
                                            }
                                        }
                                        else {result=0;}
                                        //종료날짜 조정
                                        if(date.getMonth()+1<=end_month1){
                                            if(date.getMonth()+1==end_month1&&date.getDate()>end_date1){
                                                result=0;
                                            }
                                        }
                                        else {result=0;}
                                        
                                        if(result==1){
                                            searchArray.push(date.getMonth()+1+"/"+date.getDate());


                                                    
                                                    
                                                    
                                                    
                                                    let _divhtml = date.getMonth()+1+"-"+date.getDate();
                                                    _divhtml += "<span style='color:red '>  최고가:"+data[i].high+"</span>";
                                                    _divhtml += "<span style='color:blue'>   최저가:"+data[i].low+"</span>";
                                                    _divhtml += "<span >   vloume:"+data[i].volume+"</span>";
                                                    

                                                    let infoSpan = document.createElement("span");
                                                    infoSpan.innerHTML = _divhtml;

                                                    data11[i] = document.createElement("h5");
                                                    data11[i].appendChild(infoSpan);

                                                    $('#contents').append(data11[i]);
                                                    
                                        }
                                    }
                                    
                                    
                                    for(let i=0;i<data.length;i++){
                                        
                                        
                                        highArray.push(data[i].high);
                                        console.log(highArray[i]);
                                    }
                                    
                                    for(let i=0;i<data.length;i++){
                                        
                                        
                                        lowArray.push(data[i].low);
                                        console.log(lowArray[i]);
                                    }
                                    // drawChart(lowArray,low);

      let ctx = document.getElementById('myChart').getContext('2d'); 
      let chart = new Chart(ctx, { 
        type: 'line', 
        data: { 
          labels: searchArray, 
          datasets: [{ 
            label: 'My First dataset', 
            backgroundColor: 'transparent', 
            borderColor: 'red', 
            data: highArray
          },
          {
            label: 'My First dataset', 
            backgroundColor: 'transparent', 
            borderColor: 'blue', 
            data: lowArray

          }] 
        }, 
        options: {
          legend: { 
            display: false 
          }
        } 
      }); 
      
        },
        error: function(data){
             console.log("ERROR:"+err);
                                }
        });                  
    });

    });
    // function drawChart(array,item){
    //     for(let i=0;i<data.length;i++){                                                        
    //         array.push(data[i].item);
    //         console.log(array[i]);
    //     }
    // }
  </script>
</head> 
<body> 
  <div class="container"> 
        <div> 시작날짜
           

            <select id="start_month">
                
                <option value=1>1월</option>
                <option value=2>2월</option>
                <option value=3>3월</option>
                <option value=4>4월</option>
                <option value=5>5월</option>
                <option value=6>6월</option>
                <option value=7>7월</option>
                <option value=8>8월</option>
                <option value=9>9월</option>
                <option value=10>10월</option>
                <option value=11>11월</option>
                <option value=12>12월</option>
            </select>
            <select id="start_date">
            
            </select>
        </div>
    <div> 종료날짜
            <select id="end_month">
            <option value=1>1월</option>
            <option value=2>2월</option>
            <option value=3>3월</option>
            <option value=4>4월</option>
            <option value=5>5월</option>
            <option value=6>6월</option>
            <option value=7>7월</option>
            <option value=8>8월</option>
            <option value=9>9월</option>
            <option value=10>10월</option>
            <option value=11>11월</option>
            <option value=12>12월</option>
        </select>
        <select id="end_date">
            
        </select>
        <button id="btnSubmit">검색</button>
    </div>
    

    <!-- <input type="text" name="start_month" placeholder="월"> 월</input>
    <input type="text" name="start_date" placeholder="일">일</input>
    <div>      종료날짜</div>
    <input type="text" name="end_month" placeholder="월"> 월</input>
    <input type="text" name="end_date" placeholder="일">일</input> -->
    
    <canvas id="myChart"></canvas> 
    <h1 id='contents' style='word-spacing:100px' > </h1>
  </div> 
</body>
</html>
```



### to-do App

- App.js

```js
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




```



- Todo_form.js

```js
import React, {Component} from 'react';
import Fragment from 'react';
import '../App.css';

class Todo_form extends Component{

    state = {
       
        todo:'',
       
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
            todo:''
            
        })
        
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="App-form">
            <div>
            <input size="100" text-align="center" value={this.state.todo} placeholder="오늘 할 일을 추가하세요" onChange={this.handleChange} name='todo'/>
            <button type="submit" >추가</button>

            <div>{this.state.todo}</div>

            
            </div>
            </form>
        );
    }
}
export default Todo_form

```



- Todo_item.js

```js
import React, {Component} from 'react';

class TodoItem extends Component{
    state = {
        editable: false,
        todo: '',
    }

    componentDidUpdate(preProps, prevState){   // 이 함수는 화면이 바뀔때만 호출됨
        const {info, onUpdate} = this.props;
        // console.log(info.name +"/" + info.phone);
        // console.log(onUpdate);
        // console.log(prevState.editable+ "/" + this.state.editable);
        if(!prevState.editable && this.state.editable){
            this.setState({
                todo: info.todo,
            })
        }
        //update
        if ( prevState.editable && !this.state.editable){
            onUpdate(info.id,{
                todo:this.state.todo,

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
            editable: !editable 
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
                                <input value={this.state.todo} name="todo" 
                                placeholder="이름을 입력하세요"
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
       

      

         const {id, todo}= this.props.info;
        

        return(
            <div style={css}>
                <div><b>{todo}</b></div>
                <button onClick={this.handleRemove}>삭제</button>
                {/* <button onClick={this.handleUpdate}>수정</button> */}
            </div>
        );
    }
}
export default TodoItem
```



- Todo_list.js

```js
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
```



- App.css

```css
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
.App-form{
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 10vh;
  font-size: calc(10px + 2vmin);

}
.App-title{
  background-color: black;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color:white;
  min-height: 20vh;
  font-size: calc(20px + 2vmin);
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



