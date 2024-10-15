import { useParams } from 'react-router-dom';
import Control from '../Control/Control';
import './Show.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loding from '../Loding/Loding';

interface Itemdata {
  id: number;
  name: string;
  image_url: string;
  price: string;
  created_at: Date;
}

export default function Show() {
  const params = useParams(); 
  const [loading, setLoading] = useState(true); 
  const [item, setItem] = useState<Itemdata | null>(null);
  const [date, setDate] = useState('');
  const [update,setUpdate] = useState ('')
  useEffect(() => {
    axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
        Accept: 'application/json',
      },
    })
    .then(res => {
      setItem(res.data);
      setDate(res.data.created_at);
      setUpdate(res.data.updated_at)
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false); 
    });
  }, [params.id]);

  const dateNew = new Date(date);
  const day = dateNew.getDate().toString().padStart(2, '0');
  const month = (dateNew.getMonth() + 1).toString().padStart(2, '0');
  const year = dateNew.getFullYear();
  const dateUp = new Date(update);
  const Upday = dateUp.getDate().toString().padStart(2, '0');
  const Upmonth = (dateUp.getMonth() + 1).toString().padStart(2, '0');
  const Upyear = dateNew.getFullYear();
  return (
    <>
      {loading ? (
        <Loding loading={loading} />
      ) : item ? (
        <>
          <div>
            <Control text={item.name} />
          </div>
          <div className='show-img'>
            <img src={item.image_url} alt={item.name} />
          </div>
          <div className='show-price'>
            <h3 className='show-title'>price: <span>{item.price}$</span></h3>
            <h3 className='show-title'>Added at: <span>{day}/{month}/{year}</span></h3>
          </div>
          <div className='show-up'>
            <h3 className='show-title'>updated at: <span>{Upday}/{Upmonth}/{Upyear}</span></h3>
          </div>
        </>
      ) : (
        <div>Item not found</div> 
      )}
    </>
  );
}
