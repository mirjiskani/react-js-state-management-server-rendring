import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "./nav.css"

export default function NavigationBar() {
  return (
    <>
      <Navbar className="navbar" bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <NavLink className="navLink" to="/">Home</NavLink>
            <sapn className="navLink" style={{color:"blue"}}> / </sapn>
            <NavLink className="navLink" to="/users"> Users</NavLink>
            <sapn className="navLink" style={{color:"blue"}}> / </sapn>
            <NavLink className="navLink" to="/products">Products</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}