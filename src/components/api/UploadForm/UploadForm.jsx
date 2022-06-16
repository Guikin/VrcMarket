import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import axios from 'axios'
import UploadAsset from '../UploadAsset/UploadAsset'


export default function UploadForm(props) {
const navigate = useNavigate()





async function handleClick({name,user}){

const fetchResponse = await fetch('/asset/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, 
          user: user 
        })
      })
    if(fetchResponse.ok){
const response = await fetchResponse.json()
setAssettoState(response)
return response
    }else{
        console.log('error')
    }
}

function setAssettoState(response){
    setAsset(response)
} 

useEffect(()=>{
    if(asset){
        navigate('/photo',{state:{user:props.user,asset:asset}})
    }
})


const [asset, setAsset] = useState()
const [name, setName] = useState('')


const submit = async event => {
    event.preventDefault()
    const result = await handleClick({name, user:props.user._id })
    return result
  }

  return (
    <div className='page'>
        <p>UserProfile</p>
        <form onSubmit={submit}>

        <label>Name
        <input onChange={(e)=>setName(e.target.value)} type="text" value={name} required></input></label>
        <br/>
        <button>Create</button>
        </form>
        <p>{ name }</p>

        
        
        </div>
  )
  
}

