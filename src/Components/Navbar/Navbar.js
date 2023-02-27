import React from 'react'
import NavLogo from '../../Assets/almabetter.png'

const Navbar = () => {
  return (
    <div>
    <nav class="flex items-center justify-between flex-wrap bg-white-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <img
            className="w-40 h-10 object-cover aspect-square"
            src={NavLogo}
            alt= "Almabetter"
          />
  </div>
  <div class="block lg:hidden">
  <img
  className="w-10 h-5 object-cover aspect-square"
  src={NavLogo}
  alt= ""
/>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
  </div>
</nav>
    </div>
  )
}

export default Navbar

