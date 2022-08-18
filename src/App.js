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
                ...userInfos,
                ...randomData.results
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
            {
                userInfos && userInfos.map((userInfo, idx) => (
                    <div key={idx}>
                        <p>{getFullUserName(userInfo)}</p>
                        <img src={getUserPicture(userInfo)} alt="" />
                    </div>
                ))
            }

            {/* <pre>{userInfos}</pre> */}
            <pre>{randomDataJSON}</pre>
        </div>
    );
}

export default App;
