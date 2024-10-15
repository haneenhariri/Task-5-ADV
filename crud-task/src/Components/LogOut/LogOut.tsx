import { Link, useNavigate } from 'react-router-dom'
import './LogOut.css'
import axios from 'axios'
interface logout 
{
  text: string,
  icon: string
}
export default function LogOut({text,icon}:logout) {
    const navigate = useNavigate()
    const logout = () =>
        {
          axios.post('https://test1.focal-x.com/api/logout',{},
              {
                 headers:
                 {
                  Authorization: localStorage.getItem('token'),
                  Accept: 'application/json'
                 }
              })
              .then( ()=> {localStorage.removeItem('token'); 
                navigate('/signIn')
              })
        }
  return (
    <div>
        <Link
           onClick={(logout)}
           className='link-log' to={''}>
            {text} <img src={icon} alt={text} />
        </Link>
    </div>
  )
}
