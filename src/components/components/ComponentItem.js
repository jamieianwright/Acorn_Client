import React, {Component} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup} from 'reactstrap'
import {truncateString} from '../../utils.js';
import ComponentsModal from './ComponentsModal';

export default class ComponentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModalVisible: false
        }
    }

    handleDelete() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}components/${this.props.id}`, {method: 'DELETE'}).then((result) => {
            this.toggleDeleteModal()
            this
                .props
                .getComponentItems()
        })
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalVisible: !this.state.deleteModalVisible
        })
    }
    render() {
        return (
            <tr>
                <th>{truncateString(this.props.name)}</th>
                <th>£ {truncateString(this.props.price, 11)}</th>
                <th>{truncateString(this.props.description)}</th>
                <th>{truncateString(this.props.lead_time, 2)}
                    days</th>
                <th>{truncateString(this.props.min_order_quantity, 4)}</th>
                <th>{truncateString(this.props.supplier.name, 15)}</th>
                <th>
                    <ButtonGroup>
                        <ComponentsModal
                            getComponentItems={this.getComponentItems}
                            crud='update'
                            {...this.props}/>
                        <Modal
                            isOpen={this.state.deleteModalVisible}
                            toggle={() => this.toggleDeleteModal()}
                            className={this.props.className}>
                            <ModalHeader>Delete Component</ModalHeader>
                            <ModalBody>
                                Are you sure you wish to remove this component?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.handleDelete()}>Yes</Button>
                                <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Button color="danger" onClick={() => this.toggleDeleteModal()}>Delete</Button>
                    </ButtonGroup>
                </th>
            </tr>)}}
