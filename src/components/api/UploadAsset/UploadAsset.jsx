import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'



 async function postAsset({asset}) {
        const formData = new FormData();
        formData.append("asset", asset)
        const result = await axios.post('/upload-to-s3', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
    }






export default function UploadAsset() {




    useEffect(()=>{
      async function getBucketObjectList() {
        const fetchResponse = await fetch('/all-files',{
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
    
      const submit = async event => {
        event.preventDefault()
        const result = await postAsset({asset: file})
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

            <ul > 
              {assetData.map(asset => (
                
              <li key={asset.eTag}>{asset.key}</li>
                ))}</ul> 
                
        
            </div>
          );
        }