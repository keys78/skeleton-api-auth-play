import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
         axios.get(url).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setData(res.data)
            } 
        }).catch((error) => { console.log(error) })

    }, [url])

    return {data, setData}
}

export default useAxios
