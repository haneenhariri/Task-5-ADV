import { Link } from 'react-router-dom';
import './Navlinks.css';
import LogOut from '../LogOut/LogOut';
import signOut from '../../assets/sign-out-alt 1.png'
interface navprop {
    title1: string;
    icone1: string;
    title2: string;
    icone2: string;
    title3: string;
    icone3: string;
}

export default function Navlinks({ title1 , icone1 ,title2 ,icone2 , title3 , icone3}: navprop) {
  return (
    <div className="navlinks">
      <div className='link-nav'>
          <Link  className="link" to={''}>
            <img src={icone1} alt='vector' /> {title1}
          </Link>
          <Link  className="link" to={''}>
            <img src={icone2} alt='vector' /> {title2}
          </Link>
          <Link  className="link" to={''}>
            <img src={icone3} alt='vector' /> {title3}
          </Link>
      </div>
      <LogOut text='Logout' icon={signOut}/>
    </div>
  );
}
