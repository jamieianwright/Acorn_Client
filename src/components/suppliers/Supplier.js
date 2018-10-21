import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup } from 'reactstrap';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            modal: false,
        }

        this.toggle = this.toggle.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditSupplier = this.handleEditSupplier.bind(this);
        this.handleDeleteSupplier = this.handleDeleteSupplier.bind(this);
    }

//   componentWillMount(){
//     this.setState({
//     });
//   }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleEditModal(){
        this.setState({
            modal: !this.state.modal,
            edit_name: this.props.name,
            edit_phone_number: this.props.phone_number,
            edit_website: this.props.website,
            edit_email: this.props.email,
        });
    }

    handleEditSupplier(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.props.id}`, {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.state.edit_name, phone_number: this.state.edit_phone_number, website: this.state.edit_website, email: this.state.edit_email})
        })
        .then((result) => this.props.onEdit())

        this.toggleEditModal()
    }

    handleDeleteSupplier(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.props.id}`, {method: 'DELETE',})
        .then((result) => this.props.onEdit())
    }

    render() {
    
        return (
            <tr>
                <th>{this.props.name}</th>
                <th>{this.props.phone_number}</th>
                <th>{this.props.website}</th>
                <th>{this.props.email}</th>
                <th><ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>Modify</DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem onClick={this.toggleEditModal}>Edit</DropdownItem>
                        <Modal isOpen={this.state.modal} toggle={this.toggleEditModal} className={this.props.className}>
                            <ModalHeader toggle={this.toggleEditModal}>Add New Supplier</ModalHeader>
                            <ModalBody>
                                <Form>
                                <FormGroup>
                                    <Label for='edit_name'>Name</Label>
                                    <Input type="text" name="edit_name" id="edit_name" onChange={this.handleChange} value={this.state.edit_name} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='edit_phone_number'>Phone Number</Label>
                                    <Input type="text" name="edit_phone_number" id="edit_phone_number"  onChange={this.handleChange} value={this.state.edit_phone_number}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='edit_website'>Website</Label>
                                    <Input type="text" name="edit_website" id="edit_website" onChange={this.handleChange} value={this.state.edit_website}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='new_email'>Email</Label>
                                    <Input type="email" name="edit_email" id="edit_email" onChange={this.handleChange} value={this.state.edit_email}/>
                                </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleEditSupplier}>Submit</Button>
                                <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
                            </ModalFooter>
                            </Modal>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.handleDeleteSupplier}>Delete</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </th>
            </tr>
        );
  }
}


export default Supplier;