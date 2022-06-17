import { getSuggestedQuery } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


export default function ListAssets() {
    let location = useLocation()
    let navigate = useNavigate()
    const isInitialMount = useRef(true);

async function getAuthorFromDb(authorId){
    const fetchResponse = await fetch('/asset/getAuthor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId
        })
      })
    if(fetchResponse.ok){
const response = await fetchResponse.json()
setAuthors([response.name,...authors])
return response
    }else{
        console.log('error')
    }
}
  
    useEffect(()=>{
        if(location.state.assetList){
        setlistAsset(location.state.assetList)
        }
    },[location.state.assetList])

    const [listAsset,setlistAsset]=useState() 
    const [authors,setAuthors]=useState([]) 
    
    
    function goToAsset(e){
        if(listAsset){
        let assetKey=e.parentElement.parentElement.id
        navigate('/display',{state:{asset:assetKey}})
        }
    }

    // async function getAuthor(authorId){
    //     console.log(authors.length)
    //     let author=''
    //     if(listAsset.length !== authors.length){
    //      author = await getAuthorFromDb(authorId)
    //     }
    //     return author.name
    // }
    //

    function displayAssetList(){
    if(listAsset){
    return listAsset.map(asset=>
        
    <div className=" fade-in card bg-dark m-4 rounded" id={asset._id} 
    style={{width:25+"rem",height:35+'rem',textAlign:'left'}}>
        <Carousel>
        {asset.Pictures.map(image=>
            <Carousel.Item >
            <img 
              style={{width:100+"%",height:350+"px"}}
              key ={image}
              className="m-auto rounded"
              src={`s3/images/${image}`}
              alt="Pictures"
            />
          </Carousel.Item>
        )}
        </Carousel>
  
  <div className="card-body">
    <div className='d-flex justify-content-between align-items-center'>
        <h5 className="card-title">{asset.name}</h5>
         <p className="border border-secondary p-2 rounded">Free</p>
    </div>
    <div className='d-flex justify-content-between'>
        <p>{asset.AuthorName}</p>
    <div className="d-flex ">
            <p className='mx-2'> ♥ {asset.Downloads}</p>
            <p className='mx-2'> ⭐ {asset.Rating} </p>
            </div>
    </div>
    
    <button className="btn btn-outline-light" onClick={(e)=>goToAsset(e.target)}>View </button>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
  </div>)
    
    }else{
        return <p>none</p>
    }
}
  return (
    
    <div className='page'>
    <div className='d-flex w-75 h-100 m-auto flex-wrap justify-content-center overflow-auto'>
    {displayAssetList()}
    </div>

    {/* <ul> 
              {assetData.map(asset => (
              <li key={asset.eTag}><button onClick={()=>downLoadAsset(asset.key)}>{asset.key}</button></li>
                ))}</ul>  */}
    </div>

  )
}
