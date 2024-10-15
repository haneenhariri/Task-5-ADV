import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './Products.css';
import SliderItem from '../SliderItem/SliderItem';

export default function Products() {
  const [search, setSearch] = useState('');
  return (
    <section className='product'>
      <Search setSearch={setSearch}  searchIcon='./assets/image/search.png'/> 
      <div className='item'>
        <div className='add-btn'>
          <Link className='link-btn' to={'/dashboard/add'}>ADD NEW PRODUCT</Link>
        </div>
        <SliderItem search={search} />
      </div>
    </section>
  );
}
