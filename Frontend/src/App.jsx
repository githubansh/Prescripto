import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/Doctors'
import About from './pages/about'
import Contacts from './pages/contacts'
import Login from './pages/login'
import MyAppointements from './pages/myAppointements'
import MyProfile from './pages/myprofile'
import Navbar from './components/Navbar'



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
     <Navbar/>
      <Routes>
      <Route  path='/' element={<Home/>}   />
      <Route  path='/doctors' element={<Doctors/>}   />
      <Route  path='/doctors/:speciality' element={<Doctors/>}   />
      <Route  path='/login' element={<Login/>}   />
      <Route  path='/about' element={<About/>}   />
      <Route  path='/contact' element={<Contacts/>}   />
      <Route  path='/my-profile' element={<MyProfile/>}   />
      <Route  path='/my-appointments' element={<MyAppointements/>}   />
      {/* <Route  path='/my-appointment/:docId' element={<Appointements/>}   /> */}
      </Routes>
   
    </div>
  )
}

export default App