import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'


function Header() {

  const navi= useNavigate()

  return (
    <div className='header'>
      <div class="header_nav">
        <img src="./img/ahorcad.png" alt="imagen de logo" />
        <ul>
          <li onClick={()=>navi("/")}>Inicio</li>
          <li onClick={()=>navi("/mas")}>masJuegos</li>
          <li onClick={()=>navi("/contacto")}>Contacto</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
