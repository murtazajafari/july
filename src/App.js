import {useEffect, useState, useRef} from 'react'
import './App.css';
import axios from 'axios';


function App() {

    // const [from, setFrom] = useState();
    // const [to, setTo] = useState();
    // const [q, setQ] = useState();
    const [currency, setCurrency] = useState();

    // const inputHandler = (e) => {
    //     if(e.target.name === 'from') {
    //         setFrom(e.target.value)
    //     } else if(e.target.name === 'to') {
    //         setTo(e.target.value)
    //     } else if(e.target.name === 'q') {
    //         setQ(e.target.value)
    //     } else {
    //         return 
    //     }
    // }

    const refFrom =  useRef('0');
    const refTo =  useRef('0');
    const refQ =  useRef('0');

    useEffect(() => {
        axios.get('https://currency-exchange.p.rapidapi.com/exchange', 
            { 
                params: {
                    from: refFrom.current.value, 
                    to : refTo.current.value,
                    q: refQ.current.value 
                },
                headers: {
                    'X-RapidAPI-Key': '3e546240a6msh98a99a615f5e055p152e6bjsn22100f02406d',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
            }
        )
        .then((res)=> {
            console.log(res)

            setCurrency(res.data * refQ.current.value)

            
        })
        .catch((err)=> {
            console.error(err);
        });

    }, [currency])
    

    const inputHandler = (e) => {
        setCurrency(e.target.value)
    }

    
    return (
        <div className="App">
            

            <label>
                <span>From:</span>
                <input type="text" name='from' placeholder='AUD' ref={refFrom} />
            </label>
            <label>
                <span>To:</span>
                <input type="text" name='to' placeholder='PKR' ref={refTo} />
            </label>
            <label>
                <span>$:</span>
                <input type="text" name='q' onChange={(e) => inputHandler(e)} placeholder='23' ref={refQ} />
            </label>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{refFrom.current.value}</td>
                        <td>{refTo.current.value}</td>
                        <td>{currency}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
