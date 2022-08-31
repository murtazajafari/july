import {useState, useEffect, useRef} from 'react'

export const usePosition = positionRef => {
    const [positions, setPositions] = useState([{x: '0', y:'0'}])
    const myRef = useRef()
    useEffect(() => {
        if(myRef.current) {
            myRef.current.addEventListener('click', (e) => {
                setPositions(
                    positions => [...positions, {x:e.pageX - 10, y:e.pageY - 10}]
                )
                console.log(e)
            })
        }
    }, [positionRef])

    return [positions, myRef]
}
