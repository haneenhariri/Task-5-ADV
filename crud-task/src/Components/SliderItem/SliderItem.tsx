import { useEffect, useState } from 'react';
import './SliderItem.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Loding from '../Loding/Loding';
import DeleteModel from '../DeleteModel/DeleteModel';

interface Item {
  id: number;
  name: string;
  image_url: string; 
}

export default function SliderItem({ search }: { search: string }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  let itemsPerPage = 8;

  if (window.innerWidth <= 1200) {
    itemsPerPage = 6;
  }
  if (window.innerWidth <= 992)
  {
    itemsPerPage = 4;
  }
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://test1.focal-x.com/api/items', {
          headers: {
            Authorization: localStorage.getItem('token') || '',
            Accept: 'application/json'
          }
        });
        setItems(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id); 
    setIsModalOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      try {
        await axios.delete(`https://test1.focal-x.com/api/items/${selectedItemId}`, { 
          headers: { Authorization: localStorage.getItem('token') } 
        });
        setItems(prevItems => prevItems.filter(item => item.id !== selectedItemId)); 
        navigate(`/dashboard`); 
      } catch (err) {
        console.log(err);
      } finally {
        setIsModalOpen(false); 
      }
    }
  };

  return (
    <div className='slider'>
      {loading ? ( 
        <Loding loading={loading} />
      ) : (
        <div className='slider-content'>
          <div className='row row1'>
            {currentItems.map((item) => (
              <div key={item.id} className='phone'>
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  onError={(e) => { e.currentTarget.src = './assets/image/Default.png'; }} 
                />
                <div className='hover-layout'>
                  <h3 onClick={() => navigate(`/dashboard/show/${item.id}`)}>{item.name}</h3>
                  <div className='btns'>
                    <button className='Edit-btn' onClick={() => navigate(`/dashboard/update/${item.id}`)}>Edit</button>
                    <button 
                      className='delete-btn' 
                      onClick={() => handleDeleteClick(item.id)}
                    >Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        goToNextPage={() => setCurrentPage(prevPage => prevPage === totalPages ? 1 : prevPage + 1)}
        goToPrevPage={() => setCurrentPage(prevPage => prevPage === 1 ? totalPages : prevPage - 1)}
        goToPage={setCurrentPage}
      />

      {isModalOpen && (
        <DeleteModel 
          closeModal={() => setIsModalOpen(false)} 
          modaldata={{ 
            msg: `Are you sure you want to delete the product?`,
            btn1: 'Yes',
            btn2: 'No'
          }} 
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
