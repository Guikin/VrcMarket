import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Carousel } from 'react-bootstrap';
import axios from 'axios'


import "./DisplayAsset.css"


export default function DisplayAsset() {
    const location = useLocation()

    async function downLoadAsset({key,ETag}){
        console.log('etag is',ETag)
        const url = await axios.get(`/s3/get-object-url/${key}/${ETag}` )

        window.open(url.data,'_blank');
      }

    async function getActualAsset() {
          const fetchResponse = await fetch('/asset/listone/'+location.state.asset,{
            method: 'GET',
          })
          const response = await fetchResponse.json()          
          setUpState(response)
          return response
        }
    async function sendDownload(){
        const fetchResponse = await fetch('/asset/listone/'+location.state.asset,{
            method: 'GET',
          })
    }
    async function getAuthor(assetAuthor){

    }

    useEffect(()=>{
        setUser(location.state.user._id)
        setAssetKey(location.state.asset)
        if(!assetName){
        getActualAsset()
    } console.log(assetAuthor)
        },)
        
        function setUpState(response){
          setAssetname(response.name)
          setAssetAwsKey(response.AWSkey)
          setAssetAwsETag(response.AWSEtag)
          setAuthor(response.user)
          setAssetCode(response.code)
          setAssetcodeLock(response.codeLock)
          setAssetRating(response.Rating)
          setAssetDescription(response.description)
          setAssetTags(response.tags)
          setAssetPictures(response.Pictures)
          setAssetDownloads(response.Downloads)
         }

  const [user,setUser]=useState()
  const [assetKey, setAssetKey]=useState()
  const [assetName, setAssetname]=useState()
  const [assetAuthor, setAuthor]=useState()
  const [pictures, setAssetPictures]=useState()
  const [codeLock, setAssetcodeLock]=useState()
  const [assetCode, setAssetCode]=useState()
  const [assetDescription, setAssetDescription]=useState()
  const [assetTags,setAssetTags]=useState()
  const [assetRatine,setAssetRating]=useState()
  const [assetDownloads,setAssetDownloads]=useState()
  const [AwsKey, setAssetAwsKey ]=useState()
  const [AwsTag, setAssetAwsETag]=useState()
  
  async function download(){
    // await downLoadAsset({key:AwsKey,ETag:AwsTag})
    let newdownload = assetDownloads +1
    setAssetDownloads(newdownload)
    sendDownload()
  }

  function showPics(){
    if(pictures){
    if(pictures.length>0){
    return pictures.map(image=>
      <Carousel.Item >
        
        <img 
          style={{maxWidth:1200+"px",height:400+"px"}}
          key ={image}
          className="m-auto"
          src={`s3/images/${image}`}
          alt="Pictures"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      )}
    }
    }

  return(  
    <div className='page '>
    <div className='p-2-light mx-auto w-50 rounded'>
    <Carousel fade>
        {showPics()}
    </Carousel>
    </div>
    <div className='border border w-50 mx-auto mt-4 rounded bg-secondary'>
     <div className='d-flex justify-content-between m-4'>
            <h2 className='m' style={{'textAlign':'left'}}>{assetName}</h2>
            <div className='d-flex '>
            <p className='mx-2'> ♥ {assetDownloads}</p>
            <p className='mx-4'> ⭐ 56 </p>
        </div>
        </div>
        
        <div className='d-flex justify-content-between m-4'>
            
            <h5 style={{'textAlign':'left'}}>author name</h5>
            
            <button style={{'textAlign':'right'}} className="mx-4">Follow</button>
        </div>
        
    <hr className='w-75 m-auto'/>
    <p>Price : Free</p>
    <button onClick={download} className="mb-4">Download</button>
    <hr className='w-75 m-auto'/>
        <p className='m-2' style={{'textAlign':'left'}}>{assetDescription}</p>
        

        <h4>Tags</h4>
        { assetTags }
        
    </div>
    </div>
    
    
  )
}
