import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './bootstrap.min.css';
import { useUser } from "./UserContext";
import logo from './logoinf.png';

function Navibar(props) { // Cambiar "navibar" a "Navibar"
    const { user } = useUser(); // Asegúrate de usar la variable correcta "user" en lugar de "User"
    return (
        <>
            <Navbar bg="red" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="150"
                            height="70"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto" style={{ fontSize: 17 }}>
                        <Nav.Link href="/">Mi Menu</Nav.Link>
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Carro">Mi Carrito</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Perfil">Editar perfil</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/Ayuda">Ayuda</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{ fontSize: 17, paddingRight: '50px' }}>
                            <a href="/Carro">Mi Carrito</a>
                        </Navbar.Text>
                        <Navbar.Text style={{ fontSize: 17 }}>
                            Sesión de: <a href="/Perfil">{user?.nombre || "Invitado"}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navibar;
