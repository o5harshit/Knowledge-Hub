import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';

function App() {
  const location  = useLocation();
  return (
    <>
     <Navbar/>
    <div className='flex'>
     {location.pathname !== "/userLogin" && location.pathname !== "/adminLogin" && <Sidebar/> }
     <Outlet/>
     </div>
    </>
  )
}

export default App
