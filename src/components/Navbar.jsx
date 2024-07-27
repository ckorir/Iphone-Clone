import React from 'react'
import {appleImg, bagImg, searchImg} from '../utils/Index'

const Navbar = () => {
  return (
    <header>
      <img src={appleImg} alt="logo" width={14} height={18} />

      <div>
        {['Phones', 'Macbooks', 'Tablets'].map((nav,i) => (
          <div key={nav}>
            {nav}
          </div>   
        ))}

        <div>
            <img src={searchImg} alt="search" width={18} height={18} />
            <img src={bagImg} alt="search" width={18} height={18} />
        </div>
      </div>
    </header>
  )
}

export default Navbar