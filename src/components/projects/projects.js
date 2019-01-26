import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import PaginationUI from '../UIcomponents/PaginationUI';
import ProjectItem from './projectItem';


export class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: [],
            pagination: {},
            page: 1,
            asc: true,
        }

        this.getProjects = this.getProjects.bind(this);
    }

    componentWillMount() {
        this.getProjects()
    }

    getProjects() {
        this.setState({ isLoaded: false })

        fetch(`${process.env.REACT_APP_API_BASE_URL}projects?page=${this.state.page}&pageSize=10&order=${(this.state.asc) ? 'ASC' : 'DESC'}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    projects: result.projects,
                    pagination: result.pagination,
                    isLoaded: true
                });
            });
    }

    onPageChange(increment) {
        this.setState({
            page: increment
        }, this.getProjects)
    }

    render() {
        const thStyles = {
            verticalAlign: "middle"
        }
        const projectRows = this.state.projects
            .map((project, i) => {
                return <ProjectItem
                    key={i}
                    {...project} />
            })

        let pagination = null;
        if (projectRows.length > 0) {
            pagination = (<div className="justify-content-center">
                <PaginationUI
                    currentPage={this.state.page}
                    maxPages={this.state.pagination.pageCount}
                    onPageChange={(page) => this.onPageChange(page)} />
            </div>)
        }

        return (
            <Container>
                <Breadcrumb location={this.props.location} />
                <h1>Projects</h1>
                <Table>
                    <thead>
                        <tr>
                            <th style={thStyles}>Name</th>
                            {/* <SortableColumnHeading
                                columnHeaderId='name'
                                columnHeaderName='Name'
                                currentOrderBy={this.state.orderBy}
                                asc={this.state.asc}
                                setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                toggleAsc={() => this.toggleAsc()} /> */}
                            <th style={thStyles}>Description</th>
                            <th style={thStyles}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectRows.length !== 0 ? projectRows : <tr><th>No Records match your search criteria :'(</th></tr>}
                    </tbody>
                </Table>
                {pagination}
            </Container>
        )
    }
}

export default Projects;
