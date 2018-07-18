import TodoAction from "../actions/TodoAction";
let initialState={
    todo:[]
}
export default function TodoReducer(state=initialState,action)
{
    switch (action.type) {
        case TodoAction.ADD:
        console.log(action.payload)
          return Object.assign({}, state, {
            todo: [...state.todo, action.payload]
          });
          break;
        case TodoAction.DELETE:
        return Object.assign({}, state, {
            todo: state.todo.filter(value => value.key !== action.payload)
          });
    break;
    case TodoAction.UPDATE:
    let array = [...state.todo];
    array[action.payload.id].task=action.payload.inputValue
return Object.assign({},state,{todo:array})
break;
        default:
          return state;
        }
}