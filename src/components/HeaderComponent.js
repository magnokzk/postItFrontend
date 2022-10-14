import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(){
    return(
        <Navbar bg="light" expand="lg">
            <Container className='container-fluid'>
                <Navbar.Brand href="/">PostIt!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto container-fluid">
                    <Nav.Link href="/">Página Inicial</Nav.Link>
                    <Nav.Link href="/profile">Perfil</Nav.Link>
                    <NavDropdown alignright="true" title="Opções" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/configurations">Configurações</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">
                        <Nav.Link>Sair</Nav.Link>
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header