import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'



export default function UserProfile2(props) {

  const navigate = useNavigate()

  async function getMyAssets(user){
    console.log(user)
    const fetchResponse = await fetch('/asset/list/mine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user
      })
    })
  if(fetchResponse.ok){
const response = await fetchResponse.json()
setAssets(response)
return response
  }
}

async function deleteAsset(assetKey){
  console.log(assetKey)
  const fetchResponse = await fetch('/asset/delete/mine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      assetKey
    })
  })
if(fetchResponse.ok){
const response = await fetchResponse.json()

return response
}
}

  useEffect(()=>{
    if(!currentUser){
      setCurrentUser(props.user)
    }
    if(!assets && currentUser){
      getMyAssets(props.user._id)
    }console.log(assets)
    
  })

  function goToAsset(e){
    if(assets){
    let assetKey=e.parentElement.parentElement.id
    navigate('/display',{state:{asset:assetKey}})
    }
  }

function goToUpdate(e){
  if(assets){
  let assetKey=e.parentElement.parentElement.id
  navigate('/display',{state:{asset:assetKey}})
  }
}

async function goToDelete(e){
  let assetKey=e.parentElement.parentElement.id
  console.log(assets)
  await deleteAsset(assetKey)
  let assetArray=assets
  let assetIndex=assetArray.findIndex(e => e._id === assetKey)
  assetArray.splice(assetIndex,1)
  setAssets(assetArray)
}

  function displayAssetList(){
    if(assets){
      if(assets.length>0){
    return assets.map(asset=>
        
    <div className=" fade-in card bg-dark m-4 rounded" id={asset._id} 
    style={{width:20+"rem",textAlign:'left'}}>
        <Carousel>
        {asset.Pictures.map(image=>
            <Carousel.Item >
            <img 
              style={{width:100+"%",height:250+"px"}}
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

    
    <button className="btn btn-light mx-2" onClick={(e)=>goToAsset(e.target)}>View </button>
    <button className="btn btn-outline-warning mx-4"onClick={(e)=>goToUpdate(e.target)}>Edit </button>
    <button className="btn btn-outline-danger mx-2"onClick={(e)=>goToDelete(e.target)}>Delete </button>
  
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
  </div>)
  }else{
    return <h4 className='m-5'>No Assets Uploaded</h4>}
    }
}

  const[currentUser ,setCurrentUser]=useState()
  const[assets,setAssets]=useState()
  return (
     <div className='page'>
      <div>
        <div className=' fade-in d-flex profilebg justify-content-between w-100 m-auto'>
          <div className='w-5 m-auto'>
      <h1 style={{textAlign:'left'}} className='w '>{props.user.name} Profile </h1></div>
      <div className='w-5 m-auto'>
    <Link to ="/uploadForm"><button className='btn btn-light'>Upload</button></Link></div>
    </div>
    </div>
    <h3 style={{textAlign:'left'}} className=" fade-in w-50 m-auto mt-5 mb-3">My Uploads</h3>
    <hr className=' border border-secondary w-75 m-auto'/>
    <div className='fade-in d-flex w-75 m-auto flex-wrap justify-content-center'>

      {displayAssetList()}
    </div>
    </div>
  )
}
