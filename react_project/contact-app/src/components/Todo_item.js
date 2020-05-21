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