import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Header() {
  return (
    <header>
        <nav>
            <ul>
                <li> <NavLink to="/">Accueil</NavLink> </li>
                <li> <NavLink to="/universes">Univers</NavLink> </li>
            </ul>
        </nav>
    </header>
  )
}
