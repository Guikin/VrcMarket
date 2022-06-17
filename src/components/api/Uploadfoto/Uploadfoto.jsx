
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap';

import './Uploadfoto.css'
import { useLocation,useNavigate } from 'react-router-dom';
import { set } from 'mongoose';

async function postImage({image}) {
  const formData = new FormData();
  formData.append("image", image)
  const result = await axios.post('/s3/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}






function UploadFoto() {
  const location = useLocation()
  const navigate = useNavigate()

async function postForm({user,asset,assetName,description,images,name,categories}){
  const fetchResponse = await fetch('/asset/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name, 
      user: user,
      asset,
      assetName,
      description,
      images,
      categories,
    })
  })
if(fetchResponse.ok){
const response = await fetchResponse.json()
console.log("response is",response)
navigate('/upload',{state:{user:userData,asset:asset}})
return response
}else{
    console.log('error')
}
}

  useEffect(()=>{
    
    if(!asset){
      setAsset(location.state.asset)
    }
    
    if(asset){
    getAsset(asset)
    }
    if(!assetName){
      setAssetNamefunc()
    }
    if(file){
      callPostPic()
    }
    if(!userData){
      setUser(location.state.user)
    }

    console.log(userData)
    
    
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
    
  }    


  const [assetName, setAssetName] = useState()
  const [asset, setAsset] = useState()
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [name,setName]=useState()
  const [categories,setCategories]=useState([])
  const [userData,setUser]=useState()
 

  const submit = async event => {
    event.preventDefault()
    const result = await postForm({asset,assetName,description,images,name,categories})
    
    
  }

  function callPostPic(){
    let untrue = false
    postPics()
    setFile(untrue)
  }
  

  async function postPics(){
    if(images.length<6){
      const result = await postImage({image: file})
    setImages([result,...images])
    }
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
        <div>
        <img 
          style={{width:400+"px",height:300+"px"}}
          key ={image}
          className="d-block w-100"
          src={`s3/images/${image}`}
          alt="Pictures"
        /></div>
        <Carousel.Caption>
          <button className='btn btn-light' id={`${image}`} onClick={(e)=>deletePic(e.target)}>remove</button>
        </Carousel.Caption>
      </Carousel.Item>
    )}else{
      return(
      <h3 >No images uploaded</h3>
      )
    }
    
  }

  const options = [

    {
      label: "Animale-pets",
      value: "Animale-pets",
    },
    {
      label: "Characters-Creatures",
      value: "Characters-Creatures",
    },
    {
      label: "Electronics-Gadgets",
      value: "Electronics-Gadgets",
    },
    {
      label: "Fashion-Style",
      value: "Fashion-Style",
    },
    {
      label: "Furniture-Home",
      value: "Furniture-Home",
    },
    {
      label: "People",
      value: "People",
    },
    {
      label: "Fashion-Style",
      value: "Fashion-Style",
    },
    {
      label: "Weapons-Military",
      value: "Weapons-Military",
    },
  ];

  return (
    <div className="App page">
      <h3>{ assetName }</h3>
      <form onSubmit={submit}>
      <label>Name 
      <input onChange={(e)=>setName(e.target.value)} type="text" value={name} placeholder={ assetName }></input>
      </label>
        <input onChange={fileSelected} type="file"></input>
        <Carousel>
        {showPics()}
        </Carousel>
        <label>Description</label>
        <textarea onChange={(e)=>setDescription(e.target.value)} type="text" rows="6" cols="50" value={description} required placeholder="description"></textarea>
        <label>Category</label>
        <select value={categories} onChange={(e)=>setCategories(e.target.value)} >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        {/* <select name="categories" id="categories" multiple >
          <option onChange={(e)=>setCategories(e.target.value)} value="Animale-pets">Animale-pets</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Characters-Creatures">Characters-Creatures</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Electronics-Gadgets">Electronics-Gadgets</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Fashion-Style">Fashion-Style</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Furniture-Home">Furniture-Home</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Nature-Plants">Nature-Plants</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="People">People</option>
          <option onChange={(e)=>setCategories(e.target.value)} value="Weapons-Military">Weapons-Military</option>
          </select> */}
        <button type="submit">Submit</button>
      </form>
      
      
      



      <p>{location.user}</p>

    </div>
  );
}

export default UploadFoto;