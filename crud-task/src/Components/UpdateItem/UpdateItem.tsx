import { useEffect, useState } from 'react';
import Control from '../Control/Control';
import './UpdateItem.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loding from '../Loding/Loding';

interface Itemdata {
  id: number;
  name: string;
  image_url: string; 
  price: string;
  created_at: Date;
}

export default function UpdateItem() {
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [item, setItem] = useState<Itemdata | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>();
  const [img, setImg] = useState<File | null>(null);

  useEffect(() => {
    const fetchItem = async () =>
    {
      setLoading(true);
      try{
       const response = await axios.get(`https://test1.focal-x.com/api/items/${param.id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        setItem(response.data);
        setName(response.data.name);
        setPrice(parseFloat(response.data.price));
        setImg(null);
      }catch
      {
        console.error('Error fetching user:')
      }finally
      {
        setLoading(false);
      }
    };
    fetchItem();

    },[]); 
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`https://test1.focal-x.com/api/items/${param.id}`,
      {
        _method : "PUT",
         name : name,
         price : price,
         image: img,
      },
      {
        headers:
        {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then( res => {
      console.log(res);
      navigate('/dashboard')
    })
};


  return (
    <>
      <div>
        <Control text='EDIT ITEM' />  
      </div>
      <div>
        {loading ? 
        ( <Loding loading={loading} />
        ):(
          <form className='add-form' onSubmit={send}>
          <div className='input-add'>
            <div className='item-info item-name'>
              <label htmlFor="">Name</label>
              <input 
                type="text" 
                className='input-name' 
                defaultValue={item?.name} 
                placeholder='Enter the product name' 
                onChange={(event) => setName(event.target.value)} 
              />
              <label htmlFor="">Price</label>
              <input 
                type="text" 
                placeholder='Enter the product price' 
                defaultValue={item?.price} 
                onChange={(event) => setPrice(parseFloat(event.target.value))} 
              />
            </div>
            <div className='item-info item-img'>
              <label htmlFor="">Image</label>
              <div className='up-img-div img-label'>                  
                <label className=' img-label-up' htmlFor="img-add">
                  {item?.image_url && <img className='' src={item.image_url} alt={item.name} />}
                </label>
                <input 
                  type="file" 
                  id='img-add' 
                  className='img-up'
                  onChange={(event) => setImg(event.target.files ? event.target.files[0] : null)} 
                />
              </div>
            </div>
          </div>
          <div className='add-up-btn-div'>
           <button className='add-up-btn' type="submit">Save</button>
          </div>
        </form> 
        )
        }
      </div>
    </>
  );
}
