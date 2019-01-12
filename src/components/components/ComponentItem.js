import React, { Component } from 'react'
import { truncateString } from '../../utils.js';

export class ComponentItem extends Component {
  render() {
    return (
        <tr>
          <th>{truncateString(this.props.name)}</th>
          <th>£ {truncateString(this.props.price, 11)}</th>
          <th>{truncateString(this.props.description)}</th>
          <th>{truncateString(this.props.lead_time, 2)} days</th>
          <th>{truncateString(this.props.min_order_quantity, 4)}</th>
          <th></th>
          <th></th>
        </tr>
    )
  }
}

export default ComponentItem
