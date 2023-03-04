import React from 'react'
import NavLogo from '../../Assets/Flashcard Logo.png'

const Navbar = () => {
  return (
    <div>
    {/* Renders a navigation bar */}

    <nav >
    <div className="px-5 xl:px-32 container mx-auto">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
     {/* Renders the logo */}
          <div className="flex-shrink-0">
            <img 
            className="h-12 w-15 mb-1" 
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

