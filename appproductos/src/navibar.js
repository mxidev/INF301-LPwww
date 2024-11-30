import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './bootstrap.min.css';

import logo from './logoinf.png';

function navibar(props) {
    return (
        <>
            <Navbar bg="red" variant="light">
                <Container>
                    <Navbar.Brand href="/p1">
                        <img
                            src={logo}
                            width="150"
                            height="70"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto" style={{ fontSize: 17 }}>
                        <Nav.Link href="/p1">Mi Menu</Nav.Link>
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Carro">Mi Carrito</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Perfil">Editar perfil</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/Ayuda">Ayuda</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{ fontSize: 17, 'padding-right': '50px' }}>
                            <a href="/Carro">Mi Carrito</a>
                        </Navbar.Text>
                        <Navbar.Text style={{ fontSize: 17 }}>
                            Sesión de: <a href="/Perfil">LuFaSe</a>
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>

    );
}

export default navibar