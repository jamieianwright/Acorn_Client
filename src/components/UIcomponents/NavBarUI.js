import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';

export class NavBarUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isOpen: false,
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {

        const AuthenticationNav = (this.props.login_jwt)
            ? <LogOut onLogOut={() => this.props.onLogOut()}/>
            : <LogIn/>;

        return (
            <Navbar color="light" light expand="md">
                <Container>
                    <Link to='/' className='navbar-brand text-primary'>Dashboard</Link>
                    <NavbarToggler onClick={() => this.toggle()}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link className='nav-link' to='/suppliers'>Suppliers</Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to='/components'>Components</Link>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto">
                            {AuthenticationNav}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}

const LogOut = (props) => (
    <NavItem >
        <Link onClick={() => props.onLogOut()} to='/login'>Log Out</Link>
    </NavItem>
)

const LogIn = () => (
    <NavItem >
        <Link to='/login'>Log In</Link>
    </NavItem>
)

export default NavBarUI
