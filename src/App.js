import {useReducer} from 'react'
import './App.css';


const reducer = (state,action) => {
    switch (action.type) {
        case "INCREMENT":
            return {count: state.count + 1, showtext: state.showtext}
        case "TOGGLETEXT":
            return {count: state.count, showtext: !state.showtext}
        default:
            return {count: state.count, showtext: state.showtext}
    }
}
function App() {
    
    const [state, dispatch] = useReducer(
        reducer,
        {
            count: 0,
            showtext: true
        }
    
    )

    return (
        <div className="App">

            <h2>{state.count}</h2>

            <button onClick={()=> {
                dispatch({type: "INCREMENT"})
                // dispatch({type: "TOGGLETEXT"})
            }}>Increase</button>
            

            <p>{state.showtext ? 'True' : 'False'}</p>
        </div>
    );
}

export default App;
