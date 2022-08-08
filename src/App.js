import {useReducer, useState} from 'react'
import './App.css';

const todosArray = []

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: state.length + 1,
                title: action.title,
                status: 'todo'
            }]
        case "DOING":
            return state.map((todo)=>{
                if(todo.id == action.id) {
                    return {...todo, status: 'doing'}
                } else {
                    return todo
                }
            })
        case "DONE":
            return state.map((todo)=>{
                if(todo.id == action.id) {
                    return {...todo, status: 'done'}
                } else {
                    return todo
                }
            })
        default:
            return state
    }
}

function App() {

    const [inputValue, setInputValue] = useState();

    const [todos, dispatch] = useReducer(reducer, todosArray)

    const inputHandler = (e) => {
        setInputValue(e.target.value);
        
    }
    const addTodo = (e) => {
        e.preventDefault();
        dispatch({type: "ADD" , title: inputValue})

        // clear fields 
        document.querySelector("form").reset();
    }

    const markDoing = (todo) => {
        dispatch({type: "DOING" , id:todo.id})
    }

    const markDone = (todo) => {
        dispatch({type: "DONE" , id:todo.id})
    }

    return (
        <div className="App">

            <h3>Todo app</h3>
            <form onSubmit={(e)=> { addTodo(e)}}>
                <input type="text" onChange={(e) => {inputHandler(e)}}  />
            </form>
            <h3>Todo</h3>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    {
                        todos.map((todo) => {
                            if(todo.status=="todo"){
                                return (
                                    <tr key={todo.id} draggable="true">
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td><button onClick={()=>markDoing(todo)}>Mark Doing</button></td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>

            <h3>Doing</h3>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    {
                        todos.map((todo) => {
                            if(todo.status=="doing"){
                                return (
                                    <tr key={todo.id} draggable="true">
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td><button onClick={()=>markDone(todo)}>Mark Done</button></td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>

            <h3>Done</h3>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    {
                        todos.map((todo) => {
                            if(todo.status=="done"){
                                return (
                                    <tr key={todo.id} draggable="true">
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td>Completed</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            
        </div>
    );
}

export default App;
