import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

export default class ComponentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            price: '',
            description: '',
            lead_time: '',
            min_order_quantity: '',
            supplier_id: '',
            supplierName: '',
            alertVisible: false,
            alertMessage: '',
            suppliers: [],
            supplierSearch: '',
            alertSupplierVisible: false
        }
    }

    componentWillMount() {
        if (this.props.crud === 'update') {
            this.setState({
                name: this.props.name,
                price: this.props.price,
                description: this.props.description,
                lead_time: this.props.lead_time,
                min_order_quantity: this.props.min_order_quantity,
                supplierName: this.props.supplier.name,
                supplier_id: this.props.supplier.id
            });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    supplierSearch(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        e.persist()
        fetch(process.env.REACT_APP_API_BASE_URL + `suppliers/?pageSize=3&page=1&search=${e.target.value}`)
            .then(res => res.json())
            .then(result => {
                if (result.suppliers === undefined || result.suppliers.length === 0 || e.target.value === '') {
                    this.setState({suppliers: [], alertSupplierVisible: true})
                } else {
                    this.setState({suppliers: result.suppliers, alertSupplierVisible: false})
                }
            })
    }

    onDismissAlert() {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }

    handleSubmit() {
        if (!this.state.name || !this.state.price || !this.state.description || !this.state.lead_time || !this.state.min_order_quantity || !this.state.supplier_id) {
            this.setState({alertVisible: true, alertMessage: 'You must include all details about the component.'})
        } else {
            const method = (this.props.crud === 'create')
                ? 'POST'
                : 'PUT';
            const fetchId = (this.props.id)
                ? this.props.id
                : '';
            fetch(`${process.env.REACT_APP_API_BASE_URL}components/${fetchId}`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                        name: this.state.name,
                        price: this.state.price,
                        description: this.state.description,
                        lead_time: this.state.lead_time,
                        min_order_quantity: this.state.min_order_quantity,
                        supplier_id: this.state.supplier_id
                    })
                })
                .then(res => res.json())
                .then(result => {
                    if (result.errno === 1062) {
                        this.setState({alertVisible: true, alertMessage: `The components's name must be unique, '${this.state.name}' has already been taken.`})
                    } else {
                        this
                            .props
                            .getComponentItems();
                        this.toggleModal();
                    }
                })
        }
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible,
            name: this.props.name || '',
            price: this.props.price || '',
            description: this.props.description || '',
            lead_time: this.props.lead_time || '',
            min_order_quantity: this.props.min_order_quantity || '',
            suppliers: [],
            supplierSearch: '',
            alertSupplierVisible: false
        });
    }

    render() {

        const modalButton = (this.props.crud === 'create')
            ? <Button className='' color="danger" onClick={() => this.toggleModal()}>Add New Component</Button>
            : <Button className='' color="success" onClick={() => this.toggleModal()}>Edit</Button>;

        const modalTitle = (this.props.crud === 'create')
            ? 'Add New Component'
            : `Edit component: ${this.state.name}`;

        const supplierSearch = (!this.state.supplier_id)
            ? <Input
                    type="text"
                    name="supplierSearch"
                    id="supplierSearch"
                    placeholder="Search for the supplier of this component"
                    maxLength="255"
                    value={this.state.supplierSearch}
                    onChange={(e) => this.supplierSearch(e)}/>
            : null;

        const supplierChoices = (this.state.suppliers)
            ? this
                .state
                .suppliers
                .map((supplier, i) => {
                    return <Button
                        color="info"
                        size="lg"
                        key={i}
                        onClick={() => this.setState({supplier_id: supplier.id, supplierName: supplier.name, suppliers: []})}
                        block>{supplier.name}</Button>
                })
            : null;

        const selectedSupplier = (this.state.supplierName)
            ? <Button
                    color="success"
                    size="lg"
                    onClick={() => this.setState({supplier_id: '', supplierName: ''})}
                    block>{this.state.supplierName}</Button>
            : null;

        return (
            <div>
                {modalButton}
                <Modal isOpen={this.state.modalVisible} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>{modalTitle}</ModalHeader>
                    <ModalBody>
                        <Alert
                            color="danger"
                            isOpen={this.state.alertVisible}
                            toggle={() => this.onDismissAlert()}>
                            {this.state.alertMessage}
                        </Alert>
                        <Form>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Component Name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.name}
                                    maxLength="255"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='price'>Price</Label>
                                <Input
                                    type="text"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.price}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='description'>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Component Description"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.description}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='lead_time'>Lead Time</Label>
                                <Input
                                    type="text"
                                    name="lead_time"
                                    id="lead_time"
                                    placeholder="Component Lead Time"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.lead_time}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='min_order_quantity'>Min Order Quantity</Label>
                                <Input
                                    type="text"
                                    name="min_order_quantity"
                                    id="min_order_quantity"
                                    placeholder="Component Minimum Order quantity"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.min_order_quantity}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='supplierSearch'>Supplier</Label>
                                {supplierSearch}
                            </FormGroup>
                            <FormGroup>
                                {selectedSupplier}
                                {supplierChoices}
                            </FormGroup>
                            <Alert color="danger" isOpen={this.state.alertSupplierVisible}>
                                {'No suppliers match your search :('}
                            </Alert>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>
                        <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
