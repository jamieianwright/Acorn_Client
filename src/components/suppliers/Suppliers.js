import React, { Component } from 'react';
import { Container, Table, Input, Badge, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Supplier from './Supplier';
import SuppliersModal from './SuppliersModal';
import './Suppliers.css';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import _ from 'lodash';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      filteredSuppliers: [],
      isLoaded: true,
      desc: false,
      search: ''
    }
    this.getSuppliers = this.getSuppliers.bind(this);
    this.handleSortTable = this.handleSortTable.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentWillMount(){
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
      .then(() => this.handleSortTable())
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSortInvert(){
    this.setState({
      desc: !this.state.desc
    }, this.handleSortTable)
  }

  handleSortTable(){
    let desc = this.state.desc

    let sortedSuppliers = _.orderBy(this.state.suppliers, [supplier => supplier.name.toLowerCase()], [(!desc)? 'asc': 'desc'])

    this.setState({
      suppliers: sortedSuppliers,
    });
  }

  render() {

    const filteredSuppliers = this.state.suppliers.filter(
      (supplier) => {
        return supplier.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !==-1;
      }
    )

    const suppliers = filteredSuppliers.map((supplier, i) => {
      return <Supplier key={i} {...supplier} getSuppliers={this.getSuppliers}/>
    })

    return (
      <Container>
        <h1>Suppliers</h1>
        <div className='control-bar'>
        <Breadcrumb location={this.props.location} />
        <SuppliersModal getSuppliers={this.getSuppliers} crud='create'/>
        <InputGroup className='search-bar'>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Search for Supplier</InputGroupText>
          </InputGroupAddon>
          <Input name='search' value={this.state.search}  onChange={(e) => this.handleChange(e)}/>
        </InputGroup>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Name <Badge className='btn' color="info" onClick={() => this.handleSortInvert()}>{(this.state.desc)? 'Z > A' : 'A > Z'}</Badge></th>
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
