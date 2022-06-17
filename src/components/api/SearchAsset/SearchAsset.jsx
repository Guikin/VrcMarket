import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'




export default function SearchAsset() {
  const navigate=useNavigate()
  const isInitialMount = useRef(true);

async function searchAsset({search}){
 
  const fetchResponse = await fetch('/asset/list/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            search
          })
        })
      if(fetchResponse.ok){
  const response = await fetchResponse.json()
  setAssetList(response)
  console.log(response)
  navigate('/listAsset',{state:{assetList}})
  return response
      }else{
          console.log('error')
      }
  }
  useEffect(()=>{
    // console.log(assetList)
  })

  const[search,setSearch]=useState()
  const[assetList,setAssetList]=useState()

  const submit = async event => {
    event.preventDefault()
    const result = await searchAsset({search})
    return result
  }


  
  return (

    <form className='' onSubmit={submit} >
              <input type='text'onChange={(e)=>setSearch(e.target.value)} onInput={submit} className='mx-5 w-100 form-control bg-dark text-light' placeholder="Search" name="search" value={search}></input>
              
          </form>
  )
}
