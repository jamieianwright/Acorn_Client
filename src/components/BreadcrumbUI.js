import React, { Component } from 'react';
import { Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

class BreadcrumbUI extends Component {
  
  render() {
    const params = this.props.location.pathname.substring(1).split('/');
    
    const breadcrumbs = params.map((param, i, arr) => {
      let breadcrumbClass = (i < arr.length - 1) ? 'breadcrumb-item' : 'breadcrumb-item active disabled'
      let displayParam = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
      let link = '';
      for (let j = 0; j <= i; j++) {
        link += '/' + arr[j];
      } 

      return <Link className={breadcrumbClass} key={i} to={link}>{displayParam}</Link>
    })

    return (
      <div>
        <Breadcrumb>
          <Link className='breadcrumb-item' to='/'>Home</Link>
          {breadcrumbs}
        </Breadcrumb>
      </div>
    );
      
  }
}

export default BreadcrumbUI;
