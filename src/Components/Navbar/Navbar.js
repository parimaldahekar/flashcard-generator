import React from 'react'
import NavLogo from '../../Assets/almabetter.png'

const Navbar = () => {
  return (
    <div>
    {/* Renders a navigation bar */}

    <nav >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
     {/* Renders the logo */}
          <div className="flex-shrink-0">
            <img 
            className="h-8 w-18" 
            src={NavLogo} 
            alt="Logo"/>
          </div>
        </div>
        </div>
      
    </div>
  </nav>
    </div>
  )
}

export default Navbar

