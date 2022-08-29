import React from 'react'


const getFullUserName = (userInfo) => {
    const {first_name,last_name} = userInfo;
    return `${first_name} ${last_name}`
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


function Customer(props) {
    const userInfo = props.userInfo
  return (
    <tr>
        <td>{userInfo.id}</td>
        <td>{getFullUserName(userInfo)}</td>
        <td>{userInfo.email}</td>
        <td>{userInfo.phone}</td>
    </tr>
  )
}

export default Customer