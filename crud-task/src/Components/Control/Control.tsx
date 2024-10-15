import { Link } from 'react-router-dom'
import './Control.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



export default function Control({text} : {text:string}) {
  return (
    <div>
        <div className='link-control'>
        <Link to={'/dashboard'}><FontAwesomeIcon className='icon' icon={faChevronLeft} /></Link>
        </div>
        <h2 className='add-title'>{text}</h2>
    </div>
  )
}
