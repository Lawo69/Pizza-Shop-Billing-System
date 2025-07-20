import React from 'react'
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri"
import { menuItems } from '../../constants'
import NavItem from './NavItem'

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`bg-blue-600 h-screen fixed md:relative text-white p-4 z-40 flex flex-col gap-6 transition-all duration-300 ${isOpen ? 'w-52' : 'w-20'}`}>
      <button 
        onClick={() => setIsOpen(prev => !prev)} 
        className={`text-xl cursor-pointer flex items-center ${isOpen ? 'justify-end' : 'justify-center'} mb-4`}>
        {isOpen ? <RiMenuUnfold3Fill /> : <RiMenuUnfold4Fill />}
      </button>

      <nav className="flex flex-col items-center gap-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            text={item.text}
            icon={item.icon}
            href={item.href}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
