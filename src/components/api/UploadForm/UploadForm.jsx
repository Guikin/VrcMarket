import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import axios from 'axios'
import UploadAsset from '../UploadAsset/UploadAsset'


export default function UploadForm(props) {
const navigate = useNavigate()





async function handleClick({name,user,author}){

const fetchResponse = await fetch('/asset/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, 
          user: user,
          author:author
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
    const result = await handleClick({name, user:props.user._id, author:props.user.name })
    return result
  }

  return (
    <div className='page'>
      <div className='bg-dark w-25 px-5 mx-auto rounded-3'>
        <h3 className='p-4'>Upload an Asset</h3>
        <form className='form-group' onSubmit={submit}>

  
        <input onChange={(e)=>setName(e.target.value)} type="text" className='form-control bg-dark text-light' value={name} required placeholder="Asset Name"></input>
        <br/>
        <button className='btn btn-success'>Create</button>
        </form>
        <iframe src='https://my.spline.design/shapesanimationcopy-cbdfeb528ef01e077fce4be8b4a708c5/' frameborder='0' width='100%' height='450px'></iframe> 
        <p>{ name }</p>
        </div>
        
        
        </div>
  )
  
}

