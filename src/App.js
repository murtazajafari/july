import {useReducer} from 'react'
import './App.css';

const todosArray = [
    {
        id: 1,
        title: 'Todo 1',
        complete: true,
    },
    {
        id: 2,
        title: 'Todo 2',
        complete: false,
    },
    {
        id: 3,
        title: 'Todo 3',
        complete: false,
    }
]


const reducer = (state, action) => {
    switch (action.type) {
        case "COMPLETE":
            return state.map((todo)=>{
                if(todo.id === action.id) {
                    return {...todo, complete: !todo.complete}
                } else {
                    return todo
                }
            })
    
        default:
            return state
    }

}
function App() {

    const [todos, dispatch] = useReducer(reducer, todosArray)
    
    const handleComplete = (todo) => {
        dispatch({type:"COMPLETE", id: todo.id})
    }

    return (
        <div className="App">

            {
                todos.map((todo) => (
                    <div key={todo.id}>
                        <label>
                            <input 
                                type="checkbox"
                                checked={todo.complete}
                                onChange={()=>{handleComplete(todo)}}
                            
                            />
                            {todo.title}
                        </label>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
