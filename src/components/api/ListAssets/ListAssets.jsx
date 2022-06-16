import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function ListAssets() {
    let location = useLocation()
    let navigate = useNavigate()
    const isInitialMount = useRef(true);
  
    useEffect(()=>{
        if(location.state.assetList){
        setlistAsset(location.state.assetList)
        }
    },[location.state.assetList])

    const [listAsset,setlistAsset]=useState()  
    
    
    function goToAsset(e){
        if(listAsset){
        let assetKey=e.parentElement.parentElement.id
        navigate('/display',{state:{asset:assetKey}})
        }
    }

    function displayAssetList(){
    if(listAsset){
    return listAsset.map(asset=>
        
    <div className="card bg-dark m-4 border-secondary" id={asset._id} 

    // onClick={(e)=>goToAsset(e.target)} 

    style={{width:25+"rem"}}>
        <Carousel>
        {asset.Pictures.map(image=>
            <Carousel.Item >
            <img 
              style={{Width:'auto',height:300+"px"}}
              key ={image}
              className="m-auto"
              src={`s3/images/${image}`}
              alt="Pictures"
            />
          </Carousel.Item>
        )}
        </Carousel>
  <img className="card-img-top" src="" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{asset.name}</h5>
    <p className="card-text">{asset.description}</p>
    <button onClick={(e)=>goToAsset(e.target)}>View </button>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
  </div>)
    
    }else{
        return <p>none</p>
    }
}
  return (
    
    <div className='page'>ListAssets
    <div className='d-flex w-75 m-auto flex-wrap justify-content-center'>
    {displayAssetList()}
    </div>
    

    {/* <ul> 
              {assetData.map(asset => (
              <li key={asset.eTag}><button onClick={()=>downLoadAsset(asset.key)}>{asset.key}</button></li>
                ))}</ul>  */}
    </div>
    
  )
}
