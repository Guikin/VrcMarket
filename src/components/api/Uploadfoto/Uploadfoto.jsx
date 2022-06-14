
import { useState } from 'react'
import axios from 'axios'



import './Uploadfoto.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

async function handleClick(filename){
  const fetchResponse = await fetch(`/download/${filename}`,{
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data' },
  })
 
  let response = await fetchResponse.json();
  console.log(response.data)
  // const buffer = await response.buffer();
  // console.log(buffer)
  // await writeFile('test.mp4', buffer);
  // console.log('Done!')
}

function UploadFoto() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App page">
      <h2>Uploadfoto</h2>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" ></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

      <img src="/images/2afe040be367ca656a433784fe82b5d0"></img>

      <button onClick={()=> handleClick("2afe040be367ca656a433784fe82b5d0")}>Link</button>

    </div>
  );
}

export default UploadFoto;