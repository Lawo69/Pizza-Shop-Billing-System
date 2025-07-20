import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import { routeTitles } from '../constants'

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const location = useLocation()
  const pageTitle = routeTitles[location.pathname]

  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 ml-20 md:ml-0">
        <Header pageTitle={pageTitle} />
        <div className='h-full overflow-auto pb-14'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SidebarLayout
