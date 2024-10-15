import { useEffect, useState } from 'react';
import './Sidebar.css';
import Navlinks from '../Navlinks/Navlinks';
import Vector1 from '../../assets/Vector.png';
import icon from '../../assets/icone-6.png';
import barsIcon from '../../assets/bars-solid.svg';
import xmarkIcon from '../../assets/xmark-solid (1).svg';

interface LogoProps {
  logoImg: string;
}

export default function Sidebar({ logoImg }: LogoProps) {
  const [sideInfo, setSideInfo] = useState({
    fname: '',
    lname: '',
    img: './assets/image/pexels-photo-2379004 1.png',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const firstName = localStorage.getItem('first_name') || '';
    const lastName = localStorage.getItem('last_name') || '';
    const profileImage = localStorage.getItem('img') || './assets/image/pexels-photo-2379004 1.png';
    
    setSideInfo({
      fname: firstName,
      lname: lastName,
      img: profileImage,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false); 
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {windowWidth <= 768 && (
        <button onClick={toggleSidebar} className="toggle-button">
          <img src={isOpen ? xmarkIcon : barsIcon} alt="Toggle Icon" />
        </button>
      )}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="head">
          <div className="dash-logo">
            <img src={logoImg} alt="Logo" />
          </div>
          <div className="profile">
            <img src={sideInfo.img} alt="Profile" className="pro-img" />
            <h3>{sideInfo.fname} {sideInfo.lname}</h3>
          </div>
        </div>
        <Navlinks 
          title1="Products" 
          icone1={Vector1} 
          title2="Favorites" 
          icone2={icon}
          title3="Order List"
          icone3={icon}
        />
      </div>
    </>
  );
}
