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
            alertVisible: false,
            alertMessage: ''
        }
    }

    componentWillMount() {
        if (this.props.crud === 'update') {
            this.setState({name: this.props.name, price: this.props.price, description: this.props.description, lead_time: this.props.lead_time, min_order_quantity: this.props.min_order_quantity});
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onDismissAlert() {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }

    handleSubmit() {
        if (!this.state.name || !this.state.price || !this.state.description || !this.state.lead_time || !this.state.min_order_quantity) {
            this.setState({alertVisible: true, alertMessage: 'You must include all details about the component.'})
        } else {
            console.log('Hit Submit')
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
                        supplier_id: 1
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
            min_order_quantity: this.props.min_order_quantity || ''
        });
    }

    render() {
        const modalTitle = (this.props.crud === 'create')
            ? 'Add New Component'
            : `Edit component: ${this.state.name}`;

        return (
            <div>
                <Button className='' color="danger" onClick={() => this.toggleModal()}>Add New Component</Button>
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
                                    value={this.state.website}
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
                                    value={this.state.email}
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
                                    value={this.state.email}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
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
