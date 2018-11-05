import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { truncateString } from '../../utils.js';
import SuppliersModal from './SuppliersModal';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            deleteModalVisible: false,
            modalVisible: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
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
                        <DropdownItem onClick={() => this.toggleModal()}>Edit</DropdownItem>
                        <SuppliersModal modalVisible={this.state.modalVisible} {...this.props} toggleModal={this.toggleModal} crud='update'/>
                        <DropdownItem divider />
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
                        <DropdownItem onClick={() => this.toggleDeleteModal()}>Delete</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                </th>
            </tr>
        );
    }
}


export default Supplier;
