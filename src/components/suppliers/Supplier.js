import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup } from 'reactstrap';
import { truncateString } from '../../utils.js';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            deleteModalVisible: false,
            editModalVisible: false,
        }
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleEditModal() {
        this.setState({
            editModalVisible: !this.state.editModalVisible,
            edit_name: this.props.name,
            edit_phone_number: this.props.phone_number,
            edit_website: this.props.website,
            edit_email: this.props.email,
        });
    }

    handleEditSupplier() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.edit_name, 
                                    phone_number: this.state.edit_phone_number, 
                                    website: this.state.edit_website, 
                                    email: this.state.edit_email })
        })
        .then((result) => this.props.getSuppliers())

        this.toggleEditModal()
    }

    handleDeleteSupplier() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers/${this.props.id}`, { method: 'DELETE', })
            .then(() => {
                this.toggleDeleteModal()
                this.props.getSuppliers()
            })
    }

    toggleDeleteModal() {
        this.setState({ deleteModalVisible: !this.state.deleteModalVisible })
    }

    render() {

        return (
            <tr>
                <th>{truncateString(this.props.name)}</th>
                <th>{this.props.phone_number}</th>
                <th>{this.props.website}</th>
                <th>{this.props.email}</th>
                <th><ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
                    <DropdownToggle caret>Modify</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.toggleEditModal()}>Edit</DropdownItem>
                        <Modal isOpen={this.state.editModalVisible} toggle={() => this.toggleEditModal()} className={this.props.className}>
                            <ModalHeader toggle={() => this.toggleEditModal()}>{`Edit Supplier: ${this.props.name}`}</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label for='edit_name'>Name</Label>
                                        <Input type="text" name="edit_name" id="edit_name" onChange={(e) => this.handleChange(e)} value={this.state.edit_name} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='edit_phone_number'>Phone Number</Label>
                                        <Input type="text" name="edit_phone_number" id="edit_phone_number" onChange={(e) => this.handleChange(e)} value={this.state.edit_phone_number} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='edit_website'>Website</Label>
                                        <Input type="text" name="edit_website" id="edit_website" onChange={(e) => this.handleChange(e)} value={this.state.edit_website} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='new_email'>Email</Label>
                                        <Input type="email" name="edit_email" id="edit_email" onChange={(e) => this.handleChange(e)} value={this.state.edit_email} />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleEditSupplier()}>Submit</Button>
                                <Button color="secondary" onClick={() => this.toggleEditModal()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.deleteModalVisible} toggle={() => this.toggleDeleteModal()} className={this.props.className}>
                            <ModalHeader>Delete Supplier</ModalHeader>
                            <ModalBody>
                                Are you sure you wish to remove this supplier? This will also remove all related components.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleDeleteSupplier()}>Yes</Button>
                                <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.toggleDeleteModal()}>Delete</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                </th>
            </tr>
        );
    }
}


export default Supplier;
