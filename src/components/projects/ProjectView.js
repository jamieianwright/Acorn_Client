import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ButtonGroup,
    Table,
    Alert
} from 'reactstrap';
import ProjectsModal from './ProjectsModal';
import ProjectComponentModal from './ProjectComponentsModal';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import PaginationUI from '../UIcomponents/PaginationUI';
import SortableColumnHeading from '../UIcomponents/SortableColumnHeading';

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            deleteModalVisible: false,
            project: {
                id: '',
                name: '',
                is_active: 0,
                components: [],
                componentsPagination: {
                    rowCount: 0,
                    page: 0,
                    pageSize: 0,
                    pageCount: 0
                },
                page: 1
            },
            orderBy: 'name',
            asc: true
        }

        this.getProject = this
            .getProject
            .bind(this);
    }

    componentWillMount() {
        this.getProject()
    }

    getProject() {
        this.setState({isLoaded: false})

        fetch(process.env.REACT_APP_API_BASE_URL + `projects/${this.props.match.params.id}?componentsPage=${this.state.page}&componentsPageSize=10&componentOrder=${ (this.state.asc)
            ? 'ASC'
                : 'DESC'}&componentOrderBy=${this.state.orderBy}`)
            .then(res => res.json())
            .then(result => {
                this.setState({project: result, isLoaded: true})
            })
    }

    handleDeleteProject() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}projects/${this.state.project.id}`, {method: 'DELETE'}).then(() => {
            this
                .props
                .history
                .push('/projects');
        })
    }

    handleDeleteProjectComponent(component_id) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}projects/${this.state.project.id}/component`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({component_id: component_id})
        })
        .then((update) => {
            this.getProject()
        })
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalVisible: !this.state.deleteModalVisible
        })
    }

    onPageChange(increment) {
        this.setState({
            page: increment
        }, this.getProject)
    }

    toggleAsc() {
        this.setState({
            asc: !this.state.asc
        }, this.getProject)
    }

    setOrderBy(newOrderBy) {
        this.setState({
            orderBy: newOrderBy
        }, this.getProject)
    }

    render() {
        const thStyles = {
            verticalAlign: "middle"
        }

        const crud = <div className='d-inline-block ml-3'>
            <ButtonGroup>
                {(this.state.project.is_active === 0)
                    ? <ProjectsModal
                            crud='update'
                            button={< i className = "fas fa-edit" > </i>}
                            {...this.state.project}
                            getProjects={this.getProject}/>
                    : null}
                <Modal
                    isOpen={this.state.deleteModalVisible}
                    toggle={() => this.toggleDeleteModal()}
                    className={this.props.className}>
                    <ModalHeader>Delete Project</ModalHeader>
                    <ModalBody>
                        Are you sure you wish to remove this project?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.handleDeleteProject()}>Yes</Button>
                        <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button color="danger" onClick={() => this.toggleDeleteModal()}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
                <Link className='btn btn-warning' to={`/projects`}>
                    <i className="fas fa-list-ul"></i>
                </Link>
            </ButtonGroup>
        </div>

        const title = (this.state.isLoaded)
            ? <h1 className='d-inline-block'>{this.state.project.name}</h1>
            : <h1>Loading...</h1>;

        const components = this
            .state
            .project
            .components
            .map((component, i) => {
                return <tr key={i}>
                    <td>{component.name}</td>
                    <td>{component.quantity}</td>
                    <td>
                        <ButtonGroup>
                            <ProjectComponentModal
                                getProject={this.getProject}
                                project_id={this.state.project.id}
                                crud='update'
                                {...component}
                                button={< i className = "fas fa-edit" > </i>}/>
                            <Button
                                color="danger"
                                onClick={() => this.handleDeleteProjectComponent(component.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            })

        let pagination = null;
        if (this.state.project.componentsPagination.pageCount > 0) {
            pagination = (
                <div className="justify-content-center">
                    <PaginationUI
                        currentPage={this.state.project.componentsPagination.page}
                        maxPages={this.state.project.componentsPagination.pageCount}
                        onPageChange={(page) => this.onPageChange(page)}/>
                </div>
            )
        }

        return (
            <Container>
                <Breadcrumb
                    location={this.props.location}
                    overrideDisplay={this.state.project.name}/>
                <div className='d-flex align-items-center'>
                    {title}
                    {crud}
                </div>
                <Row>
                    <Col md={12} className='view-col'>
                        <h4 className='view-headers'>Description</h4>
                        <span>{this.state.project.description}</span>
                    </Col>
                </Row>
                <hr/>
                <div className='d-flex pb-3'>
                    <h3 className='mb-0'>Components</h3>
                    {(this.state.project.is_active === 0)
                        ? <ProjectComponentModal
                                project_id={this.state.project.id}
                                getProject={this.getProject}
                                crud='create'/>
                        : null}
                </div>
                {(this.state.project.components.length > 0)
                    ? <div>
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
                                            columnHeaderId='quantity'
                                            columnHeaderName='Quantity'
                                            currentOrderBy={this.state.orderBy}
                                            asc={this.state.asc}
                                            setOrderBy={(newOrderBy) => this.setOrderBy(newOrderBy)}
                                            toggleAsc={() => this.toggleAsc()}/> {(this.state.project.is_active === 0)
                                            ? <th style={thStyles}>Action</th>
                                            : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {components}
                                </tbody>
                            </Table>
                            {pagination}
                        </div>
                    : <Alert color='danger' className='my-4'>There are no components associated with this project</Alert>}
            </Container>
        )
    }
}

export default withRouter(ProjectView);