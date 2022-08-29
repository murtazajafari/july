import React from 'react'


export function Pageination(
    {
        userInfos, 
        setCurrentPage, 
        currentPage, 
        perPage
    }) {

    const pageSize = Math.ceil(userInfos.length / perPage);
    const prevPage = () => {
        return setCurrentPage(Math.max((currentPage - 1), 1))
    }
    const nextPage = () => {
        return setCurrentPage(Math.min((currentPage + 1), pageSize))
    }
    const jump = (page) => {
        return setCurrentPage(page)
    }

    const pages = (pageSize) => {
        const pages = []
        for (let pageNumber = 1; pageNumber <= pageSize; pageNumber++) {
            pages.push(<li className={pageNumber === currentPage && 'active'} key={pageNumber} onClick={() => jump(pageNumber)}>{pageNumber}</li>)
        }
        return pages
    }
    return (

        <div>
            <p>{currentPage} of {pageSize}</p>
            <div className='pagination'>
                <button onClick={prevPage} disabled={currentPage === 1 && 'disabled'}>Prev Page</button>
                <ul>
                    {pages(pageSize)}
                </ul>
                <button onClick={nextPage} disabled={currentPage === pageSize && 'disabled'}>Next Page</button>
            </div>
        </div>
        
    )
    
}

export default Pageination