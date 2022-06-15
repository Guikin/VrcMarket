import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';


 async function postAsset({asset,user}) {
        const formData = new FormData();
        formData.append("asset", asset)
        formData.append("user",user)
        const result = await axios.post('/s3/upload-to-s3', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
    }

async function downLoadAsset(key){
  const url = await axios.get(`/s3/get-object-url/${key}` )
  console.log(url.data)
  window.open(url.data,'_blank');
}

export default function UploadAsset() {
  const location = useLocation()

  useEffect(()=>{
    setAssetKey(location.state.asset)
    setUser(location.state.user.name)
    
  })

    useEffect(()=>{
      async function getBucketObjectList() {
        const fetchResponse = await fetch('/s3/all-files',{
          method: 'GET',
        })
        const response = await fetchResponse.json()
        
        setAssetData(response)
        
        return response
      }
      getBucketObjectList()
      }, [])


// function handleClick(){
//         assetData.map(asset=>{
//           console.log(asset.key)
//         })
//       }


      const[assetData , setAssetData] = useState([])
      const [file, setFile] = useState()
      const [asset, setAsset] = useState([])
      const[assetKey, setAssetKey]=useState()
      const [userData,setUser]=useState()
    
      const submit = async event => {
        event.preventDefault()
        const result = await postAsset({asset: file,user:userData})
        setAsset([result.asset, ...asset])
      }
    
      const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
        }

        return (
            <div className="App page">
              <h2>UploadAsset</h2>
              <form onSubmit={submit}>
                <input onChange={fileSelected} type="file" ></input>
                <button type="submit">Submit</button>
              </form>

              {/* <button onClick={handleClick}>click image</button> */}

              <p>Download</p>

            <ul> 
              {assetData.map(asset => (
              <li key={asset.eTag}><button onClick={()=>downLoadAsset(asset.key)}>{asset.key}</button></li>
                ))}</ul> 
                
            </div>
          );
        }