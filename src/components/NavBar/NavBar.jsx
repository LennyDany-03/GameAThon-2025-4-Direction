import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <>
        <nav className= {styles.NavContainer}>
          <ul className= {styles.NavUL}> 
            <li className= {styles.NavLI}><a href="/" className= {styles.NavaTag}>Home</a></li>
            <li className= {styles.NavLI}><a href="/learn" className= {styles.NavaTag}>Learn</a></li>
            <li className= {styles.NavLI}><a href="/product" className= {styles.NavaTag}>Product</a></li>
            <li className= {styles.NavLI}><a href="/service" className= {styles.NavaTag}>Service</a></li>
            <li className= {styles.NavLI}><a href="/aboutus" className= {styles.NavaTag}>About Us</a></li>
          </ul>
        </nav>
    </>
  )
}

export default NavBar
