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
    Collapse,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import Breadcrumb from '../UIcomponents/BreadcrumbUI';

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

        fetch(process.env.REACT_APP_API_BASE_URL + `projects/${this.props.match.params.id}/components`)
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
                <Button color="danger" onClick={() => this.toggleDeleteModal()}><i class="fas fa-trash-alt"></i></Button>
                <Link className='btn btn-warning' to={`/projects`}><i class="fas fa-list-ul"></i></Link>
            </ButtonGroup>
        </div>

        const title = (this.state.isLoaded)
            ? <h1 className='d-inline-block'>{this.state.project.name}</h1>
            : <h1>Loading...</h1>;

        const componentButton = (this.state.project.components !== undefined && this.state.project.components.length >= 1)? <Button color="primary" onClick={()=> this.setState({componentsCollapse: !this.state.componentsCollapse})} style={{ marginBottom: '1rem', marginTop: '1rem' }}>{(this.state.componentsCollapse)? 'Hide' : 'Show' }</Button> : <span>None</span>;


        const components = (this.state.project.components)? this.state.project.components.map((component, i) => {
                    return <ListGroupItem key={i}><Link className='' to={`/components`}>{component.name} </Link></ListGroupItem>}) : null ;

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
                <hr />
                    <h4 className='view-headers'>Components</h4>
                    <Collapse isOpen={this.state.componentsCollapse}>
                        <ListGroup>
                            {components}
                        </ListGroup>
                    </Collapse>
                    {componentButton}
            </Container>
        )
    }
}

export default withRouter(ProjectView);