import React from 'react'
import NavLogo from '../../Assets/almabetter.png'

const Navbar = () => {
  return (
    <div>
    <nav >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-18" src={NavLogo} alt="Logo"/>
          </div>
        </div>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Navbar

