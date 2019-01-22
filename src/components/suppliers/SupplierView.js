import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ButtonGroup,
    Collapse,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import SuppliersModal from './SuppliersModal';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import './Suppliers.css';

class SupplierView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            modalVisible: false,
            deleteModalVisible: false,
            supplier: {
                name: '',
                phone_number: '',
                website: '',
                email: '',
                supplierCollapse: false,
            }
        }

        this.getSupplier = this
            .getSupplier
            .bind(this);
    }

    componentWillMount() {
        this.getSupplier()
    }

    getSupplier() {
        this.setState({isLoaded: false})

        fetch(process.env.REACT_APP_API_BASE_URL + `suppliers/${this.props.match.params.id}/components`)
            .then(res => res.json())
            .then(result => {
                this.setState({supplier: result, isLoaded: true})
            })
    }

    handleDeleteSupplier() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.state.supplier.id}`, {method: 'DELETE'}).then(() => {
            this
                .props
                .history
                .go(-1)
        })
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalVisible: !this.state.deleteModalVisible
        })
    }

    render() {

        const crud = <div className='d-inline-block ml-3'>
            <ButtonGroup>
                <SuppliersModal
                    crud='update'
                    {...this.state.supplier}
                    getSuppliers={this.getSupplier}/>
                <Modal
                    isOpen={this.state.deleteModalVisible}
                    toggle={() => this.toggleDeleteModal()}
                    className={this.props.className}>
                    <ModalHeader>Delete Supplier</ModalHeader>
                    <ModalBody>
                        Are you sure you wish to remove this supplier? This will also remove all related
                        components.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.handleDeleteSupplier()}>Yes</Button>
                        <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button color="danger" onClick={() => this.toggleDeleteModal()}>Delete</Button>
            </ButtonGroup>
        </div>

        const title = (this.state.isLoaded)
            ? <h1 className='d-inline-block'>{this.state.supplier.name}</h1>
            : <h1>Loading...</h1>;

        const componentButton = (this.state.supplier.components !== undefined && this.state.supplier.components.length >= 1)? <Button color="primary" onClick={()=> this.setState({supplierCollapse: !this.state.supplierCollapse})} style={{ marginBottom: '1rem', marginTop: '1rem' }}>Toggle</Button> : <span>None</span>;


        const components = (this.state.supplier.components)? this.state.supplier.components.map((component, i) => {
                    return <ListGroupItem key={i}><Link className='' to={`/components/${component.id}`}>{component.name} </Link></ListGroupItem>}) : null ;

        return (
            <Container>
                <Link className='btn btn-link' to={`/suppliers`}>{'< Return to Suppliers'}</Link>
                <div className='d-flex align-items-center'>
                    {title}
                    {crud}
                </div>
                <Breadcrumb
                    location={this.props.location}
                    overrideDisplay={this.state.supplier.name}/>
                <Row>
                    <Col md={6} className='view-col'>
                        <h4 className='view-headers'>Name</h4>
                        <span>{this.state.supplier.name}</span>
                    </Col>
                    <Col md={6} className='view-col'>
                        <h4 className='view-headers'>Phone Number</h4>
                        <span>{this.state.supplier.phone_number}</span>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='view-col'>
                        <h4 className='view-headers'>Website</h4>
                        <span>{this.state.supplier.website}</span>
                    </Col>
                    <Col md={6} className='view-col'>
                        <h4 className='view-headers'>Email</h4>
                        <span>{this.state.supplier.email}</span>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='view-col'>
                        <h4 className='view-headers'>Components</h4>
                        <Collapse isOpen={this.state.supplierCollapse}>
                            <ListGroup>
                                {components}
                            </ListGroup>
                        </Collapse>
                        {componentButton}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(SupplierView);
