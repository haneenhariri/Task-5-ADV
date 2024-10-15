import { useNavigate } from 'react-router-dom'
import Control from '../Control/Control'
import './AddItem.css'
import { useState } from 'react'
import axios from 'axios';


export default function AddItem() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [price,setPrice] = useState<number>();
  const [img,setImg] = useState<File | null>(null);
  const send = (event :React.FormEvent<HTMLFormElement>) =>
  {
    event.preventDefault()
    axios.post('https://test1.focal-x.com/api/items',
      {
        name:name,
        price:price,
        image:img,
      },
      {
        headers:{
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then( res => {
      console.log(res);
      navigate('/dashboard')
    }
    )
  }
  return (
    <div>
      <Control text='ADD NEW ITEM'/>
        <form onSubmit={send} className='add-form'>
           <div className='input-add'>
              <div className='item-info item-name'>
                  <label htmlFor="">Name</label>
                  <input type="text" className='input-name' placeholder='Enter the product name' onChange={(event)=> setName(event.target.value)}/>
                  <label htmlFor="">Price</label>
                  <input type="text" placeholder='Enter the product price' onChange={(event)=> setPrice(parseInt(event.target.value))} />
              </div>
              <div className='item-info item-img'>
                  <label htmlFor="">Image</label>
                  <div>                  
                  <label className='img-label' htmlFor="img-add">
                     <img className='img-hh' src="/assets/image/Upload icon (2).png" alt="" />
                  </label>
                  <input type="file" className='img-up' id='img-add' onChange={(event)=> setImg((event.target.files ? event.target.files[0] : null))} /></div>
              </div>
           </div>
                   <div className='add-up-btn-div'>
         <button className='add-up-btn' type="submit">Save</button>
        </div>
        </form> 
    </div>
  )
}
