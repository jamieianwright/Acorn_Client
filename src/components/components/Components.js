import React, { Component } from 'react'
import {
    Container,
    Table,
    Input,
    InputGroup,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import './components.css';
import ComponentItem from './ComponentItem';
import ComponentsModal from './ComponentsModal';
import PaginationUI from '../UIcomponents/PaginationUI';
import SortableColumnHeading from '../UIcomponents/SortableColumnHeading';

export class Components extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentItems: [],
            pagination: {},
            page: 1,
            search: '',
            searchBy: 'components.name',
            orderBy: 'name',
            asc: true,
            dropdownSearchOpen: false,
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

        fetch(`${process.env.REACT_APP_API_BASE_URL}components?page=${this.state.page}&pageSize=10&search=${this.state.search}&searchBy=${this.state.searchBy}&order=${(this.state.asc) ? 'ASC' : 'DESC'}&orderBy=${this.state.orderBy}`)
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

    toggleAsc() {
        this.setState({ asc: !this.state.asc }, this.getComponentItems)
    }

    setOrderBy(newOrderBy) {
        this.setState({ orderBy: newOrderBy }, this.getComponentItems)
    }

    render() {
        const thStyles = {
            verticalAlign: "middle"
        }
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
                <div >
                    <Breadcrumb location={this.props.location} />
                    <div className='contol-bar'>
                        <ComponentsModal getComponentItems={this.getComponentItems} crud='create' />
                        <InputGroup className='search-bar'>
                            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownSearchOpen} toggle={() => this.setState((state) => { return { dropdownSearchOpen: !state.dropdownSearchOpen } })}>
                                <DropdownToggle caret>
                                    Search by: {(this.state.searchBy === 'components.name') ? 'Name' : 'Supplier'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {(this.state.searchBy === 'components.name') ? <DropdownItem onClick={() => this.setState((state) => { return { searchBy: 'suppliers.name' } })}>Supplier</DropdownItem> : <DropdownItem onClick={() => this.setState((state) => { return { searchBy: 'components.name' } })}>Name</DropdownItem>}
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                            <Input
                                name='search'
                                value={this.state.search}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </InputGroup>
                    </div>
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
                                toggleAsc={() => this.toggleAsc()} />
                            <SortableColumnHeading
                                columnHeaderId='price'
                                columnHeaderName='Price'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()} />
                            <th style={thStyles}>Description</th>
                            <SortableColumnHeading
                                columnHeaderId='lead_time'
                                columnHeaderName='Lead Time'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()} />
                            <SortableColumnHeading
                                columnHeaderId='min_order_quantity'
                                columnHeaderName='Min Order Quantity'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()} />
                            <SortableColumnHeading
                                columnHeaderId='suppliers.name'
                                columnHeaderName='Supplier'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()} />
                            <th style={thStyles}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentRows.length !== 0 ? componentRows : <tr><th>No Records match your search criteria :'(</th></tr>}
                    </tbody>
                </Table>
                {pagination}
            </Container>
        )
    }
}

export default Components
