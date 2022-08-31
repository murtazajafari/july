import { useState, useEffect, useLayoutEffect} from 'react';
import {useFetch} from './hooks/useFetch'
import {useMeasure} from './hooks/useMeasure'
import {usePosition} from './hooks/usePosition'
import { useRef } from 'react';

function App() {
    // const [count, setCount] = useState(() => localStorage.getItem("count") ? JSON.parse(localStorage.getItem("count")) : 1)
    // const {data, loading} = useFetch(`http://numbersapi.com/${count}/trivia`);

    // useEffect(() => {
    //     localStorage.setItem('count', JSON.stringify(count))
    // }, [count])

    // const divRef = useRef();
    // const rect = useMeasure(divRef, [data])

    // --------
    const [positions, myRef] = usePosition()


    const Position = (props) => {
        const position = props.position
        const style =  {
            position:'absolute',
            left: position.x+"px", 
            top: position.y+"px", 
            width: '20px', 
            height: '20px', 
            background:'red',
            borderRadius: '50px'
        }
        return (
            <div style={style}></div>
        )
    }
    

    return (
        <div ref={myRef} className="App" style={{padding: '30px'}}>
            {/* <div ref={divRef} style={{display:'inline-block'}}>
                <div>{!data ? 'loading...': data}</div>
            </div>
            <p>{count}</p>
            <button onClick={()=>setCount(c => c + 1)}>+</button>
            <pre>{JSON.stringify(rect, null,2)}</pre>
            */}

            {/* ------ */}

            <pre>{JSON.stringify(positions.map(position=> {
                return position
            }),null,2)}</pre>

            {
                positions && positions.map((position, idx)=> {
                    return (
                        <Position key={idx} position={position} />
                    )
                })  
            }
        </div>
    );
}

export default App;
