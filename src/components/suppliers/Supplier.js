import React, { Component } from 'react';

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
        <tr>
            <th>{this.props.name}</th>
            <th>{this.props.phone_number}</th>
            <th>{this.props.website}</th>
            <th>{this.props.email}</th>
            <th>Modify</th>
        </tr>
    );
  }
}


export default Supplier;