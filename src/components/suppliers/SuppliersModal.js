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

class SuppliersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            phone_number: '',
            website: '',
            email: '',
            alertVisible: false,
            alertMessage: ''
        }
    }

    componentWillMount() {
        if (this.props.crud === 'update') {
            this.setState({name: this.props.name, phone_number: this.props.phone_number, website: this.props.website, email: this.props.email});
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        if (!this.state.name || !this.state.phone_number || !this.state.website || !this.state.email) {
            this.setState({alertVisible: true, alertMessage: 'You must include all details about the supplier.'})
        } else {
            const method = (this.props.crud === 'create')
                ? 'POST'
                : 'PUT';
            const fetchId = (this.props.id)
                ? this.props.id
                : '';
            fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${fetchId}`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({name: this.state.name, phone_number: this.state.phone_number, website: this.state.website, email: this.state.email})
                })
                .then(res => res.json())
                .then(result => {
                    if (result.errno === 1062) {
                        this.setState({alertVisible: true, alertMessage: `The supplier's name must be unique, '${this.state.name}' has already been taken.`})
                    } else {
                        this
                            .props
                            .getSuppliers();
                        this.toggleModal();
                    }
                })
        }
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible,
            name: this.props.name || '',
            phone_number: this.props.phone_number || '',
            website: this.props.website || '',
            email: this.props.email || ''
        });
    }

    onDismissAlert() {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }

    render() {

        const modalTitle = (this.props.crud === 'create')
            ? 'Add New Supplier'
            : `Edit supplier: ${this.props.name}`;
        const button = (this.props.crud === 'create')
            ? <Button className='' color="danger" onClick={() => this.toggleModal()}>Add New Supplier</Button>
            : <Button className='' color="link" onClick={() => this.toggleModal()}>Edit Supplier</Button>;

        return (
            <div>
                {button}
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
                                <Label for='new_name'>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Supplier Name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.name}
                                    maxLength="255"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='phone_number'>Phone Number</Label>
                                <Input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    placeholder="Phone Number"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.phone_number}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='new_website'>Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    id="website"
                                    placeholder="Supplier Website"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.website}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='new_email'>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="New Supplier Email"
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

export default SuppliersModal;