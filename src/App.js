import {useEffect, useState, useRef} from 'react'
import axios from 'axios';



const fetchAPI = (nextPageNumber) => {
    return axios
        .get(`https://randomuser.me/api/?page=${nextPageNumber}`)
        .then(({data}) => {
            return data
        })
        .catch((err) => {
            console.error(err)
        })
}

const getFullUserName = (userInfo) => {
    const {name : {first,last}} = userInfo;
    return `${first} ${last}`
}
const getUserPicture = (userInfo) => {
    const {picture : {large}} = userInfo;
    return `${large}`
}
const getUserAddress = (userInfo) => {
    const {location : 
        {
            street : {
                number,name
            },
            city,
            state,
            postcode,
            country
        }
    } = userInfo;
    
    return `${number} ${name} ${city} ${postcode} ${state} ${country}`
}
const getUserDOB = (userInfo) => {
    const {dob : {date}} = userInfo;
    return `${new Date(date).getDay()}-${new Date(date).getMonth()}-${new Date(date).getFullYear()}`
}


function App() {
    const [counter, setCounter] = useState(0);
    const [randomDataJSON, setRandomDataJSON] = useState('');
    const [userInfos, setUserInfos] = useState('');
    const [nextPageNumber, setNextPageNumber] = useState(1);

    // const fetchNextUser = useRef(()=>{});
    
    const fetchNextUser = () => {

        fetchAPI(nextPageNumber).then((randomData)=>{
            setRandomDataJSON(JSON.stringify(randomData, null, 2) || 'Not data found')
            if(randomData === undefined) return
            const newUserInfo = [
                // can exchange the order 
                ...randomData.results,
                ...userInfos
            ]
            setUserInfos(newUserInfo)
            setNextPageNumber(randomData.info.page + 1)
        });
    }

    useEffect(() => {
        fetchNextUser()
    }, [])
    

    return (
        <div className="App" style={{padding: '30px'}}>
            <h1>Practicing with react API</h1>
            <p>{counter}</p>
            <button onClick={() => {setCounter(counter + 1)}}>Increase</button>
            <button onClick={fetchNextUser}>Fetch Next user</button>

            <table border={2} style={{borderCollapse: 'collapse',}}>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Nat</th>
                        <th>Address</th>
                        <th>DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfos && userInfos.map((userInfo, idx) => (

                            <tr key={idx}>
                                <td><img src={getUserPicture(userInfo)} alt="" /></td>
                                <td>{getFullUserName(userInfo)}</td>
                                <td>{userInfo.email}</td>
                                <td>{userInfo.phone}</td>
                                <td>{userInfo.gender}</td>
                                <td>{userInfo.nat}</td>
                                <td>{getUserAddress(userInfo)}</td>
                                <td>{getUserDOB(userInfo)}</td>
                            </tr>
                                
                        ))
                    }
                </tbody>
            </table>
            

            {/* <pre>{userInfos}</pre> */}
            <pre>{randomDataJSON}</pre>
        </div>
    );
}

export default App;
