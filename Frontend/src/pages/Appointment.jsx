import React from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Appointement = () => {

  const {docID}= useParams()
  const {doctors}= useContext(AppContext)


  const fetchDocinfo=async()=>
  return (
    <div>Appointement</div>
  )
}

export default Appointement