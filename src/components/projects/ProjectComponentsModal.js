import React, {Component} from 'react';
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
import './ProjectComponentsModal.css';

class ProjectComponentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            component_id: '',
            component_name: '',
            quantity: '',
            alertVisible: false,
            alertMessage: '',
            components_search: [],
            display_suggestions: false,
        }
    }

    componentWillMount() {
        if (this.props.crud === 'update') {
            this.setState({component_id: this.props.id, name: this.props.name, quantity: this.props.quantity});
        }
    }

    handleChange(e) {
        let callback
        if(e.target.name === 'component_name'){
            callback = this.handleComponentSearch;
        }
        this.setState({
            [e.target.name]: e.target.value
        }, callback);
    }

    handleComponentSearch() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}components?page=1&pageSize=5&search=${this.state.component_name}`)
            .then(res => res.json())
            .then(result => {
                this.setState({components_search: result.components, display_suggestions: true });
            });
    }

    handleSubmit() {
        if (!this.state.component_id || !this.state.quantity) {
            this.setState({alertVisible: true, alertMessage: 'You must include all details about the component before submitting.'})
        } else {
            console.log('submit')
            const method = (this.props.crud === 'create')
                ? 'POST'
                : 'PUT';

            console.log(`${process.env.REACT_APP_API_BASE_URL}projects/${this.props.project_id}/component`)

            fetch(`${process.env.REACT_APP_API_BASE_URL}projects/${this.props.project_id}/component`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({component_id: this.state.component_id, quantity: this.state.quantity})
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    this
                        .props
                        .getProject();
                    this.toggleModal();
                })
        }
    }

    toggleModal() {
        this.setState((state) => {
            return {
                modalVisible: !state.modalVisible,
                component_id: this.props.id || '',
                component_name: this.props.name || '',
                quantity: this.props.quantity || ''
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
            ? 'Add New Component to Project'
            : `Edit`;
        const button = (this.props.crud === 'create')
            ? <Button className='ml-3' color="success" onClick={() => this.toggleModal()}>Add New Component to Project</Button>
            : <Button className='' color="success" onClick={() => this.toggleModal()}>{this.props.button}</Button>;

        const suggestionsListComponent = (this.state.components_search && this.state.component_name !== '' && this.state.display_suggestions)
            ? (this.state.components_search.length > 0)? <ul className="suggestions">
                    {this
                        .state
                        .components_search
                        .map((suggestion, i) => {
                            return <li
                                className=''
                                key={i}
                                onClick={() => this.setState({
                                    component_id: suggestion.id,
                                    component_name: suggestion.name,
                                    components_search: [],
                                    display_suggestions: false
                            })}>{suggestion.name}</li>
                        })}
                </ul> :
                <div className="no-suggestions">
                    <em>No components matching your search!</em>
                </div>
            : <ul className="no-suggestions"></ul>;

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
                                <Label for='component_name'>Component Name</Label>
                                <Input
                                    type="text"
                                    name="component_name"
                                    id="component_name"
                                    placeholder="Component Name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.component_name}
                                    maxLength="255"/>
                            </FormGroup>
                            <FormGroup>
                                {suggestionsListComponent}
                            </FormGroup>
                            <FormGroup>
                                <Label for='quantity'>Quantity</Label>
                                <Input
                                    type="text"
                                    name="quantity"
                                    id="quantity"
                                    placeholder="Component Quantity"
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.quantity}
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

export default ProjectComponentsModal;