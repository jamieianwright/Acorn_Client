import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

class ProjectsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            description: '',
            alertVisible: false,
            alertMessage: ''
        }
    }

    componentWillMount() {
        if (this.props.crud === 'update') {
            this.setState({
                name: this.props.name,
                description: this.props.description
            });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        if (!this.state.name || !this.state.description) {
            this.setState({
                alertVisible: true,
                alertMessage: 'You must include all details about the project.'
            })
        } else {
            const method = (this.props.crud === 'create') ? 'POST' : 'PUT';
            const fetchId = (this.props.id) ? this.props.id : '';
            fetch(`${process.env.REACT_APP_API_BASE_URL}projects/${fetchId}`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.state.name, description: this.state.description })
            })
                .then(res => res.json())
                .then(result => {
                    this.props.getProjects();
                    this.toggleModal();
                })
        }
    }

    toggleModal() {
        this.setState((state) => {
            return {
                modalVisible: !state.modalVisible,
                name: this.props.name || '',
                description: this.props.description || ''
            }
        })
    }

    onDismissAlert() {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }

    render() {

        const modalTitle = (this.props.crud === 'create')
            ? 'Add New Project'
            : `Edit Project: ${this.props.name}`;
        const button = (this.props.crud === 'create')
            ? <Button className='' color="success" onClick={() => this.toggleModal()}>Add New Project</Button>
            : <Button className='' color="success" onClick={() => this.toggleModal()}>{this.props.button}</Button>;

        return (
            <div className='btn-group'>
                {button}
                <Modal isOpen={this.state.modalVisible} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>{modalTitle}</ModalHeader>
                    <ModalBody>
                        <Alert
                            color="danger"
                            isOpen={this.state.alertVisible}
                            toggle={() => this.onDismissAlert()}>
                            {this.state.alertMessage}
                        </Alert>
                        <Form>
                            <FormGroup>
                                <Label for='new_name'>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Project Name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.name}
                                    maxLength="255" />
                            </FormGroup>
                            <FormGroup>
                                <Label for='description'>Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    placeholder="Project Description"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.description}
                                    maxLength="255"
                                    required/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>
                        <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ProjectsModal;