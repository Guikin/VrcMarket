import React from 'react'
import { Link } from 'react-router-dom'

export default function UserProfile2(props) {
  return (
    <div className='page'>{props.user.name}
    <Link to ="/uploadForm"><button>Upload</button></Link>
    </div>
  )
}
