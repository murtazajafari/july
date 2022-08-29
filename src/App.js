import {useState, useEffect,useMemo, createContext} from 'react'
import Customers from './components/Customers'
import Customer from './components/Customer'
import data from './data/data.json'
import Pagination from './components/Pagination'
import './App.css'

export const CustomerContext = createContext(null)

function App() {
    const [userInfos, setUserInfos] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('ASC');
    const [searched, setSearch] = useState('');
    
    
    useMemo(() => {
        setUserInfos(data)
    }, [])

    const sorting = (col) => {
        if(order === 'ASC') {
            const sorted = [...userInfos].sort((a, b)=> 
                isNaN(a[col]) ? a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 : a[col] > b[col] ? 1 : -1
            )
            setUserInfos(sorted)
            setOrder('DSC')
            console.log(sorted)
        }
        if(order === 'DSC') {
            const sorted = [...userInfos].sort((a, b) => 
                !isNaN(a[col]) ? a[col] < b[col] ? 1 : -1 : a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 
            )
            setUserInfos(sorted)
            setOrder('ASC')
            console.log(sorted)
        }
        setSort(col)
    }
    const filtering = (searched) => {
        setSearch(searched);
        const filtered = [...data].filter((item)=> {
            return item.first_name.toLowerCase().indexOf(searched.toLowerCase()) !== -1 ? item : ''
        })
        setUserInfos(filtered)
        console.log(filtered)
        
    }
    
    

    return (
        <div className="App" style={{padding: '30px'}}>
            <h1>Practicing with react API</h1>
            <p>{order}</p>
            <input type="text" value={searched} onChange={(e) => filtering(e.target.value)} />
            <input type="number" name='perppage' value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))} />
            <select name="perPage" id="perPage" value={sort} onChange={(e)=>sorting(e.target.value)}>
                <option value="id">ID</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
            </select>
            <table border={2} style={{borderCollapse: 'collapse',}}>
                <thead>
                    <tr>
                        <th onClick={()=>sorting('id')}>ID</th>
                        <th onClick={()=>sorting('first_name')}>Name</th>
                        <th onClick={()=>sorting('email')}>Email</th>
                        <th onClick={()=>sorting('phone')}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <CustomerContext.Provider value={{
                        userInfos, 
                        currentPage, 
                        perPage
                    }}>
                        <Customers />
                    </CustomerContext.Provider> */}

                    { userInfos && userInfos.map((userInfo, idx) => (
                        <Customer key={idx} userInfo={userInfo} />
                    )) }
                </tbody>
            </table>
        
            <Pagination 
                userInfos={userInfos}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
            />
            
            
        </div>
    );
}

export default App;
