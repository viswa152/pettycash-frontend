import React from 'react'
import {useNavigate} from 'react-router-dom'
const PageNotFound = () => {
    const navigate=useNavigate()
  return (
    <div><img src="https://www.zazzlemedia.co.uk/wp-content/uploads/2016/05/Animation-3.gif" alt="pagenotfound" width="60%" height="50%" onClick={()=>navigate('/')}/></div>
  )
}

export default PageNotFound