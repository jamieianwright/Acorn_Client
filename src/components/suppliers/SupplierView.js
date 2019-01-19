import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom';
import {Container} from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import './Suppliers.css';

class SupplierView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            modalVisible: false,
            supplier: {
                name: '',
                phone_number: '',
                website: '',
                email: ''
            }
        }
    }

    componentWillMount() {
        this.setState({isLoaded: false})

        fetch(process.env.REACT_APP_API_BASE_URL + `suppliers/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({supplier: result, isLoaded: true})
            })
    }

    render() {

        const title = (this.state.isLoaded)? <h1>Supplier: {this.state.supplier.name}</h1> : <h1>Loading...</h1>;

        return (
            <Container>
                <Link className='btn btn-link' to={`/suppliers`}>{'< Return to Suppliers'}</Link>
                {title}
                <Breadcrumb location={this.props.location} overrideDisplay={this.state.supplier.name} />
            </Container>
        )
    }
}

export default withRouter(SupplierView);
