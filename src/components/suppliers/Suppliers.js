import React, { Component } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import Supplier from './Supplier';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      isLoaded: true,
      modal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.handleCreateSupplier = this.handleCreateSupplier.bind(this);
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
      modal: !this.state.modal,
      new_name: '',
      new_phone_number: '',
      new_website: '',
      new_email: ''
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCreateSupplier(){
    fetch(process.env.REACT_APP_API_BASE_URL + 'suppliers/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.new_name, phone_number: this.state.new_phone_number, website: this.state.new_website, email: this.state.new_email})
    })
    .then((result) => this.getSuppliers())

    this.toggleCreateModal()
  }

  render() {
    const suppliers = this.state.suppliers.map((supplier) => {
      return <Supplier {...supplier}/>
    })
    return (
      <Container>
        <h1>Suppliers</h1>
        <Button color="danger" onClick={this.toggleCreateModal}>Add New Supplier</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleCreateModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleCreateModal}>Add New Supplier</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='new_name'>Name</Label>
                <Input type="text" name="new_name" id="new_name" placeholder="New Supplier Name" onChange={this.handleChange} value={this.state.new_name} />
              </FormGroup>
              <FormGroup>
                <Label for='new_phone_number'>Phone Number</Label>
                <Input type="text" name="new_phone_number" id="new_phone_number" placeholder="New Supplier Phone Number" onChange={this.handleChange} value={this.state.new_phone_number}/>
              </FormGroup>
              <FormGroup>
                <Label for='new_website'>Website</Label>
                <Input type="text" name="new_website" id="new_website" placeholder="New Supplier Website" onChange={this.handleChange} value={this.state.new_website}/>
              </FormGroup>
              <FormGroup>
                <Label for='new_email'>Email</Label>
                <Input type="email" name="new_email" id="new_email" placeholder="New Supplier Email" onChange={this.handleChange} value={this.state.new_email}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleCreateSupplier}>Submit</Button>
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
