import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar className='bg-transparent'>
      <Container>
        <Link to={'/'} className='text-decoration-none'>
          <Navbar.Brand className='text-white fw-bolder'>
            <i className='fa-solid fa-users me-1'></i>
            EMS
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  )
}

export default Header
