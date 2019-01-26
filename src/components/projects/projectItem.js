import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { truncateString } from '../../utils.js';

export default class ProjectItem extends Component {
    render() {
        const isActive = this.props.is_active === 1 ? true : false

        return (
            <tr className={isActive ? "table-success" : "table-danger"}>
                <th>{truncateString(this.props.name)}</th>
                <th>{truncateString(this.props.description, 50)}</th>
                <th>{isActive ? "Yes" : "No"}</th>
                <th>
                    <ButtonGroup>
                        <Button color="success">View</Button>
                    </ButtonGroup>
                </th>
            </tr>)
    }
}
