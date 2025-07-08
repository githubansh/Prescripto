import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

           {/* left section */}
          <div>
           <img className='mb-5 w-40' src= {assets.logo} alt="" />
           <p className='w-full md:w-2/3 text-gray-600 leading-6 '>mai hu don, mera samrajya </p>
          </div>


          {/* centre */}
          <div>
            <p className='text-xl font-medium mb-5' >COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
             </ul>
          </div>
 

           {/* right section */}
         <div>
           <p className='text-xl font-medium mb-5'>Get in Touch</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
           <li>+91 7339747564</li>
           <li>gadwalansh@gmail.com</li>
           </ul>
          </div>
      </div>




      <div>
         <p className='py-5 text-sm text-center'> Copyright 2025 @Gadwal Bhavan</p> 

      </div>

    </div>
  )
}

export default Footer
