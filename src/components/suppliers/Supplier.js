import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { ButtonGroup, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { truncateString } from '../../utils.js';
import SuppliersModal from './SuppliersModal';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModalVisible: false,
        }
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
                <th>{truncateString(this.props.phone_number, 11)}</th>
                <th>{truncateString(this.props.website)}</th>
                <th>{truncateString(this.props.email)}</th>
                <th>
                <ButtonGroup>
                    <Link className='btn btn-info' to={`/suppliers/${this.props.id}`}>View</Link>
                    <SuppliersModal crud='update' {...this.props}/>
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
                </th>
            </tr>
        );
    }
}


export default Supplier;
