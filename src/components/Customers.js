import React, {useContext, useMemo} from 'react'
import {CustomerContext} from '../App'
import Customer from './Customer'

function Customers() {
    const MyContext = useContext(CustomerContext)
    const {userInfos, currentPage, perPage} = MyContext

    
    const currentTableData = useMemo(() => {
        const begin = (currentPage - 1) * perPage
        const end = begin + perPage
        return userInfos.slice(begin, end)
    } 
    , [currentPage])
    return currentTableData && currentTableData.map((userInfo, idx) => (
        <Customer key={idx} userInfo={userInfo} />
    )) 
        
    
}

export default Customers