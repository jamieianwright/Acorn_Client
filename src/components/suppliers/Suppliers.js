import React, { Component } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Supplier from './Supplier';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      isLoaded: true,
      modal: false
    }

    this.toggleCreateModal = this.toggleCreateModal.bind(this);
  }

  componentDidMount(){
    this.getSuppliers()
  }

  getSuppliers() {
    this.setState({
      isLoaded: false
    })

    fetch(process.env.REACT_APP_API_BASE_URL + 'suppliers/')
      .then(res => res.json())
      .then(result => {
        this.setState({
          suppliers: result,
          isLoaded: true
        })
      })
  }

  toggleCreateModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const suppliers = this.state.suppliers.map((supplier) => {
      return <Supplier {...supplier}/>
    })
    return (
      <Container>
        <h1>Suppliers</h1>
        <Button className='margin-y-lg' color="danger" onClick={this.toggleCreateModal}>Add New Supplier</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleCreateModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleCreateModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleCreateModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleCreateModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Website</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Suppliers;
