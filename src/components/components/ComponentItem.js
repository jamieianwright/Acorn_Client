import React, { Component } from 'react'

export class ComponentItem extends Component {
  render() {
    return (
        <tr>
          <th>{this.props.name}</th>
          <th>£ {this.props.price}</th>
          <th>{this.props.description}</th>
          <th>{this.props.lead_time} days</th>
          <th>{this.props.min_order_quantity}</th>
        </tr>
    )
  }
}

export default ComponentItem
