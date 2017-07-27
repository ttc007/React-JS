
function getname(name){
    alert(name);
    //  console.log( 11111 );
}

var PesonalInformation = React.createClass({
    show:function () {
        var str = this.refs.s1.value+"\n"+ this.refs.s2.value;
        alert(str);
    },
    addStudent:function () {
        this.state.tonghocvien=parseInt(this.state.tonghocvien)+1;
        this.setState(this.state);
    },
    getInitialState(){
        return { tonghocvien:this.props.tonghocvien }
    },
    render:function(){
        return(
            <div className="main">
                <h2>Name:{ this.props.name} - {this.props.old} Year old </h2>
                <p>{this.props.children}</p>
                <h3>So hoc vien:{this.state.tonghocvien}</h3>
                <h3>Company: Vooc Technolory</h3>
                <button onClick={()=>this.addStudent()}>Add student{this.state.tonghocvien}</button>
                <h3>Country</h3>
                <select ref="s1">
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="USA">USA</option>
                </select>
                <h3>Address</h3>
                <input type="text" ref="s2"/>
                <h2/>
                <button onClick={()=>this.show()}>Show</button>
                <Albull/>
            </div>
        );
    },

});
var list;
var Albull = React.createClass({
    getInitialState(){
        return {srcAlbull:"1"}
    },
    next:function() {
        if(this.state.srcAlbull==4)this.state.srcAlbull=1
        else
        this.state.srcAlbull=parseInt(this.state.srcAlbull)+1;
        this.setState(this.state);
    }
    ,
    back:function() {
        if(this.state.srcAlbull==1)this.state.srcAlbull=4
        else
        this.state.srcAlbull=parseInt(this.state.srcAlbull)-1;
        this.setState(this.state);
    }
    ,

    render:function(){
      return(
          <div>
              <img src={ "images/"+ this.state.srcAlbull + ".jpeg" } className='imgNB'/>
              <br/>
              <button onClick={this.back}>Back</button>
              <button onClick={this.next}>Next</button>
              <h2>Technology</h2>
          </div>
      );
    },
    componentDidMount(){
        setInterval(this.changeImg,1000);
    },
    changeImg:function(){
        this.state.srcAlbull=parseInt(this.state.srcAlbull)%4+1;
        this.setState(this.state);
    }
});

var InputTag = React.createClass({
    show(){
        var text=this.refs.text.value;
        alert(text);
        var text = this.refs.text.value;
        list.state.mang.push({text:text,srcHinh:"images/4.jpeg"});
        list.setState(this.state);
        ReactDOM.unmountComponentAtNode(document.getElementById("div-input"));
    },
    render(){
        return(
            <div>
                <input type='text' ref='text' />
                <button onClick={this.show}>Submit</button>
            </div>
        );
    }
});
var Note = React.createClass({
    getInitialState(){
        return {onEdit:false}
    },
    delete(){

    },
    edit(){
        this.state.onEdit=true;
        this.setState(this.state);
    },
    cancel(){
        this.state.onEdit=false;
        this.setState(this.state);
    },
    render(){
        if(this.state.onEdit){
            return(
                <div className='div-note'>
                    <img src={this.props.srcH} className='imgNB' />
                    <input defaultValue={this.props.children}/>
                    <button onClick={this.save}>Save</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            );
        }else{
            return(
            <div className='div-note'>
                <img src={this.props.srcH} className='imgNB' />
                <h1>{this.props.children}</h1>
                <button onClick={this.delete}>Delete</button>
                <button onClick={this.edit}>Edit</button>
            </div>
            );
        }
        
    },

});
var DivRight = React.createClass({
    getInitialState(){
        list = this;
        return {
            mang:[]
        }
    },
    add(){
        var text = this.refs.text.value;
        this.state.mang.push({text:text});
        this.setState(this.state);
    },
    addInput(){
        ReactDOM.render(
            <InputTag />,
            document.getElementById('div-input')
        );
    },
    render(){
        return(
            <div className='div-list'>
                <button onClick={this.addInput}>Add</button>
                {this.state.mang.map(function(note,index){
                    return <Note key={index} srcH={note.srcHinh}>{note.text}</Note>
                    
                })}
                <div id='div-input'></div>
            </div>
        );
    },
    componentDidMount(){
        $.get("/getNote",function(data){
            this.setState({mang:data});
        });
    }
});
ReactDOM.render(
  <div>
    <InputTag/>
    <DivRight/>
    <h1>Pesonal Information</h1>
    <PesonalInformation name="Cong Truong Thanh" old="19" tonghocvien="1">
        Profesional Developer!
    </PesonalInformation>
  </div>
  ,document.getElementById('example')
);
