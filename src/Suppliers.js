import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      isLoaded: true
    }
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

  render() {
    const suppliers = this.state.suppliers.map((supplier) => {
      return Supplier(supplier)
    })
    return (
      <Container>
        <h1>Suppliers</h1>
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

const Supplier = (supplier) => (
  <tr>
    <th>{supplier.name}</th>
    <th>{supplier.phone_number}</th>
    <th>{supplier.website}</th>
    <th>{supplier.email}</th>
    <th>Modify</th>
  </tr>
)



export default Suppliers;
