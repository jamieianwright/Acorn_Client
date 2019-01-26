import React, {Component} from 'react';
import {
    Container,
    Table,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import Supplier from './Supplier';
import SuppliersModal from './SuppliersModal';
import './Suppliers.css';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import PaginationUI from '../UIcomponents/PaginationUI';
import SortableColumnHeading from '../UIcomponents/SortableColumnHeading';

class Suppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierItems: [],
            pagination: {},
            page: 1,
            pageSize: 10,
            search: '',
            searchBy: 'name',
            orderBy: 'name',
            asc: true
        }
        this.getSupplierItems = this
            .getSupplierItems
            .bind(this);
    }

    componentWillMount() {
        this.getSupplierItems()
    }

    getSupplierItems() {
        this.setState({isLoaded: false})

        fetch(`${process.env.REACT_APP_API_BASE_URL}suppliers?page=${this.state.page}&pageSize=${this.state.pageSize}&search=${this.state.search}&searchBy=${this.state.searchBy}&order=${ (this.state.asc)? 'ASC': 'DESC'}&orderBy=${this.state.orderBy}`)
            .then(res => res.json())
            .then(result => {
                this.setState({supplierItems: result.suppliers, pagination: result.pagination, isLoaded: true});
            })
    }

    onPageChange(increment) {
        this.setState({
            page: increment
        }, this.getSupplierItems)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, this.getSupplierItems);
    }

    handleSearch(e) {
        this.setState({
            [e.target.name]: e.target.value,
            page: 1
        }, this.getSupplierItems);
    }

    toggleAsc() {
        this.setState({
            asc: !this.state.asc
        }, this.getSupplierItems)
    }

    setOrderBy(newOrderBy) {
        this.setState({
            orderBy: newOrderBy
        }, this.getSupplierItems)
    }

    render() {
        const thStyles = {
            verticalAlign: "middle"
        }

        const supplierRows = this
            .state
            .supplierItems
            .map((supplierItem, i) => {
                return <Supplier key={i} {...supplierItem} getSuppliers={this.getSupplierItems}/>
            })

        let pagination = null;
        if (supplierRows.length > 0) {
            pagination = (
                <div className="justify-content-center">
                    <PaginationUI
                        currentPage={this.state.page}
                        maxPages={this.state.pagination.pageCount}
                        onPageChange={(page) => this.onPageChange(page)}/>
                </div>
            )
        }

        return (
            <Container>
                <Breadcrumb location={this.props.location}/>
                <h1>Suppliers</h1>
                <div className='control-bar'>
                    <SuppliersModal getSuppliers={this.getSupplierItems} crud='create'/>
                    <InputGroup className='search-bar'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Search for Supplier</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            name='search'
                            value={this.state.search}
                            onChange={(e) => this.handleSearch(e)} />
                    </InputGroup>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <SortableColumnHeading
                                columnHeaderId='name'
                                columnHeaderName='Name'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()}/>
                            <SortableColumnHeading
                                columnHeaderId='phone_number'
                                columnHeaderName='Phone Number'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()}/>
                            <SortableColumnHeading
                                columnHeaderId='website'
                                columnHeaderName='Website'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()}/>
                            <SortableColumnHeading
                                columnHeaderId='email'
                                columnHeaderName='Email'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()}/>
                            <th style={thStyles}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {supplierRows.length !== 0 ? supplierRows : <tr><th>No Records match your search criteria :'(</th></tr>}
                    </tbody>
                </Table>
                {pagination}
            </Container>
        );
    }
}

export default Suppliers;
