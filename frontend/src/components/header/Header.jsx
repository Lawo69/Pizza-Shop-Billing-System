import React from 'react'

const Header = ({pageTitle}) => {
  return (
    <>
      <header className="text-xl font-semibold bg-blue-600 text-white p-5">
          {pageTitle}
        </header>
    </>
  )
}

export default Header
