
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap';

import './Uploadfoto.css'
import { useLocation } from 'react-router-dom';
import { set } from 'mongoose';

async function postImage({image}) {
  const formData = new FormData();
  formData.append("image", image)
  const result = await axios.post('/s3/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function UploadFoto() {
  const location = useLocation()

  useEffect(()=>{
    
    setAsset(location.state.asset)
    
    if(asset){
    getAsset(asset)
    }
    if(!assetName){
      setAssetNamefunc()
    }
    if(file){
      callPostPic()
    }
    console.log(description)
  })

async function getAsset(asset){
  const fetchResponse = await fetch(`/asset/${asset}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      
  const response = await fetchResponse.json()
  setAssetNamefunc(response)
  return response
      }
  
  function setAssetNamefunc(response){
    setAssetName(response)
    console.log(assetName)
  }    


  const [assetName, setAssetName] = useState()
  const [asset, setAsset] = useState()
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [name,setName]=useState()
 

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    
    setImages([result.image, ...images])
  }

  function callPostPic(){
    let untrue = false
    postPics()
    setFile(untrue)
  }
  

  async function postPics(){
    const result = await postImage({image: file})
    setImages([result,...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}
  function deletePic(e){
    let pics = images
    // let index = pics.indexOf(e.id)
    // delete pics(index)
    let newpics = pics.filter(function(pic){ 
      return pic !== e.id})
     
    setImages(newpics)
  }
   
  function showPics(){
    if(images.length>0){
    return images.map(image=>
      <Carousel.Item>
        <div >
        <img 
          style={{width:300+"px",height:300+"px"}}
          key ={image}
          className="d-block w-100"
          src={`s3/images/${image}`}
          alt="Pictures"
        /></div>
        <Carousel.Caption>
          <h3 id={`${image}`} onClick={(e)=>deletePic(e.target)}>remove</h3>
        </Carousel.Caption>
      </Carousel.Item>
    )}else{
      return(
      <h3 >No images uploaded</h3>
      )
    }
    

  }

  return (
    <div className="App page">
      <h3>{ assetName }</h3>
      <h2>Uploadfoto</h2>
      <form onSubmit={submit}>
      <label>Name 
      <input onChange={(e)=>setName(e.target.value)} type="text" value={name} required placeholder={ assetName }></input>
      </label>
        <input onChange={fileSelected} type="file"></input>
        <Carousel>
        {showPics()}
        </Carousel>
        <label>Description</label>
        <textarea onChange={(e)=>setDescription(e.target.value)} type="text" rows="6" cols="50" value={description} required placeholder="description"></textarea>
        <button type="submit">Submit</button>
      </form>
      
      
      



      <p>{location.user}</p>

    </div>
  );
}

export default UploadFoto;