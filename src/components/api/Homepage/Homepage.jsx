import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
let navigate=useNavigate()
  async function getAssetsByDate(){
    const fetchResponse = await fetch('/asset/getByDate', {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
      })
    if(fetchResponse.ok){
const response = await fetchResponse.json()
setAssets(response)
return response
    }else{
        console.log('error')
    }
}


  useEffect(()=>{
    if(!assets){
    getAssetsByDate()
  }
  console.log(assets)
  })

  function goToAsset(e){
    if(assets){
    let assetKey=e.parentElement.parentElement.id
    navigate('/display',{state:{asset:assetKey}})
    }
  }


  function displayAssetList(){
    if(assets){
    return assets.map(asset=>
        
    <div className="card bg-dark m-4 rounded" id={asset._id} 
    style={{minWidth:300+"px",textAlign:'left'}}>
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

    </div>
  </div>)
    }
  }


  const[assets,setAssets]=useState()

  return (
    <div className='page'>
        <div className='d-flex w-75 m-auto my-5 align-items-center'>
        {/* <iframe src='https://my.spline.design/shapesanimationcopy-cbdfeb528ef01e077fce4be8b4a708c5/' frameborder='0' width='50%' height='500px'></iframe> */}
        <iframe src='https://my.spline.design/girlgumbubblecopy-8402ff9b123d042e34139e05fd706761/' frameborder='0' width='100%' height='500px'></iframe>
        <div>
        <h2 className='w-50 m-auto'>Bucket is a free platform for sharing assets and files with anybody and Everybody
        </h2>
        <img  class='m-5'src="https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-48.gif" style={{borderRadius:30+"px",}}></img>
        </div>
        </div>
        
        <h3 style={{textAlign:'left'}} className="w-75 m-auto">Latest Uploads</h3>
        <div className='d-flex m-auto w-75 overflow-scroll flex-nowrap'>
          {displayAssetList()}
        </div>
        

        </div>

  )
}
