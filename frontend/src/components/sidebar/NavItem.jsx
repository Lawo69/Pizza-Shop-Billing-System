import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ icon, text, href, isOpen }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center justify-center text-sm md:text-base gap-4 px-3 py-2 w-full cursor-pointer rounded-xl text-white transition-all duration-200 overflow-hidden font-semibold
        ${isOpen ? 'justify-normal' : ''}
        hover:text-white hover:bg-blue-700
        ${isActive ? 'bg-blue-700' : ''}`
      }
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span>{text}</span>}
    </NavLink>
  )
}

export default NavItem