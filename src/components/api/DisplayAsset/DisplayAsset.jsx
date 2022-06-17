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
          return fetchResponse
    }
    async function getAuthor(assetAuthor){
    }


    useEffect(()=>{
        // setUser(location.state.user._id)
        setAssetKey(location.state.asset)
        
        },[location.state.asset,])

        useEffect(()=>{
          
          if(!assetName){
          getActualAsset()
        }
        },)

        function setUpState(response){
          setAssetname(response.name)
          setAssetAwsKey(response.AWSkey)
          setAssetAwsETag(response.AWSEtag)
          setAuthor(response.user)
          setAssetCode(response.code)
          setAssetcodeLock(response.codelock)
          setAssetRating(response.Rating)
          setAssetDescription(response.description)
          setAssetTags(response.tags)
          setAssetPictures(response.Pictures)
          setAssetDownloads(response.Downloads)
          setAuthorName(response.AuthorName)
         }

  const [user,setUser]=useState()
  const [authorName,setAuthorName]=useState()
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
  const [enteredCode,setEnterCode]=useState()
  
  async function download(){
    await downLoadAsset({key:AwsKey,ETag:AwsTag})
    let newdownload = assetDownloads +1
    setAssetDownloads(newdownload)
    sendDownload()
  }

  function lockCheck(){
    if(codeLock){
      if(assetCode===enteredCode){
        return <button onClick={download} className="mb-4 btn btn-danger">Download</button>
      }else{
        return <input onChange={(e)=>setEnterCode(e.target.value)} type="text" className='mb-3' value={enteredCode} placeholder="Enter code to Dowload"></input>
      }
    }else{
       return <button onClick={download} className="mb-4 btn btn-danger">Download</button>
      }
  }

  function showPics(){
    if(pictures){
    if(pictures.length>0){
    return pictures.map(image=>
      <Carousel.Item >
        
        <img 
          style={{maxWidth:100+"%",height:400+"px"}}
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
    <div className='page'>
    <div className='p-2-light mx-auto w-50 rounded fade-in'>
    <Carousel fade>
        {showPics()}
    </Carousel>
    </div>
    <div className=' pb-5 w-50 mx-auto my-4 rounded bg-dark'>
     <div className='d-flex justify-content-between py-4 mx-4'>
            <h2 className='display-4' style={{'textAlign':'left'}}>{assetName}</h2>
            <div className='d-flex '>
            <p className='mx-2 lead'> ♥ {assetDownloads}</p>
            <p className='mx-4 lead'> ⭐ 56 </p>
        </div>
        </div>
        
        <div className='d-flex justify-content-between mx-4 align-items-center rounded-3'>
            
            <h5 className='lead' style={{'textAlign':'left'}}>{authorName}</h5>
            
            <button style={{'textAlign':'right'}} className="mx-4 btn btn-secondary">Follow</button>
        </div>
        
    <hr className='w-75 mx-auto'/>
    <p><span style={{fontWeight:'bold'}}>Price</span> : Free</p>

    {lockCheck()}

    {/* ( <button onClick={download} className="mb-4 btn btn-danger">Download</button> ) } */}


        {/* <input onChange={(e)=>setEnterCode(e.target.value)} type="text" value={enteredCode} placeholder="Enter code to Dowload"></input>

        <button onClick={download} className="mb-4 btn btn-danger">Download</button> */}
    
    <hr className='w-75 m-auto'/>
        <p className='m-4' style={{'textAlign':'left'}}>{assetDescription}</p>
        <hr className='w-75 mx-auto'/>
        <div className='d-flex  justify-content-start'>
        <h4 className="mx-4">Tags</h4>
        <button className='btn btn-outline-light'>{ assetTags }</button>
        </div>
    </div>
    </div>
    
    
  )
}
