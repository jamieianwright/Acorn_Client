import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Container, Input, Form, FormGroup, Label, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup } from 'reactstrap';
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
                email: ''
            }
        }

        this.getSupplier = this.getSupplier.bind(this);
    }

    componentWillMount() {
        this.getSupplier()
    }

    getSupplier(){
        this.setState({isLoaded: false})

        fetch(process.env.REACT_APP_API_BASE_URL + `suppliers/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({supplier: result, isLoaded: true})
            })
    }

    handleDeleteSupplier() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.state.supplier.id}`, { method: 'DELETE', })
            .then(() => {
                this.props.history.go(-1)
            })
    }

    toggleDeleteModal() {
        this.setState({ deleteModalVisible: !this.state.deleteModalVisible })
    }

    render() {

        const crud = 
        <div className='d-inline-block ml-3'>
            <ButtonGroup>
            <SuppliersModal crud='update' {...this.state.supplier} getSuppliers={this.getSupplier}/>
            <Modal isOpen={this.state.deleteModalVisible} toggle={() => this.toggleDeleteModal()} className={this.props.className}>
                <ModalHeader>Delete Supplier</ModalHeader>
                <ModalBody>
                    Are you sure you wish to remove this supplier? This will also remove all related components.
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.handleDeleteSupplier()}>Yes</Button>
                    <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Button color="danger" onClick={() => this.toggleDeleteModal()}>Delete</Button>
            </ButtonGroup>
        </div>

        const title = (this.state.isLoaded)? <h1 className='d-inline-block'>{this.state.supplier.name}</h1> : <h1>Loading...</h1>;

        return (
            <Container>
                <Link className='btn btn-link' to={`/suppliers`}>{'< Return to Suppliers'}</Link>
                <div className='d-flex align-items-center'>
                    {title}
                    {crud}
                </div>
                <Breadcrumb location={this.props.location} overrideDisplay={this.state.supplier.name} />
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='new_name'>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Supplier Name"
                                    value={this.state.supplier.name}
                                    maxLength="255" disabled/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='phone_number'>Phone Number</Label>
                                <Input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    placeholder="Phone Number"
                                    value={this.state.supplier.phone_number}
                                    maxLength="255"
                                    disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='new_website'>Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    id="website"
                                    placeholder="Supplier Website"
                                    value={this.state.supplier.website}
                                    maxLength="255"
                                    disabled/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='new_email'>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="New Supplier Email"
                                    value={this.state.supplier.email}
                                    maxLength="255"
                                    disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(SupplierView);
