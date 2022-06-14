import React from 'react'
import { useState } from 'react'
import axios from 'axios'


 async function postAsset({asset}) {
        const formData = new FormData();
        formData.append("asset", asset)
        const result = await axios.post('/upload-to-s3', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
    }


export default function UploadAsset() {

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
        
              { asset.map( asset => (
                <div key={asset}>
                  <a href={asset}></a>
                </div>
              ))}
        
            </div>
          );
        }