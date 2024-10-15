import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Dashboard.css'
import { useEffect } from 'react';
import logo from '../../assets/Logo (4).png'

export default function Dashboard() {
  const navigate = useNavigate()
  useEffect( ()=> 
  {
    if(!localStorage.getItem('token'))
    {
       navigate('/signIn')
    }
  },[navigate])

  return (
    <section className='dash'>
        <Sidebar  logoImg={logo} />
        <div className='das-header'>
        <Outlet/>
        </div>
    </section>
  )
}
