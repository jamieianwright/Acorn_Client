import React, { Component } from 'react'
import {
    Container,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import './components.css';
import ComponentItem from './ComponentItem';
import ComponentsModal from './ComponentsModal';
import PaginationUI from '../UIcomponents/PaginationUI';

export class Components extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentItems: [],
            pagination: {},
            page: 1,
            search: ''
        }
        this.getComponentItems = this
            .getComponentItems
            .bind(this);
    }

    componentWillMount() {
        this.getComponentItems()
    }

    getComponentItems() {
        this.setState({ isLoaded: false })

        fetch(`${process.env.REACT_APP_API_BASE_URL}components?page=${this.state.page}&pageSize=10&search=${this.state.search}`)
            .then(res => res.json())
            .then(result => {
                this.setState({ componentItems: result.components, pagination: result.pagination, isLoaded: true });
            })
    }

    onPageChange(increment) {
        this.setState({
            page: increment
        }, this.getComponentItems)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, this.getComponentItems);
    }

    render() {
        const componentRows = this
            .state
            .componentItems
            .map((componentItem, i) => {
                return <ComponentItem
                    key={i}
                    {...componentItem}
                    getComponentItems={this.getComponentItems} />
            })
            
        let pagination = null;
        if (componentRows.length > 0) {
            pagination = (<div className="justify-content-center">
                <PaginationUI
                    currentPage={this.state.page}
                    maxPages={this.state.pagination.pageCount}
                    onPageChange={(page) => this.onPageChange(page)} />
            </div>)
        }

        return (
            <Container>
                <h1>Components</h1>
                <div className='control-bar'>
                    <Breadcrumb location={this.props.location} />
                    <ComponentsModal getComponentItems={this.getComponentItems} crud='create' />
                    <InputGroup className='search-bar'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Search for Supplier</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            name='search'
                            value={this.state.search}
                            onChange={(e) => this.handleChange(e)} />
                    </InputGroup>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Lead Time</th>
                            <th>Min Order Quantity</th>
                            <th>Supplier</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentRows.length != 0 ? componentRows : <tr><th>No Records match your search criteria :'(</th></tr>}
                    </tbody>
                </Table>
                {pagination}
            </Container>
        )
    }
}

export default Components
