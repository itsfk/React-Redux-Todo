import React, { Component } from "react";
import TodoAction from "../actions/TodoAction";
import { connect } from "react-redux";
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: "",
      buttonName: "Add",
      buttonHandler: this.addHandler
    };
  }
  inputHandler = ev => {
    console.log("In input handler");
    this.setState({ taskInput: ev.target.value });
  };

  addHandler = () => {
    this.props.add({ task: this.state.taskInput });
    this.setState({ taskInput: "" });
  };
  updateHandler = key => {
    let index = this.props.taskArray.findIndex(element => element.key === key);
    this.setState({ buttonName: "Update", buttonHandler: () => {this.props.update(key,this.state.taskInput);this.afterUpdate()}, taskInput:   this.props.taskArray[index].task })

   
  }
  afterUpdate=()=>{
      this.setState({buttonName:"Add",buttonHandler:this.addHandler,taskInput:""})
}
  render() {
    console.log(this.props)
    return (

        <div>
            <input type="text" onChange={this.inputHandler} value={this.state.taskInput} />
            <input type="submit" onClick={this.state.buttonHandler} value={this.state.buttonName} />
            <ul>
                {this.props.taskArray.map(value => {
                    return <li id={value.key} >{value.task}<button onClick={()=>this.updateHandler(value.key)} >update</button> <button onClick={(e) => this.props.delete(value.key)} >delete</button></li>
                })}
            </ul>
        </div>
    );
}
}
const mapStateToProps = state => {
  console.log(state);
  return {
    taskArray: state.todo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add: value => dispatch(TodoAction.add(value)),
    delete: id => dispatch(TodoAction.delete(id)),
    update:(id,inputValue)=> dispatch(TodoAction.update(id,inputValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
