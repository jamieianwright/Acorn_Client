import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class SuppliersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount(){
        if (this.props.crud === 'update') {
            this.setState({
                name: this.props.name,
                phone_number: this.props.phone_number,
                website: this.props.website,
                email: this.props.email,
            });
        }    
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(){
        const method = (this.props.crud === 'create')? 'POST': 'PUT' ;
        const fetchId = (this.props.id)? this.props.id : '';
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${fetchId}`, {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: this.state.name,
                                phone_number: this.state.phone_number,
                                website: this.state.website,
                                email: this.state.email
          })
        })
        .then((result) => this.props.getSuppliers())
        .then(() => this.props.toggleModal())
    }


    render() {

        const modalTitle = (this.props.crud === 'create') ? 'Add New Supplier' : `Edit supplier: ${this.state.name}`;

        return (

                <Modal isOpen={this.props.modalVisible} toggle={() => this.props.toggleModal()} >
                    <ModalHeader toggle={() => this.props.toggleModal()}>{modalTitle}</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for='new_name'>Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Supplier Name" onChange={(e) => this.handleChange(e)} value={this.state.name}  maxLength="255" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='phone_number'>Phone Number</Label>
                            <Input type="text" name="phone_number" id="phone_number" placeholder="Phone Number" onChange={(e) => this.handleChange(e)} value={this.state.phone_number}  maxLength="255" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='new_website'>Website</Label>
                            <Input type="text" name="website" id="website" placeholder="Supplier Website" onChange={(e) => this.handleChange(e)} value={this.state.website}  maxLength="255" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='new_email'>Email</Label>
                            <Input type="email" name="email" id="email" placeholder="New Supplier Email" onChange={(e) => this.handleChange(e)} value={this.state.email}  maxLength="255" required/>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>
                        <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        );
    }
}

export default SuppliersModal;