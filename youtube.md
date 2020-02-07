## 유튜브



- 시작

```shell
PS C:\Users\HPE\work\git\cloud-computing\06.React\day3> cd .\myYoutube\
PS C:\Users\HPE\work\git\cloud-computing\06.React\day3\myYoutube> npm install
added 382 packages from 386 contributors in 64.57s
PS C:\Users\HPE\work\git\cloud-computing\06.React\day3\myYoutube> npm start
```





- 유튜브 api 키 값 받아오기

https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=say1-bd16f

사용자 인증 정보 만들기로 키값 생성

```js
const API_KEY = '';
```



- shell 에다가 youtube-api-search 설치

```shell
PS C:\Users\HPE\work\git\cloud-computing\06.React\day3\myYoutube> npm install --save youtube-api-search
```



- index.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyD8xBO9Zdk-I297gRXHo3_xXlaFmFn6DJ0';

// YTSearch({key:API_KEY,term: 'surfboards'}, function(data){
//   console.log(data);
// });


class App extends Component{

  constructor(props){
    super(props); //부모의 생성자 함수를 호출 (Component)

        this.state = {
          videos:[],
          term:'',
          selectedVideo: null
        }    
    YTSearch({key:API_KEY,term:'lck'},(data)=>{
        this.setState({
          videos:data,
          selectedVideo: data[0]
        })
        console.log(data);
    });
   
  

  }

  handleSearch = (search)=>{
 
        this.setState({
          term: search
        })
   
        YTSearch({key:API_KEY,term:this.state.term},(data)=>{
              this.setState({
                videos:data
              })
          
              console.log(data);
        });
  }

 

  handleSelect = (selectedVideo) => {
    console.log("selectedVideo=" + selectedVideo);
    this.setState({
      selectedVideo: selectedVideo
    })
  }

  render(){
    
 
    return (
      
      <div>
       
        <SearchBar onSearch={this.handleSearch} name='term'/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={this.handleSelect} videos={this.state.videos} />
         {/* <VideoList onVideoSelect={selectedVideo=>this.setState({selectedVideo})} videos={this.state.videos} /> //함수안쓰고 바로 쓰는 방법   위에랑 같은 표현 */} 
        {/*<div>{this.state.videos}</div>*/}
      </div>
    )
  
  }
}
ReactDOM.render(<App/>,document.querySelector('.container'));
```



- style.css

```css
.search-bar {
    margin: 20px;
    text-align: center;
}

.search-bar input{
    width: 75%;
}
.video-item img{
    max-width: 64px;
}
.video-detail .details{
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}


.list-group-item{
    cursor: pointer;
}

.list-group-item:hover{
    background-color: #eee;
}
```



- search_bar.js

```js
import React, {Component} from 'react';


class SearchBar extends Component{

    constructor(props){
        super(props);

            this.state = {
            search : ''
        }    
    }

    handleSubmit=(e)=>{
        e.preventDefault();
       
        this.props.onSearch(this.state.search);
        
    }
   
    onInputChange = (event) =>{

         this.setState({
            [event.target.name] : event.target.value,
        
    })
    
}

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <div className='search-bar'>
            <input   onChange={this.onInputChange} name='search'/> 
            <button type="submit" >검색</button>
            <div>Value of the input: {this.state.search}</div>
            </div>
            
            </form>
        )
    }
}

//onChange={event =>console.log(event.target.value)}

export default SearchBar
```



- video_list.js

```js
import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) =>{
    const videoItems = props.videos.map((v)=>{
        return(
            <VideoListItem onVideoSelect={props.onVideoSelect} key={v.etag} video={v}/>
        )
    });

    return(
        <ul className="col-md-4 list-group">  
        {/* col-md-4 list-group 는 부트스트랩에 있는 스타일  */}
        {/* <li>비디오 개수 : {props.videos.length}</li> */}
        {videoItems}
        </ul>
    )
}
export default VideoList
```



- video_list_item.js

``` js
import React from 'react';

const VideoListItem = ({video, onVideoSelect}) =>{
    const imageUrl = video.snippet.thumbnails.default.url;
    console.log(imageUrl);
    return(
     <li onClick={()=>onVideoSelect(video)} className='list-group-item'>
         <div className='video-list media'>
             <div className='media-left'>
                 <img className='media-object' src={imageUrl}/>
                 
             </div>
             <div className='media-body'>
                <div className='media-heading'>
                 {video.snippet.title}
                </div>
            </div>
         </div>
         
     </li>
    )
}
export default VideoListItem
```



- video_detail.js

```js
import React from 'react';

const VideoDetail = ({video})=> {
    // const video = props.video;
    // const url = props.url;
    // const {video, url} = props;  // 위에 두줄보다 비구조가 편함 이거 쓰자
    if(!video){return <div>Loading ...</div>}

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    // const url = `https://www.youtube.com/embed/`+videoId;
    return(
        
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}/>
            </div>
           <div className="details">
               <div>{video.snippet.title}</div>
               <div>{video.snippet.description}</div>
           </div>
        </div>
       
    )

}

export default VideoDetail
```



### 검색시간 조절

- lodash

````shell
npm install --save lodash
````

