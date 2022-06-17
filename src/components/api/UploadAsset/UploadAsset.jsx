import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';




async function downLoadAsset(key){
  const url = await axios.get(`/s3/get-object-url/${key}` )
  console.log(url.data)
  window.open(url.data,'_blank');
}

export default function UploadAsset() {
  const location = useLocation()
  const navigate = useNavigate()

   async function postAsset({asset}) {
        const formData = new FormData();
        formData.append("asset", asset)
        const result = await axios.post('/s3/upload-to-s3',formData,{headers: {'Content-Type': 'multipart/form-data'}})
        setAwsKey(result.data.key)
        setAwsEtag(result.data.ETag.replace(/['"]+/g, ''))
        return result.data
      }

          async function finalSubmit({asset,assetKey,userData,awsKey,awsEtag,isPublic,codeLock,code}){
            const fetchResponse = await fetch('/asset/edit2', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                asset,
                assetKey,
                userData,
                awsKey,
                awsEtag,
                isPublic,
                codeLock,
                code
              })
            })
          if(fetchResponse.ok){
          const response = await fetchResponse.json()
          console.log("response is",response)
          console.log('public is',isPublic)
          navigate('/display',{state:{user:userData,asset:assetKey}})
          }else{
            console.log('error')
          }  
        }

  useEffect(()=>{
    setAssetKey(location.state.asset)
    setUser(location.state.user)
    console.log('Etag is',awsEtag)
    console.log('key is',awsKey)
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
//       

      const [assetData , setAssetData] = useState()
      const [file, setFile] = useState()
      const [asset, setAsset] = useState([])
      const [assetKey, setAssetKey]=useState()
      const [userData,setUser]=useState()
      const [awsKey,setAwsKey]=useState()
      const [awsEtag,setAwsEtag]=useState()
      const [isPublic,setPublic]=useState()
      const [codeLock,setCodeLock]=useState()
      const [code,setCode]=useState()


      const handleOnChange = () => {
        setPublic(!isPublic);
      };

      const handleOnCodeLock = () => {
        setCodeLock(!codeLock);
      };
    
      const submit = async event => {
        event.preventDefault()
        let submit = await finalSubmit({assetKey,userData,awsKey,awsEtag,isPublic,codeLock,code})
      }
    
      async function fileSelected (event) {
        const file = event.target.files[0]
            setFile(file)
        const result = await postAsset({asset: file,user:userData})
        setAsset([result.asset, ...asset])
        }

        return (
            <div className="App page">
              <div className='bg-dark w-25 px-5 mx-auto rounded-3'>
              <h2 className='p-4'>UploadAsset</h2>
              <form className='form-group' onSubmit={submit}>
                <input className='btn btn-primary' onChange={fileSelected} type="file"></input>
                {awsKey ? <p className="lead">AssetUploaded!</p>: <p className="lead">No File Uploaded</p>}
                <div className>
                <label className='lead '>Puclic
                <input
                className='m-3'
                      type="checkbox"
                      value="Public"
                      checked={isPublic}
                      onChange={handleOnChange}/>
                  </label>
                  <label className='lead'>Codelock
                    <input
                    className='m-3 '
                          type="checkbox"
                          value="Public"
                          checked={codeLock}
                          onChange={handleOnCodeLock}/>
                      </label>
                      {codeLock ? (<input className="form-control bg-dark text-light" onChange={(e)=>setCode(e.target.value)} type='text'value={code} placeholder='enter code'required minLength="5"/>) : <p className='lead text-success'>Free for all</p>}</div>
                <button type="submit" className='btn btn-success'>Post Asset</button>
              </form>

              <iframe src='https://my.spline.design/superkidrobotcopy-1d2b637853dd340d6bdd569ec3023bc5/' frameborder='0' width='100%' height='400px'></iframe>

              {/* <button onClick={handleClick}>click image</button> */}

              

            {/* <ul> 
              {assetData.map(asset => (
              <li key={asset.eTag}><button onClick={()=>downLoadAsset(asset.key)}>{asset.key}</button></li>
                ))}</ul>  */}
                </div>
            </div>
          );
        }
      