import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { truncateString } from '../../utils.js';

export default class ProjectItem extends Component {
    render() {
        return (
            <tr>
                <th>{truncateString(this.props.name)}</th>
                <th>{truncateString(this.props.description)}</th>
                <th>
                    <ButtonGroup>
                        <Button color="danger">Delete</Button>
                    </ButtonGroup>
                </th>
            </tr>)
    }
}
