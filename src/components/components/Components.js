import React, {Component} from 'react'
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
        this.setState({isLoaded: false})

        fetch(`${process.env.REACT_APP_API_BASE_URL}components?page=${this.state.page}&pageSize=10&search=${this.state.search}`)
            .then(res => res.json())
            .then(result => {
                this.setState({componentItems: result.components, pagination: result.pagination, isLoaded: true})
            })
    }

    onPageChange(increment) {
        let newPage
        if (typeof increment === 'string') {
            if (increment === 'next') {
                (this.state.page < this.state.pagination.pageCount)
                    ? newPage = this.state.page + 1
                    : newPage = this.state.pagination.pageCount;
            }
            if (increment === 'previous') {
                (this.state.page > 1)
                    ? newPage = this.state.page - 1
                    : newPage = 1;
            }
        } else {
            newPage = increment;
        }

        this.setState({
            page: newPage
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
                    getComponentItems={this.getComponentItems}/>
            })

        let paginationItems = []
        for (let i = Math.max(this.state.page - 6, 0); i < Math.min(this.state.page + 5, this.state.pagination.pageCount); i++) {
            paginationItems.push({
                page: i + 1
            })
        }
        paginationItems = paginationItems.map((obj, i) => {
            return <PaginationItem
                key={i}
                className={(this.state.page === obj.page)
                ? 'active'
                : null}>
                <PaginationLink onClick={() => this.onPageChange(obj.page)}>
                    {obj.page}</PaginationLink>
            </PaginationItem>
        })

        return (
            <Container>
                <h1>Components</h1>
                <div className='control-bar'>
                    <Breadcrumb location={this.props.location}/>
                    <ComponentsModal getComponentItems={this.getComponentItems} crud='create'/>
                    <InputGroup className='search-bar'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Search for Supplier</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            name='search'
                            value={this.state.search}
                            onChange={(e) => this.handleChange(e)}/>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentRows}
                    </tbody>
                </Table>
                <div className="justify-content-center">
                    <Pagination >
                        <PaginationItem>
                            <PaginationLink previous onClick={() => this.onPageChange('previous')}/>
                        </PaginationItem>
                        {paginationItems}
                        <PaginationItem>
                            <PaginationLink next onClick={() => this.onPageChange('next')}/>
                        </PaginationItem>
                    </Pagination>
                </div>
            </Container>
        )
    }
}

export default Components
