import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';


function App() {
    const [city, setCity] = useState('Auburn NSW');
    const [suggestions, setSuggestion] = useState();

    const inputHandler = (e) => {
        setCity(e.target.value)
    }

    useEffect(() => {
        axios.get('https://hotels4.p.rapidapi.com/locations/v2/search', 
            { 
                params: {
                    query: city, 
                    currency: 'AUD' 
                },
                headers: {
                    'X-RapidAPI-Key': '3e546240a6msh98a99a615f5e055p152e6bjsn22100f02406d',
                    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                }
            }
        )
        .then((res)=> {
            setTimeout(() => {
                console.log(res.data.suggestions)
                setSuggestion(res.data.suggestions)
            }, 100);
        })
        .catch((err)=> {
            console.error(err);
        });

    }, [city])
    

    
    return (
        <div className="App">
            

            <label>
                <span>Enter city name: </span>
                <input type="text" placeholder='Auburn' value={city} onChange={(e) => inputHandler(e)} />
            </label>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestions && suggestions.map((suggestion) => {
                        return (
                            <tr>
                                <td>{suggestion.group}</td>
                                {
                                    suggestion && suggestion.entities.map((entity) => {
                                        return (
                                            <tr>
                                                <td>{entity.name}</td>
                                                <td>{entity.type}</td>
                                                <td>{entity.latitude}</td>
                                                <td>{entity.longitude}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <br />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
