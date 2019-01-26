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
    Table
} from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';
import SortableColumnHeading from '../UIcomponents/SortableColumnHeading';


class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            deleteModalVisible: false,
            project: {}
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

        fetch(process.env.REACT_APP_API_BASE_URL + `projects/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({project: result, isLoaded: true})
            })
    }

    handleDeleteSupplier() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}projects/${this.state.supplier.id}`, {method: 'DELETE'}).then(() => {
            this
                .props
                .history
                .go(-1)
        })
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalVisible: !this.state.deleteModalVisible
        })
    }

    render() {
        const thStyles = {
            verticalAlign: "middle"
        }

        const crud = <div className='d-inline-block ml-3'>
            <ButtonGroup>
                <Modal
                    isOpen={this.state.deleteModalVisible}
                    toggle={() => this.toggleDeleteModal()}
                    className={this.props.className}>
                    <ModalHeader>Delete Project</ModalHeader>
                    <ModalBody>
                        Are you sure you wish to remove this project?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.handleDeleteSupplier()}>Yes</Button>
                        <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button color="danger" onClick={() => this.toggleDeleteModal()}>
                    <i class="fas fa-trash-alt"></i>
                </Button>
                <Link className='btn btn-warning' to={`/projects`}>
                    <i class="fas fa-list-ul"></i>
                </Link>
            </ButtonGroup>
        </div>

        const title = (this.state.isLoaded)
            ? <h1 className='d-inline-block'>{this.state.project.name}</h1>
            : <h1>Loading...</h1>;

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
                <h3>Components</h3>
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
                                toggleAsc={() => this.toggleAsc()}/>
                            <th style={thStyles}>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </Container>
        )
    }
}

export default withRouter(ProjectView);