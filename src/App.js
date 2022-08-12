import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';


function App() {

    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [q, setQ] = useState();
    const [currency, setCurrency] = useState();

    const inputHandler = (e) => {
        if(e.target.name === 'from') {
            setFrom(e.target.value)
        } else if(e.target.name === 'to') {
            setTo(e.target.value)
        } else if(e.target.name === 'q') {
            setQ(e.target.value)
        } else {
            return 
        }
    }

    useEffect(() => {
        axios.get('https://currency-exchange.p.rapidapi.com/exchange', 
            { 
                params: {
                    from, 
                    to,
                    q 
                },
                headers: {
                    'X-RapidAPI-Key': '3e546240a6msh98a99a615f5e055p152e6bjsn22100f02406d',
                    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                }
            }
        )
        .then((res)=> {
            console.log(res)

            setCurrency(res.data * q)

            
        })
        .catch((err)=> {
            console.error(err);
        });

    }, [q])
    

    
    return (
        <div className="App">
            

            <label>
                <span>From:</span>
                <input type="text" name='from' placeholder='AUD' value={from} onChange={(e) => inputHandler(e)} />
            </label>
            <label>
                <span>To:</span>
                <input type="text" name='to' placeholder='PKR' value={to} onChange={(e) => inputHandler(e)} />
            </label>
            <label>
                <span>$:</span>
                <input type="text" name='q' placeholder='$' value={q} onChange={(e) => inputHandler(e)} />
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
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>{currency}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
