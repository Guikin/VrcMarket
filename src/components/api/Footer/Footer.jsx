import React from 'react'
import "./footer.css"
export default function Footer() {
  return (
    <div className='footer py-3'>
        <div className='d-flex justify-content-around'>
        <p className='bold-text'>Discover</p>
        <div className='d-flex'>
            <div>
            <p className='bold-text'>Categories</p>
            <p>Animals and Pets</p>
            <p>Characters and Creatures</p>
            <p>Electronics and Gadgets</p>
            <p>Fashion and Style</p>
            </div>
        <div className='align-self-end mx-5'>
            <p>Furniture and Home</p>
            <p>Nature and Plants</p>
            <p>People</p>
            <p>NWeapons and Military</p>
        </div>
        </div>

        </div>
        
    </div>
    
  )
}
